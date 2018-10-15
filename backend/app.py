from flask import Flask, jsonify, request
from flask_restplus import Api, Resource, fields
from flask_cors import CORS
from apikey import Credentials
import requests


def create_app():
    app = Flask(__name__)

    CORS(app)
    api = Api(app)
    ns = api.namespace('Pelion_E2E_Api', description='IoT device API')

    @ns.route('/account/me')
    class TodoList(Resource):
        def get(self):
            headers = {'Authorization': Credentials.apikey}
            resp = requests.get('https://api.us-east-1.mbedcloud.com/v3/accounts/me', headers=headers)
            return resp.json()

    @ns.route('/devices')
    class TodoList(Resource):
        def get(self):
            headers = {'Authorization': Credentials.apikey}
            resp = requests.get('https://api.us-east-1.mbedcloud.com/v3/devices/', headers=headers)
            return resp.json()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
