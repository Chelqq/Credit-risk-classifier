from flask import Flask, request, jsonify, send_from_directory
import pickle
import numpy as np
import os

# Crear la aplicación Flask
app = Flask(__name__)

# Cargar el modelo desde el archivo pickle
with open('random_forest_model.pkl', 'rb') as file:
    model = pickle.load(file)

# Ruta para servir el archivo HTML de la página web
@app.route('/')
def serve_home():
    return send_from_directory(os.getcwd(), 'static/index.html')

# Ruta para hacer predicciones
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()  # Los datos deben enviarse en formato JSON
    features = np.array(data['features']).reshape(1, -1)  # Ajustar la forma de los datos

    # Hacer la predicción
    prediction = model.predict(features)

    # Determinar el mensaje basado en la predicción
    if prediction[0] == 1:  # Si la predicción es 1, es "alto riesgo"
        result = "Crédito de alto riesgo"
    else:  # Si la predicción es 0, es "bajo riesgo"
        result = "Crédito de bajo riesgo"

    # Retornar la predicción en formato JSON
    return jsonify({'prediction': result})

if __name__ == '__main__':
    app.run(debug=True)
