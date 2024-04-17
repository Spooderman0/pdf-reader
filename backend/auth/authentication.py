import pyrebase
config = {
    'apiKey': "AIzaSyD1NTSABjJFs4mtvMOtQIvRRpeVI3Gq8ts",
  'authDomain': "pruebaapi-43fcf.firebaseapp.com",
  'databaseURL': "https://pruebaapi-43fcf-default-rtdb.firebaseio.com",
  'projectId': "pruebaapi-43fcf",
  'storageBucket': "pruebaapi-43fcf.appspot.com",
  'messagingSenderId': "759352341168",
  'appId': "1:759352341168:web:ac9341e92929e4ae788175",
}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()