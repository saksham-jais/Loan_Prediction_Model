from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the model
with open('loan_model.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    try:
        # Extract data in the correct order expected by model
        features = [
            float(data['annualIncome']),
            float(data['loanDuration']),
            float(data['loanAmount']),
            float(data['age']),
            float(data['creditCardUtilization']),
            int(data['creditScore']),
            1 if data['gender'] == 'Male' else 0,
            1 if data['married'] == 'Yes' else 0,
            int(data['bankruptcyHistory']) if data['bankruptcyHistory'] != "3+" else 3,
            int(data['previousLoanDefaults']) if data['previousLoanDefaults'] != "3+" else 3,
            ['Graduate', 'Associate', 'Master', 'Bachelor', 'High School'].index(data['education']),
            1 if data['employmentStatus'] == 'Yes' else 0,
            ['Urban', 'Semiurban', 'Rural'].index(data['propertyArea'])
        ]

        prediction = model.predict([features])
        result = 'Approved' if prediction[0] == 1 else 'Rejected'

        return jsonify({'result': result})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
