from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the trained classifier model
with open('model/load_model.pkl', 'rb') as f:
    model = pickle.load(f)

def calculate_risk_score(data):
    """
    Custom formula for risk score calculation based on 13 features.
    You can adjust the weights based on your domain knowledge.
    """
    try:
        age_factor = (int(data['Age']) - 18) / (100 - 18)  # 0 to 1
        income_factor = float(data['AnnualIncome']) / 100000  # scale income
        credit_score_factor = (int(data['Creditscore']) - 300) / (850 - 300)
        loan_amount_factor = float(data['LoanAmount']) / 500000
        loan_duration_factor = int(data['LoanDuration']) / 360
        utilization_factor = float(data['CreditCardUtilizationRate']) / 100
        bankruptcy_factor = 1 if data['BankruptcyHistory'] else 0
        default_factor = 1 if data['PreviousLoanDefaults'] else 0
        credit_history_factor = int(data['LengthOfCreditHistory']) / 50
        liabilities_factor = float(data['TotalLiabilities']) / 1000000
        networth_factor = float(data['NetWorth']) / 1000000
        interest_rate_factor = float(data['InterestRate']) / 100

        # Weighted sum
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
        risk_score = calculate_risk_score(data)

        # Step 2: Predict using classifier
        X = pd.DataFrame([[risk_score]], columns=['RiskScore'])
        prediction = model.predict(X)[0]  # Get class label (0 or 1)
        proba = model.predict_proba(X)[0][1]  # Probability of class 1 (Approved)
        result = 'Approved' if prediction == 1 else 'Rejected'

        print(f"Risk Score: {risk_score}, Prediction: {prediction}, Approval Probability: {proba:.2f}")

        return jsonify({
            'risk_score': round(risk_score, 2),
            'result': result,
            'approval_probability': round(proba, 2)
        })

    except Exception as e:
        print(f"Error in /predict: {str(e)}")
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)