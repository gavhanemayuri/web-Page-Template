$(document).ready(function() {
    let currentInput = '0';
    let firstOperand = null;
    let operator = null;
    let waitingForSecondOperand = false;

    const $display = $('#display');

    // Function to update the display
    function updateDisplay() {
        $display.val(currentInput);
    }

    // Handle number and decimal clicks
    $('.btn-dark').not('[data-action]').on('click', function() {
        const value = $(this).data('value');

        if (waitingForSecondOperand === true) {
            currentInput = value;
            waitingForSecondOperand = false;
        } else {
            // Prevent multiple decimals, handle initial '0'
            if (value === '.') {
                if (currentInput.includes('.')) return;
            } else if (currentInput === '0') {
                currentInput = value;
            } else {
                currentInput += value;
            }
        }
        updateDisplay();
    });

    // Handle operator clicks
    $('[data-action="operator"]').on('click', function() {
        const nextOperator = $(this).data('value');
        const inputValue = parseFloat(currentInput);

        if (operator && waitingForSecondOperand) {
            operator = nextOperator; // Allow changing the operator
            return;
        }

        if (firstOperand === null && !isNaN(inputValue)) {
            firstOperand = inputValue;
        } else if (operator) {
            // Perform calculation if we have all parts
            const result = calculate(firstOperand, inputValue, operator);
            currentInput = String(result);
            firstOperand = result;
        }

        waitingForSecondOperand = true;
        operator = nextOperator;
        updateDisplay();
    });

    // Handle equals (=) click
    $('[data-action="calculate"]').on('click', function() {
        if (operator === null || waitingForSecondOperand) {
            return; // Nothing to calculate
        }

        const inputValue = parseFloat(currentInput);
        const result = calculate(firstOperand, inputValue, operator);

        currentInput = String(result);
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = true; // Ready for a new calculation
        updateDisplay();
    });

    // Handle special actions (Clear, Sign, Percent)
    $('[data-action]').on('click', function() {
        const action = $(this).data('action');

        switch (action) {
            case 'clear':
                currentInput = '0';
                firstOperand = null;
                operator = null;
                waitingForSecondOperand = false;
                break;
            case 'sign':
                currentInput = String(parseFloat(currentInput) * -1);
                break;
            case 'percent':
                currentInput = String(parseFloat(currentInput) / 100);
                break;
        }
        updateDisplay();
    });

    // Core calculation function
    function calculate(n1, n2, op) {
        switch (op) {
            case '+': return n1 + n2;
            case '-': return n1 - n2;
            case '*': return n1 * n2;
            case '/': return n2 !== 0 ? n1 / n2 : 'Error';
            default: return n2;
        }
    }

    // Initial display update
    updateDisplay();
});