let currentNumber = '';
let previousNumber = '';
let operation = null;
let history = [];

document.addEventListener('keydown', handleKeyPress);

function appendNumber(number) {
    if (number === '.' && currentNumber.includes('.')) return;
    currentNumber = currentNumber.toString() + number.toString();
    updateDisplay();
}

function chooseOperation(op) {
    if (currentNumber === '') return;
    if (previousNumber !== '') {
        compute();
    }
    operation = op;
    previousNumber = currentNumber;
    currentNumber = '';
}

function compute() {
    let computation;
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }
    history.push(`${previousNumber} ${operation} ${currentNumber} = ${computation}`);
    currentNumber = computation;
    operation = null;
    previousNumber = '';
    updateDisplay();
    updateHistory();
}

function clearDisplay() {
    currentNumber = '';
    previousNumber = '';
    operation = null;
    updateDisplay();
}

function backspace() {
    currentNumber = currentNumber.toString().slice(0, -1);
    updateDisplay();
}

function appendFraction() {
  if (currentNumber.includes('/')) return;
  currentNumber = currentNumber.toString() + '/';
  updateDisplay();
}

function appendParenthesis(parenthesis) {
  currentNumber = currentNumber.toString() + parenthesis.toString();
  updateDisplay();
}

function compute() {
  try {
      currentNumber = eval(currentNumber).toString();
      updateDisplay();
  } catch (e) {
      clearDisplay();
      document.getElementById('display').innerText = 'Error';
  }
}

function convertUnits(conversion) {
  let result;
  const num = parseFloat(currentNumber);
  if (isNaN(num)) return;
  switch (conversion) {
      case 'cmToInch':
          result = num * 0.393701;
          break;
      case 'inchToCm':
          result = num / 0.393701;
          break;
      default:
          return;
  }
  currentNumber = result.toString();
  updateDisplay();
}

function showHelp() {
  alert("Bem-vindo à calculadora! Aqui estão algumas dicas:\n\n" +
        "- Use os botões para inserir números e operações.\n" +
        "- Use o botão C para limpar o display.\n" +
        "- Use o botão ⌫ para apagar o último dígito.\n" +
        "- Use os botões de parênteses para cálculos complexos.\n" +
        "- Use o botão % para calcular porcentagens.\n" +
        "- Use os botões de conversão de unidades para transformar valores.");
}

const translations = {
  en: {
      clear: "C",
      backspace: "⌫",
      help: "?",
      history: "History",
      display: "0",
      export: "Export" // Adiciona a tradução para "Export"
  },
  pt: {
      clear: "C",
      backspace: "⌫",
      help: "?",
      history: "Histórico",
      display: "0",
      export: "Exportar" // Adiciona a tradução para "Exportar"
  }
};

function changeLanguage(language) {
    document.querySelector('.btn-clear').innerText = translations[language].clear;
    document.querySelector('.btn-backspace').innerText = translations[language].backspace;
    document.querySelector('.btn-help').innerText = translations[language].help;
    document.querySelector('.btn-export').innerText = translations[language].export;
    document.getElementById('history').innerText = translations[language].history;
    document.getElementById('display').innerText = translations[language].display;
}

document.addEventListener('DOMContentLoaded', () => {
    // Defina o idioma padrão aqui, se necessário
    changeLanguage('pt'); // Mude para 'pt' se quiser o padrão em português
});


function exportHistory() {
  const historyText = history.join('\n');
  const blob = new Blob([historyText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'calc_history.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}


function computePercentage() {
  if (currentNumber === '') return;
  currentNumber = (parseFloat(currentNumber) / 100).toString();
  updateDisplay();
}


function updateDisplay() {
    document.getElementById('display').innerText = currentNumber || '0';
}

function updateHistory() {
  const historyElement = document.getElementById('history');
  historyElement.innerText = history.join('\n');
  localStorage.setItem('calcHistory', JSON.stringify(history));
}

function loadHistory() {
  const storedHistory = localStorage.getItem('calcHistory');
  if (storedHistory) {
      history = JSON.parse(storedHistory);
      updateHistory();
  }
}

function clearHistory() {
  history = []; // Limpa o array do histórico
  updateHistory(); // Atualiza a exibição do histórico no elemento HTML
  localStorage.removeItem('calcHistory'); // Remove o histórico armazenado no localStorage
}


document.addEventListener('DOMContentLoaded', loadHistory);


function handleKeyPress(event) {
    const key = event.key;
    if (!isNaN(key)) {
        appendNumber(key);
    } else if (key === '.') {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        chooseOperation(key);
    } else if (key === 'Enter' || key === '=') {
        compute();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape') {
        clearDisplay();
    }
}

function computeTrig(func) {
  if (currentNumber === '') return;
  let result;
  const num = parseFloat(currentNumber);
  if (isNaN(num)) return;
  switch (func) {
      case 'sin':
          result = Math.sin(num);
          break;
      case 'cos':
          result = Math.cos(num);
          break;
      case 'tan':
          result = Math.tan(num);
          break;
      default:
          return;
  }
  currentNumber = result;
  updateDisplay();
}

function toggleTheme() {
  document.body.classList.toggle('dark-theme');
}


