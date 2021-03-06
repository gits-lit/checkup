from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import requests
import json
import config  # config.py contains api keys

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)


@app.route('/')
def get_entry():
   return ("GET Request successful!")


@app.route('/api/test/get')
def test_get():
   return ("GET Request successful!")


@app.route('/api/diagnose/checkSkin', methods=["POST"])
def diagnose():
   pass

@app.route('/api/diagnose/checkDisease', methods=["POST"])
def checkDisease():
   # gender = request.json["gender"]
   # year_of_birth = request.json["year_of_birth"]
   # symptom_names = request.json["symptoms"]

   gender = "male"
   year_of_birth = "1984"
   symptom_names = ["Neck stiffness", "Fever"]  # ids [234,11]

   symptom_list = {}
   with open("symptom_list.json") as f:
      symptom_list = json.load(f)

   symptom_ids = []

   for symptom in symptom_names:
      if symptom in symptom_list:
         symptom_ids.append(symptom_list[symptom])
      else:
         print("Symptom " + symptom + " not found!")

   diagnosis_url = "https://priaid-symptom-checker-v1.p.rapidapi.com/diagnosis"
   querystring = {"symptoms": str(
      symptom_ids), "gender": gender, "year_of_birth": year_of_birth, "language": "en-gb"}
   headers = {
      'x-rapidapi-key': config.symptom_checker_key,
      'x-rapidapi-host': "priaid-symptom-checker-v1.p.rapidapi.com"
   }

   response = requests.request(
      "GET", diagnosis_url, headers=headers, params=querystring)
   data = response.json()

   # print(response.text)

   conditions = []
   accuracies = []
   for item in data:
      # tuple of (Potential Disease, Confidence Level)
      conditions.append((item["Issue"]["ProfName"],
                        item["Issue"]["Accuracy"]))

      accuracies.append(item["Issue"]["Accuracy"])

   score = str(100) # do some shit with the red flags 

   return make_response(jsonify({"conditions": conditions, "score": score}), 200)


@app.route('/api/diagnose/checkMentalHealth', methods=["POST"])
def checkMentalHealth():
   pass


@app.route('/api/doctors/recommendDoctors', methods=["POST"])
def recommendDoctors():
   pass
