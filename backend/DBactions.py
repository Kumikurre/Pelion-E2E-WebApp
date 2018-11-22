from pymongo import MongoClient
import base64

class db_api:
    def __init__(self, address, port):
        self.client = MongoClient(address, port)

    def read_all(self, db):
        db = self.client[db]
        coll = db['devices']
        items = coll.find({})
        return(list(items))

    def read_filtered(self, query, db, collection):
        db = self.client[db]
        coll = db[collection]
        items = coll.find(query)
        return(list(items))

    def insert_file(self, db, collection, data):
        db = self.client[db]
        coll = db[collection]
        post_id = coll.insert_many(data)
        return(post_id)

    def insert_data(self, db, collection, data):
        db = self.client[db]
        coll = db[collection]
        post_ids = coll.insert_many(data)
        return(post_ids)

class pelion_parser:
    def __init__(self):
        pass

    def base64_to_str(self, string):
        return base64.b64decode(string)
