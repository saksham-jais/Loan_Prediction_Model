from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the trained model
with open('load_model.pkl', 'rb') as f:
    model = pickle.load(f)

def calculate_risk_score(data):
    """
    Custom formula for risk score calculation based on 13 features.
    You can adjust the weights based on your domain knowledge.
    """
    try:
        # Normalize values and create a simple weighted score
        age_factor = (int(data['age']) - 18) / (100 - 18)  # 0 to 1
        income_factor = float(data['annualIncome']) / 100000  # scale income
        credit_score_factor = (int(data['creditScore']) - 300) / (850 - 300)
        loan_amount_factor = float(data['loanAmount']) / 500000
        loan_duration_factor = int(data['loanDuration']) / 360
        utilization_factor = float(data['creditCardUtilization']) / 100
        bankruptcy_factor = 1 if int(data['bankruptcyHistory']) > 0 else 0
        default_factor = 1 if int(data['previousLoanDefaults']) > 0 else 0
        credit_history_factor = int(data['lengthOfCreditHistory']) / 50
        liabilities_factor = float(data['totalLiabilities']) / 1000000
        networth_factor = float(data['netWorth']) / 1000000
        interest_rate_factor = float(data['interestRate']) / 100

        # Weighted sum (you can tune weights based on importance)
        risk_score = (
            0.15 * (1 - credit_score_factor) +
            0.10 * utilization_factor +
            0.10 * bankruptcy_factor +
            0.10 * default_factor +
            0.05 * loan_amount_factor +
            0.05 * loan_duration_factor +
            0.05 * liabilities_factor +
            0.05 * interest_rate_factor +
            0.05 * (1 - income_factor) +
            0.05 * (1 - networth_factor) +
            0.05 * (1 - credit_history_factor) +
            0.05 * (1 - age_factor)
        )

        # Scale to 0-100 range
        return max(0, min(risk_score * 100, 100))
    except Exception as e:
        raise ValueError(f"Error calculating risk score: {str(e)}")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    try:
        # Step 1: Calculate risk score
        risk_score = calculate_risk_score({
            'annualIncome': data['annualIncome'],
            'loanDuration': data['loanDuration'],
            'loanAmount': data['loanAmount'],
            'age': data['age'],
            'creditCardUtilization': data['creditCardUtilization'],
            'creditScore': data['creditScore'],
            'bankruptcyHistory': data['bankruptcyHistory'],
            'previousLoanDefaults': data['previousLoanDefaults'],
            'lengthOfCreditHistory': data['lengthOfCreditHistory'],
            'totalLiabilities': data['totalLiabilities'],
            'netWorth': data['netWorth'],
            'interestRate': data['interestRate']
        })

        # Step 2: Predict based on risk score only
        prediction = model.predict([[risk_score]])
        result = 'Approved' if prediction[0] == 1 else 'Rejected'

        return jsonify({
            'risk_score': round(risk_score, 2),
            'result': result
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
