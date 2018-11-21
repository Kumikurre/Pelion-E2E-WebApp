from flask import Flask, jsonify, request
from flask_restplus import Api, Resource, fields
from flask_cors import CORS
from apikey import Credentials
from DBactions import db_api
import requests

service_address = '85.23.34.102'
mongo = db_api('localhost', 5051)

def create_app():
    app = Flask(__name__)
    CORS(app)
    api = Api(app)
    ns = api.namespace('Pelion_E2E_Api', description='IoT device API')
    

    @ns.route('/account/me')
    class user_info(Resource):
        """
        Endpoint for querying account data
        """
        def get(self):
            """ User info for the account """
            headers = {'Authorization': Credentials.apikey}
            resp = requests.get('https://api.us-east-1.mbedcloud.com/v3/accounts/me', headers=headers)
            return resp.json()

    @ns.route('/devices')
    class device(Resource):
        """
        Endpoint for querying device data
        """
        def get(self):
            """ Lists all devices """
            headers = {'Authorization': Credentials.apikey}
            resp = requests.get('https://api.us-east-1.mbedcloud.com/v3/devices/', headers=headers)
            return resp.json()

    @ns.route('/endpoints/<device_id>')
    class endpoint(Resource):
        def get(self, device_id):
            """ 
            Lists resource endpoints of a single device 
            """
            headers = {'Authorization': Credentials.apikey}
            resp = requests.get('https://api.us-east-1.mbedcloud.com/v2/endpoints/' + device_id, headers=headers)
            return resp.json()

    @ns.route('/subscriptions/<device_id>/<endpoint_id>')
    class subscribe(Resource):
        """
        Endpoint manipulates subscriptions
        """
        def put(self, device_id, endpoint_id):
            print('CALLING PUT SUBSCRIPTION: ', endpoint_id)
            new_endpoint_id = endpoint_id.replace('_', '/')
            print(new_endpoint_id)
            headers = {'Authorization': Credentials.apikey}
            payload = {"url": service_address + '/callback'}
            resp = requests.put('https://api.us-east-1.mbedcloud.com/v2/subscriptions/' + device_id + '/' + new_endpoint_id, headers=headers, data=payload)
            return resp.json()
        
        def get(self, device_id, endpoint):
            headers = {'Authorization': Credentials.apikey}
            resp = requests.get('https://api.us-east-1.mbedcloud.com/v2/subscriptions/' + device_id + '/' + endpoint, headers=headers)
            print(resp.status)
            return resp.json()
        
        def delete(self, device_id, endpoint):
            headers = {'Authorization': Credentials.apikey}
            resp = requests.delete('https://api.us-east-1.mbedcloud.com/v2/subscriptions/' + device_id + '/' + endpoint, headers=headers)
            return resp.json()

    @ns.route('/subscriptions/<device_id>')
    class subscription(Resource):
        def put(self, device_id, endpoint_id):
            headers = {'Authorization': Credentials.apikey}
            resp = requests.put('https://api.us-east-1.mbedcloud.com/v2/subscriptions/' + endpoint_id, headers=headers)
            return resp.json()

        def get(self):
            headers = {'Authorization': Credentials.apikey}
            resp = requests.get('https://api.us-east-1.mbedcloud.com/v2/subscriptions/' + device_id, headers=headers)
            return resp
        
        def delete(self):
            headers = {'Authorization': Credentials.apikey}
            resp = requests.delete('https://api.us-east-1.mbedcloud.com/v2/subscriptions/' + device_id, headers=headers)
            return resp
        
    @ns.route('/callback')
    class callback(Resource):
        """
        Callback url for receiving notifications from Pelion
        """
        def put(self, callback_id, device_id):
            console.log('GOT A CALLBACK MESSAGE!!')
            payload = api.payload
            post_ids = db_api.insert_data(payload, collection=device_id)
            return post_ids, 200

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', debug=False)
