document.getElementById('prediction-form').addEventListener('submit', function(event) {
    event.preventDefault();

    try {
        // Obtener las 10 características
        let features = [];
        for (let i = 1; i <= 10; i++) {
            let value = parseFloat(document.getElementById(`feature${i}`).value);
            if (isNaN(value)) {
                throw new Error(`Feature ${i} no es un número válido.`);
            }
            features.push(value);
        }

        console.log("Vector de características ingresadas:", features);

        // Asegúrate de que la clase RandomForestClassifier esté disponible
        if (typeof RandomForestClassifier === "undefined") {
            console.error("El modelo RandomForestClassifier no está definido.");
            document.getElementById('result').textContent = "Error: Modelo no encontrado.";
            return;
        }

        // Crear una instancia del modelo
        let forest = new RandomForestClassifier();
        console.log("Modelo cargado:", forest);

        // Usar el modelo para predecir
        let prediction = forest.predict(features);
        console.log("Predicción:", prediction);

        document.getElementById('result').textContent = 'Predicción: ' + prediction;
    } catch (error) {
        console.error("Error durante la predicción:", error);
        document.getElementById('result').textContent = "Error al procesar la predicción.";
    }
});
