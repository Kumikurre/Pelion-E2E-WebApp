from flask import Flask, jsonify, request
from flask_restplus import Api, Resource, fields
from flask_cors import CORS
import datetime
import requests

from apikey import Credentials
from DBactions import db_api
from DBactions import pelion_parser

service_address = '85.23.118.231'
parser = pelion_parser()

def create_app():
    app = Flask(__name__)
    CORS(app)
    api = Api(app)
    database = db_api('127.0.0.1', 5051)
    ns = api.namespace('Pelion_E2E_Api', description='IoT device API')
    

    @ns.route('/account/me')
    class user_info(Resource):
        """
        Endpoint for querying account data
        Returns the user data from Pelion. Requires an apikey.
        """
        def get(self):
            """ User info for the account """
            headers = {'Authorization': Credentials.apikey}
            resp = requests.get('https://api.us-east-1.mbedcloud.com/v3/accounts/me', headers=headers)
            return resp.json()

    @ns.route('/devices')
    class device(Resource):
        """
        Endpoint for querying device data.
        """
        def get(self):
            """ Returns a list of all devices from Pelion. Requires an apikey. """
            headers = {'Authorization': Credentials.apikey}
            resp = requests.get('https://api.us-east-1.mbedcloud.com/v3/devices/', headers=headers)
            return resp.json()

    @ns.route('/endpoints/<device_id>')
    class endpoint(Resource):
        def get(self, device_id):
            """ 
            Lists resource endpoints of a single device 
            Returns a list of all endpoints for a single device from Pelion.
            Requires an apikey and a device_id.
            """
            headers = {'Authorization': Credentials.apikey}
            resp = requests.get('https://api.us-east-1.mbedcloud.com/v2/endpoints/' + device_id, headers=headers)
            return resp.json()

    @ns.route('/subscriptions/<device_id>/<endpoint_id>')
    class subscribe(Resource):
        """
        Endpoint for managing a single subscription
        """
        def put(self, device_id, endpoint_id):
            """
            Creates a new subscription in Pelion. Does not return any data.
            """
            new_endpoint_id = endpoint_id.replace('_', '/')
            headers = {'Authorization': Credentials.apikey}
            payload = {"url": "http://" + service_address + "/Pelion_E2E_Api/callback"}
            callbackresp = requests.put('https://api.us-east-1.mbedcloud.com/v2/notification/callback', headers=headers, json=payload)
            resp = requests.put('https://api.us-east-1.mbedcloud.com/v2/subscriptions/' + device_id + '/' + new_endpoint_id, headers=headers)
            return resp.text
        
        def get(self, device_id, endpoint_id):
            """
            Checks if a subscription exists. Does not return any data.
            """
            headers = {'Authorization': Credentials.apikey}
            resp = requests.get('https://api.us-east-1.mbedcloud.com/v2/subscriptions/' + device_id + '/' + endpoint, headers=headers)
            print(resp.status)
            return resp.json()
        
        def delete(self, device_id, endpoint_id):
            """
            Deletes an existing subscription in Pelion. Does not return any data.
            """
            new_endpoint_id = endpoint_id.replace('_', '/')
            headers = {'Authorization': Credentials.apikey}
            resp = requests.delete('https://api.us-east-1.mbedcloud.com/v2/subscriptions/' + device_id + '/' + new_endpoint_id, headers=headers)
            return resp.text

    @ns.route('/subscriptions/<device_id>')
    class subscription(Resource):
        """
        Endpoint manages all subscriptions for a device
        """
        def put(self, device_id, endpoint_id):
            """ Is currently not used """
            headers = {'Authorization': Credentials.apikey}
            resp = requests.put('https://api.us-east-1.mbedcloud.com/v2/subscriptions/' + device_id, headers=headers)
            return resp.json()

        def get(self, device_id):
            """ Returns a list of all subscribed endpoints from Pelion """
            headers = {'Authorization': Credentials.apikey}
            resp = requests.get('https://api.us-east-1.mbedcloud.com/v2/subscriptions/' + device_id, headers=headers)
            return resp.text.split()
        
    @ns.route('/callback')
    class callback(Resource):
        """
        Callback url for receiving notifications from Pelion.
        This endpoint is not called by the application but rather by Pelion.
        Does not return anything, but takes in a payload and then stores the content of this payload to a database
        """
        def put(self):
            if api.payload == {}:
                print('Callback registration complete')
                return
            elif 'notifications' in api.payload:
                try:
                    pass
                    for notification in api.payload['notifications']:
                        now = datetime.datetime.now().timestamp()
                        notification['payload'] = float(parser.base64_to_str(notification['payload']))
                        notification['callback_time'] = now
                        itemid = database.insert_data('notifications', notification['ep'], notification)
                except TypeError:
                    print(api.payload)
            return

    @ns.route('/results/<device_id>')
    class results(Resource):
        """
        Retrieves data from the database. Returns a collection of datasets for a device. 
        All of the datasets in the collection represent a single resource that has been subscribed to.
        """
        def get(self, device_id):
            final_items = {}
            tags = database.find_keys('notifications', device_id, {}, "path")
            items = list(database.read_all('notifications', device_id))
            for tag in tags:
                final_items.setdefault(tag, {})

                final_items[tag]['payload'] = []
                final_items[tag]['callback_time'] = []
            for item in items:
                final_items[item['path']]['payload'].append(item['payload'])
                final_items[item['path']]['callback_time'].append(item['callback_time'])
            return final_items

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', debug=False)
