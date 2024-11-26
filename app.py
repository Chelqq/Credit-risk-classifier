from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Cargar el modelo previamente entrenado
model = joblib.load('random_forest_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)

    # Asegúrate de que se reciban 10 características
    if len(data['features']) != 10:
        return jsonify({'error': 'Se necesitan exactamente 10 características.'}), 400

    # Convertir las características en un array y hacer la predicción
    features = np.array(data['features']).reshape(1, -1)
    prediction = model.predict(features)

    return jsonify({'prediction': int(prediction[0])})

@app.route('/')
def index():
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run(debug=True)