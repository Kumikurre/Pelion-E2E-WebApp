This is the Python flask backend for Pelion E2E application. 

Database can be set up by installing Docker and docker-compose and then running docker-compose up. In the future, the Python application will be setup with the same compose command.

Authentication is also still in development, so to get access to Pelion you need to create apikey.py file to backend directory, with contents like this:
```python
class Credentials:
    apikey = 'apikey here'
```
Pelion will send data to the web application backend, but it needs to know the address of the callback url. To enable this, you need to change the address where the service is exposed, in app.py like so: service_address = 'ip address here'
