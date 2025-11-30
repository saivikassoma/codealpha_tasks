const display = document.getElementById('display');
    let currentInput = '';
    let previousInput = '';
    let operator = null;
    let resetDisplay = false; // To reset screen after =

    function appendNumber(num) {
      if (resetDisplay) {
        currentInput = '';
        resetDisplay = false;
      }
      if (num === '.' && currentInput.includes('.')) return; // Prevent multiple dots
      currentInput += num;
      updateDisplay();
    }

    function chooseOperator(op) {
      if (currentInput === '') return;
      if (previousInput !== '') {
        calculate();
      }
      operator = op;
      previousInput = currentInput;
      currentInput = '';
    }

    function calculate() {
      let result;
      const prev = parseFloat(previousInput);
      const current = parseFloat(currentInput);
      if (isNaN(prev) || isNaN(current)) return;
      switch (operator) {
        case '+':
          result = prev + current;
          break;
        case '-':
          result = prev - current;
          break;
        case '*':
          result = prev * current;
          break;
        case '/':
          if (current === 0) {
            alert("Cannot divide by zero");
            clearAll();
            return;
          }
          result = prev / current;
          break;
        default:
          return;
      }
      currentInput = result.toString();
      operator = null;
      previousInput = '';
      resetDisplay = true;
      updateDisplay();
    }

    function clearAll() {
      currentInput = '';
      previousInput = '';
      operator = null;
      updateDisplay();
    }

    function updateDisplay() {
      if (operator && previousInput) {
        display.value = `${previousInput} ${operator} ${currentInput}`;
      } else {
        display.value = currentInput;
      }
    }

    document.querySelectorAll('button[data-num]').forEach(button => {
      button.addEventListener('click', () => appendNumber(button.dataset.num));
    });

    document.querySelectorAll('button.operator').forEach(button => {
      button.addEventListener('click', () => chooseOperator(button.dataset.op));
    });

    document.getElementById('equal').addEventListener('click', calculate);
    document.getElementById('clear').addEventListener('click', clearAll);

    // Keyboard support
    window.addEventListener('keydown', (e) => {
      if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
        appendNumber(e.key);
      } else if (['+', '-', '*', '/'].includes(e.key)) {
        chooseOperator(e.key);
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
      } else if (e.key.toLowerCase() === 'c') {
        clearAll();
      }
    });

    updateDisplay();
 