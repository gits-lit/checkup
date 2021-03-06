from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, emit

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)

@app.route('/api/test/get')
def test_get():
   return ("GET Request successful!")

@app.route('/api/diagnose/checkSkin')
def diagnose():
   pass

@app.route('/api/diagnose/checkDisease')
def checkDisease():
   pass

@app.route('/api/diagnose/checkMentalHealth')
def checkMentalHealth():
   pass

@app.route('/api/doctors/recommendDoctors')
def recommendDoctors():
   pass

