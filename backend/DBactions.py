from pymongo import MongoClient

class db_api:
    def __init__(self, address, port):
        self.client = MongoClient(address, port)

    def read_all(self):
        db = self.client['db']
        coll = db['devices']
        return('all files')

    def read_filtered(self, query):
        db = self.client['db']
        coll = db['devices']
        return('filtered')

    def insert_file(self, data):
        db = self.client['db']
        coll = db['devices']
        return('inserted file')

    def insert_data(self, data):
        db = self.client['db']
        coll = db['resources']
        post_ids = coll.insert_many(data)
        return post_ids

