from flask import Flask, jsonify, request
from flask_restplus import Api, Resource, fields
from flask_cors import CORS
from apikey import Credentials
from DBactions import db_api
import requests


def create_app():
    app = Flask(__name__)
    CORS(app)
    api = Api(app)
    mongo = db_api('localhost', 27017)
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

    @ns.route('/subscriptions/<device_id>/<endpoint>')
    class subscribe(Resource):
        """
        Endpoint manipulates subscriptions
        """
        def put(self, device_id, endpoint):
            headers = {'Authorization': Credentials.apikey}
            service_address = 'IP ADDRESS HERE'
            callback_endpoint = device_id + '/' + endpoint
            payload = {"url": service_address + callback_endpoint}
            resp = requests.get('https://api.us-east-1.mbedcloud.com/v2/subscriptions/' + device_id + '/' + endpoint, headers=headers)
            return resp
        
        def get(self, device_id, endpoint):
            headers = {'Authorization': Credentials.apikey}
            resp = requests.get('https://api.us-east-1.mbedcloud.com/v2/subscriptions/' + device_id + '/' + endpoint, headers=headers)
            print(resp.status)
            return resp
        
        def delete(self, device_id, endpoint):
            headers = {'Authorization': Credentials.apikey}
            resp = requests.delete('https://api.us-east-1.mbedcloud.com/v2/subscriptions/' + device_id + '/' + endpoint, headers=headers)
            return resp

    @ns.route('/subscriptions/<device_id>')
    class subscription(Resource):
        def put(self, device_id):
            headers = {'Authorization': Credentials.apikey}
            resp = requests.put('https://api.us-east-1.mbedcloud.com/v2/subscriptions/' + device_id, headers=headers)
            return resp

        def get(self):
            headers = {'Authorization': Credentials.apikey}
            resp = requests.get('https://api.us-east-1.mbedcloud.com/v2/subscriptions/' + device_id, headers=headers)
            return resp
        
        def delete(self):
            headers = {'Authorization': Credentials.apikey}
            resp = requests.delete('https://api.us-east-1.mbedcloud.com/v2/subscriptions/' + device_id, headers=headers)
            return resp
        
    @ns.route('/callback/<device_id>/<callback_id>')
    """
    Callback url for receiving notifications from Pelion
    """
    class callback(Resource):
        def put(self, callback_id, device_id):
            payload = api.payload
            post_ids = db_api.insert_data(payload, collection=device_id)
            return post_ids

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
