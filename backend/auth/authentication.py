import firebase_admin
from firebase_admin import auth
from firebase_admin import credentials
import json
import requests

with open('./config/firebaseConfig.json') as f:
    data = json.load(f)


api_key = data['apiKey']

def sign_in_with_email_and_password(email, password):
        request_ref = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key={0}".format(api_key)
        headers = {"content-type": "application/json; charset=UTF-8"}
        data = json.dumps({"email": email, "password": password, "returnSecureToken": True})
        request_object = requests.post(request_ref, headers=headers, data=data)
        current_user = request_object.json()
        
        return request_object

def sign_up_with_email_and_password(email, password):
        request_ref = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key={0}".format(api_key)
        headers = {"content-type": "application/json; charset=UTF-8"}
        data = json.dumps({"email": email, "password": password, "returnSecureToken": True})
        request_object = requests.post(request_ref, headers=headers, data=data)
        current_user = request_object.json()
        return request_object.json()

def create_user(email, password):
    try:
        user = auth.create_user(email=email, password=password)
        print('Sucessfully created new user: {0}'.format(user.uid))
    except:
        print('Failed to create a new user')

def get_user(uid):
    try:
        user = auth.get_user(uid)
        print('Sucessfully fetched user: {0}'.format(user.uid))
    except:
        print('Failed to fetch user')


