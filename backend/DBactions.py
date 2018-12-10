from pymongo import MongoClient
from bson import json_util 
import base64

class db_api:
    def __init__(self, address, port):
        self.client = MongoClient(address, port)

    def read_all(self, db, collection):
        db = self.client[db]
        coll = db[collection]
        items = coll.find({})
        return(items)
        
    def read_filtered(self, query, db, collection):
        db = self.client[db]
        coll = db[collection]
        items = coll.find(query)
        return(json_util.dumps(items))

    def insert_file(self, db, collection, data):
        db = self.client[db]
        coll = db[collection]
        post_id = coll.insert_many(data)
        return(post_id)

    def insert_data(self, database, collection, data):
        datab = self.client[database]
        coll = datab[collection]
        post_ids = coll.insert_one(data)
        return(post_ids)

    def find_keys(self, database, collection, query, distinct_key):
        datab = self.client[database]
        coll = datab[collection]
        tags = coll.find(query).distinct(distinct_key)
        return(tags)

class pelion_parser:
    def __init__(self):
        pass

    def base64_to_str(self, string):
        return base64.b64decode(string)
