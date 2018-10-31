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
        def get(self):
            """ User info for the account """
            headers = {'Authorization': Credentials.apikey}
            resp = requests.get('https://api.us-east-1.mbedcloud.com/v3/accounts/me', headers=headers)
            return resp.json()

    @ns.route('/devices')
    class device(Resource):
        def get(self):
            """ Lists all devices """
            headers = {'Authorization': Credentials.apikey}
            resp = requests.get('https://api.us-east-1.mbedcloud.com/v3/devices/', headers=headers)
            return resp.json()

    @ns.route('/endpoints/<device_id>')
    class endpoint(Resource):
        def get(self, device_id):
            """ Lists resource endpoints of a single device """
            headers = {'Authorization': Credentials.apikey}
            resp = requests.get('https://api.us-east-1.mbedcloud.com/v2/endpoints/' + device_id, headers=headers)
            return resp.json()

    @ns.route('/callback/<callback_id>')
    class callback(Resource):
        def put(self, callback_id):
            payload = api.payload
            post_ids = db_api.insert_data(payload)
            return post_ids

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
