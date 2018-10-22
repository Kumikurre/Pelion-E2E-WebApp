from pymongo import MongoClient

class db_api:
    client = MongoClient('localhost', 27017)
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
