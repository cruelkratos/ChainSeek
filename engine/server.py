from flask import Flask , request , jsonify
from flask_cors import CORS
from engine import Model

app = Flask(__name__)
CORS(app)

my_model = Model()

@app.route('/predict_premium',methods = ['POST'])
def predict_premium():
    try:
        print("hi")
        data = request.json
        print(data)

        # if 'code' not in data or 'coverage_amt' not in data:
        #     return jsonify({"error": "Missing 'code' or 'coverage_amt' in the request"}), 400

        solidity_code = data['code']
        coverage_amt = data['coverage_amt']
        print(solidity_code)
        print(coverage_amt)
        try:
            probs = my_model.get_num_vulnerabilities(solidity_code)
        except:
            return jsonify({"error" : "ML server not working"}), 400

        risk_factor = 0.1
        profit_margin = 0.1
        administrative_cost = 0.1

        for prob in probs:
            risk_factor += ((prob * 0.9) / 8)
        
        premium_amt = (coverage_amt * risk_factor + administrative_cost) * (1 + profit_margin)
        print(premium_amt)
        print(risk_factor)

        return jsonify({"premium_amt" : premium_amt}), 200
    except:
        return jsonify({"error" : "Didn't recieve data"})

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5001)