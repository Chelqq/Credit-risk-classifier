// Obtener el formulario y el campo de predicción
const form = document.getElementById('predictForm');
const resultElement = document.getElementById('predictionResult');

// Manejar el evento de envío del formulario
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío por defecto del formulario

    // Obtener los valores de las características del formulario
    const age = document.getElementById('age').value;
    const sex = document.getElementById('sex').value;
    const job = document.getElementById('job').value;
    const housing = document.getElementById('housing').value;
    const saving_accounts = document.getElementById('saving_accounts').value;
    const checking_account = document.getElementById('checking_account').value;
    const duration = document.getElementById('duration').value;
    const purpose = document.getElementById('purpose').value;

    // Crear el objeto de datos para enviar
    const data = {
        features: [
            parseFloat(age), 
            (sex === "female" ? 0 : 1), 
            parseInt(job), 
            parseInt(housing), 
            parseInt(saving_accounts), 
            parseInt(checking_account), 
            parseInt(duration), 
            parseInt(purpose)
        ]
    };

    function sendData() {
        const form = document.getElementById('prediction-form');
        const formData = new FormData(form);
        const features = Array.from(formData.values()).map(value => parseFloat(value));
    
        fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ features: features }),
        })
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('prediction-result');
            resultDiv.textContent = data.prediction;
            resultDiv.className = data.prediction === "Crédito de alto riesgo" ? 'prediction-result high-risk' : 'prediction-result low-risk';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    

    // Enviar la solicitud POST a la API
    fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // Mostrar el resultado de la predicción en el frontend
        resultElement.innerText = `Predicción: ${data.prediction}`;
    })
    .catch(error => {
        console.error('Error al hacer la predicción:', error);
    });

    
});
