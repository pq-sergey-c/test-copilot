document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('button');
    let currentInput = '';
    let previousInput = '';
    let operation = null;
    let shouldResetScreen = false;

    // Add keyboard event listener
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Delete') {
            clear();
            updateDisplay();
        }
    });

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.dataset.value;

            if (!isNaN(value) || value === '.') {
                handleNumber(value);
            } else {
                handleOperator(value);
            }
            updateDisplay();
        });
    });

    function handleNumber(value) {
        if (shouldResetScreen) {
            currentInput = '';
            shouldResetScreen = false;
        }
        if (value === '.' && currentInput.includes('.')) return;
        currentInput += value;
    }

    function handleOperator(value) {
        switch (value) {
            case 'clear':
                clear();
                break;
            case 'backspace':
                backspace();
                break;
            case '=':
                calculate();
                break;
            default:
                setOperation(value);
        }
    }

    function clear() {
        currentInput = '';
        previousInput = '';
        operation = null;
    }

    function backspace() {
        currentInput = currentInput.slice(0, -1);
    }

    function setOperation(operator) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculate();
        }
        operation = operator;
        previousInput = currentInput;
        currentInput = '';
    }

    function calculate() {
        if (previousInput === '' || currentInput === '') return;
        
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        let result;

        switch (operation) {
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
                    alert('Cannot divide by zero!');
                    clear();
                    return;
                }
                result = prev / current;
                break;
            case '%':
                result = prev % current;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operation = null;
        previousInput = '';
        shouldResetScreen = true;
    }

    function updateDisplay() {
        display.value = currentInput || '0';
    }
});