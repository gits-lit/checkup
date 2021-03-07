from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from ximilar.client import RecognitionClient
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
   gender = request.json["gender"]
   year_of_birth = request.json["yearOfBirth"]
   symptom_names = []
   # symptom_names = request.json["symptoms"]

   client = RecognitionClient(token=config.vize_key)
   task, status = client.get_task(task_id=config.vize_task_id)
   # # you can send image in _file, _url or _base64 format
   # # the _file format is intenally converted to _base64 as rgb image
   result = task.classify([{'_url': '__URL_PATH_TO_IMG__'}, {'_file': '__LOCAL_FILE_PATH__'}, {'_base64': '__BASE64_DATA__'}])
   best_label = result['records'][0]['best_label']
   symptom_names.append(best_label)

   # gender = "male"
   # year_of_birth = "1984"
   # symptom_names = ["Eye redness", "Eye pain", "Fever"] 

   symptom_list = {}
   gendered_symptom_list = {}
   with open("symptom_list.json") as f:
      symptom_list = json.load(f)

   if (gender == "male"):
      with open("symptoms_man.json") as f:
         gendered_symptom_list = json.load(f)
   else:
      with open("symptoms_woman.json") as f:
         gendered_symptom_list = json.load(f)

   symptom_ids = []
   red_flags = []

   for symptom in symptom_names:
      if symptom in symptom_list:
         symptom_ids.append(symptom_list[symptom])
         if gendered_symptom_list[symptom]["HasRedFlag"]:
            red_flags.append(0)
         else:
            red_flags.append(1)
      else:
         print("Symptom " + symptom + " not found!")

   score = 100 * (sum(red_flags) / len(red_flags))

   diagnosis_url = "https://priaid-symptom-checker-v1.p.rapidapi.com/diagnosis"
   querystring = {"symptoms": str(symptom_ids), "gender": gender, "year_of_birth": year_of_birth, "language": "en-gb"}
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

   return make_response(jsonify({"conditions": conditions, "score": str(score)}), 200)


@app.route('/api/diagnose/checkMentalHealth', methods=["POST"])
def checkMentalHealth():
   pass


@app.route('/api/doctors/recommendDoctors', methods=["POST"])
def recommendDoctors():
   def formatPlaceType(placeType):
      place_tokens = placeType.split("_")
      place_tokens[0] = place_tokens[0].capitalize()
      return " ".join(place_tokens)

   def getField(obj, fieldName, subfieldName=None, subsubfieldName=None):
      if (fieldName in obj):
         if subfieldName and subsubfieldName:
            return obj[fieldName][subfieldName][subsubfieldName]
         return obj[fieldName]
      return ""

   # diseases = request.json["diseases"]
   # zipcode = request.json["zipcode"]
   diseases = ["Common cold","Influenza","Meningitis"]
   zipcode = 12345
   location = "32.7157,-117.1611"
   place_search_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
   place_details_url = "https://maps.googleapis.com/maps/api/place/details/json"
   doctors = []

   i = 0
   for disease in diseases:
      i += 1
      # only want top 5
      if (i > 5):
         break

      # API call to search for a nearby doctor
      search_target = disease
      querystring = {"key": config.places_key, "location": location, "radius": "1500", "keyword": search_target, "type": "doctor", "fields": "formatted_address", "language": "en-gb"}
      findplace_response = requests.request("GET", place_search_url, params=querystring)
      findplace_data = findplace_response.json()
      found_ids = []

      if (findplace_data["status"] == "OK"):
         for place in findplace_data["results"]:
            findplace_id = place["place_id"]

            # API call to get details for queried place
            querystring = {"key": config.places_key, "place_id": findplace_id,
                           "language": "en-gb", "fields": "formatted_address,formatted_phone_number,name,geometry"}
            finddetails_response = requests.request("GET", place_details_url, params=querystring)
            finddetails_data = findplace_response.json()

            for place_details in finddetails_data["results"]:
               if (getField(place_details, "place_id") not in found_ids):
                  # doctor object
                  doctor = {}
                  doctor["name"]         = getField(place_details, "name")
                  doctor["occupation"]   = formatPlaceType(place_details["types"][0])
                  doctor["lat"]          = getField(place_details,"geometry","location","lat")
                  doctor["long"]         = getField(place_details,"geometry","location","lng")
                  doctor["address"]      = getField(place,"vicinity")
                  doctor["phone-number"] = getField(place_details,"formatted_phone_number")
                  # doctor["office-hours"] =
                  doctors.append(doctor)
                  found_ids.append(getField(place_details, "place_id"))
      else:
         print("Got status " + findplace_data["status"])

   return make_response(jsonify({"doctors": doctors}), 200)
