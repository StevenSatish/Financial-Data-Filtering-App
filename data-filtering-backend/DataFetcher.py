from flask import Flask, jsonify, request
import requests
from dotenv import load_dotenv
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)
load_dotenv()

# Load the API key
api_key = os.getenv('API_KEY')
api_url = f"https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey={api_key}"

# Fetch the data from the external API at startup
def fetch_data():
    try:
        response = requests.get(api_url)
        if response.status_code == 200:
            raw_data = response.json()  # Fetch raw data
            
            # Process and filter the raw data
            filtered_data = [
                {
                    "date": entry.get("date"),
                    "revenue": entry.get("revenue"),
                    "netIncome": entry.get("netIncome"),
                    "grossProfit": entry.get("grossProfit"),
                    "eps": entry.get("eps"),
                    "operatingIncome": entry.get("operatingIncome"),
                }
                for entry in raw_data
            ]
            return filtered_data  
        else:
            print(f"Error fetching data: {response.status_code}")
            return []
    except Exception as e:
        print(f"Error during API call: {e}")
        return []

data = fetch_data()  # Fetch data when the app starts

@app.route('/get-filtered-data', methods=['GET'])
def get_data():
    # Check for api data
    if not data:
        return jsonify({"error": "No data available"}), 500

    # parse the parameters
    try:
        lDate = request.args.get('leftDate', type=int)
        rDate = request.args.get('rightDate', type=int)
        lRevenue = request.args.get('leftRevenue', type=float)
        rRevenue = request.args.get('rightRevenue', type=float)
        lNet = request.args.get('leftNet', type=float)
        rNet = request.args.get('rightNet', type=float)

    except ValueError as e:
        return jsonify({"error": f"Invalid parameter value: {e}"}), 400

    filtered = []
    for record in data:
        try:
            #param checks 
            date = int(record.get('date')[:4])
            if lDate and date < lDate:
                continue
            if rDate and date > rDate:
                continue

            revenue = float(record.get('revenue'))
            if lRevenue and revenue < lRevenue:
                continue
            if rRevenue and revenue > rRevenue:
                continue

            net_income = float(record.get('netIncome'))
            if lNet and net_income < lNet:
                continue
            if rNet and net_income > rNet:
                continue

            filtered.append(record) # add record if it makes it past checks
        except (ValueError, TypeError) as e:
            print(f"Skipping record due to error: {e}")

    return jsonify(filtered), 200

if __name__ == '__main__':
    app.run(debug=True)
