from pymongo import MongoClient

class db_api:
    client = MongoClient('localhost', 27017)
    def read_all(self):
        return('all files')

    def read_filtered(self, query):
        return('filtered')

    def insert_file(self, data):
        return('inserted file')
