from flask import Flask, jsonify, request
import flask_cors
import requests

# creating the Flask application


def create_app():
    app = Flask(__name__)

    @app.route('/accounts/me')
    def get_exams():
        headers = {'Authorization': 'Bearer ak_1MDE2NWM3YzQ5ZDVlMGEzN2UzYzYwODJmMDAwMDAwMDA016619a9c2fd2200d95670ee00000000awMhr7voDwFFHRNqjOpVKW38FcJN7r02'}
        resp = requests.get('https://api.us-east-1.mbedcloud.com/v3/devices/', headers=headers)
        return jsonify(resp)


    # @app.route('/exams', methods=['POST'])
    # def add_exam():
    #     # mount exam object
    #     posted_exam = ExamSchema(only=('title', 'description'))\
    #         .load(request.get_json())

    #     exam = Exam(**posted_exam.data, created_by="HTTP post request")

    #     # persist exam
    #     session = Session()
    #     session.add(exam)
    #     session.commit()

    #     # return created exam
    #     new_exam = ExamSchema().dump(exam).data
    #     session.close()
    #     return jsonify(new_exam), 201
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
