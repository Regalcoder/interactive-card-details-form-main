// --- DOM Element Selection ---
var cardholderNameInput = document.getElementById('cardholder-name');
var cardNumberInput = document.getElementById('card-number');
var expMonthInput = document.getElementById('exp-month');
var expYearInput = document.getElementById('exp-year');
var cvcInput = document.getElementById('cvc');
var nameDisplay = document.getElementById('card-name-display');
var numberDisplay = document.getElementById('card-number-display');
var expMonthDisplay = document.getElementById('card-exp-month-display');
var expYearDisplay = document.getElementById('card-exp-year-display');
var cvcDisplay = document.getElementById('card-cvc-display');
var form = document.getElementById('card-form');
var successState = document.getElementById('success-state');
var continueBtn = document.getElementById('continue-btn');
// --- Real-Time Updates ---
cardholderNameInput.addEventListener('input', function () {
    nameDisplay.textContent = cardholderNameInput.value || 'Jane Appleseed';
});
cardNumberInput.addEventListener('input', function () {
    // Format card number with spaces every 4 digits
    var formattedNumber = cardNumberInput.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    cardNumberInput.value = formattedNumber;
    numberDisplay.textContent = formattedNumber || '0000 0000 0000 0000';
});
expMonthInput.addEventListener('input', function () {
    expMonthDisplay.textContent = expMonthInput.value.padStart(2, '0') || '00';
});
expYearInput.addEventListener('input', function () {
    expYearDisplay.textContent = expYearInput.value.padStart(2, '0') || '00';
});
cvcInput.addEventListener('input', function () {
    cvcDisplay.textContent = cvcInput.value || '000';
});
// --- Form Validation and Submission ---
form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();
    var isValid = true;
    // Name Validation
    if (!cardholderNameInput.value) {
        showError('name-error', cardholderNameInput, "Can't be blank");
        isValid = false;
    }
    // Card Number Validation
    var cardNumber = cardNumberInput.value.replace(/\s/g, '');
    if (!cardNumber) {
        showError('number-error', cardNumberInput, "Can't be blank");
        isValid = false;
    }
    else if (!/^\d{16}$/.test(cardNumber)) {
        showError('number-error', cardNumberInput, "Wrong format, must be 16 digits");
        isValid = false;
    }
    // Expiry Date Validation
    var month = expMonthInput.value;
    var year = expYearInput.value;
    if (!month || !year) {
        showError('date-error', expMonthInput, "Can't be blank");
        if (!year)
            showError('date-error', expYearInput, ""); // show border on both
        isValid = false;
    }
    else if (!/^\d{2}$/.test(month) || !/^\d{2}$/.test(year) || +month < 1 || +month > 12) {
        showError('date-error', expMonthInput, "Invalid date");
        showError('date-error', expYearInput, ""); // show border on both
        isValid = false;
    }
    // CVC Validation
    if (!cvcInput.value) {
        showError('cvc-error', cvcInput, "Can't be blank");
        isValid = false;
    }
    else if (!/^\d{3}$/.test(cvcInput.value)) {
        showError('cvc-error', cvcInput, "Must be 3 digits");
        isValid = false;
    }
    if (isValid) {
        form.classList.add('hidden');
        successState.classList.remove('hidden');
    }
});
// --- Utility Functions ---
function showError(errorElementId, inputElement, message) {
    var errorElement = document.getElementById(errorElementId);
    inputElement.classList.add('error');
    if (message)
        errorElement.textContent = message;
}
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(function (el) { return el.textContent = ''; });
    document.querySelectorAll('input.error').forEach(function (el) { return el.classList.remove('error'); });
}
// --- Reset Logic ---
continueBtn.addEventListener('click', function () {
    form.reset();
    clearErrors();
    // Reset card display to defaults
    nameDisplay.textContent = 'Jane Appleseed';
    numberDisplay.textContent = '0000 0000 0000 0000';
    expMonthDisplay.textContent = '00';
    expYearDisplay.textContent = '00';
    cvcDisplay.textContent = '000';
    successState.classList.add('hidden');
    form.classList.remove('hidden');
});
