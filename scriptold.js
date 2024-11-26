// Selección de elementos del DOM
const incomeSlider = document.getElementById('income');
const debtSlider = document.getElementById('debt');
const creditScoreSlider = document.getElementById('creditScore');

const incomeValue = document.getElementById('incomeValue');
const debtValue = document.getElementById('debtValue');
const creditScoreValue = document.getElementById('creditScoreValue');

const predictionElement = document.getElementById('prediction');

// Función para actualizar los valores de los sliders
function updateValues() {
    const income = parseInt(incomeSlider.value);
    const debt = parseInt(debtSlider.value);
    const creditScore = parseInt(creditScoreSlider.value);

    incomeValue.textContent = `$${income.toLocaleString()}`;
    debtValue.textContent = `$${debt.toLocaleString()}`;
    creditScoreValue.textContent = creditScore;

    updatePrediction(income, debt, creditScore);
}

// Función para calcular y mostrar la predicción
function updatePrediction(income, debt, creditScore) {
    let prediction = 'Aprobación Baja';

    // Lógica simple para la predicción
    if (income > 10000 && debt < 3000 && creditScore > 700) {
        prediction = 'Aprobación Alta';
    } else if (income > 7000 && debt < 5000 && creditScore > 600) {
        prediction = 'Aprobación Moderada';
    }

    predictionElement.textContent = prediction;
}

// Agregar eventos para los sliders
incomeSlider.addEventListener('input', updateValues);
debtSlider.addEventListener('input', updateValues);
creditScoreSlider.addEventListener('input', updateValues);

// Inicializar valores al cargar la página
updateValues();
