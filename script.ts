// --- DOM Element Selection ---
const cardholderNameInput = document.getElementById('cardholder-name') as HTMLInputElement;
const cardNumberInput = document.getElementById('card-number') as HTMLInputElement;
const expMonthInput = document.getElementById('exp-month') as HTMLInputElement;
const expYearInput = document.getElementById('exp-year') as HTMLInputElement;
const cvcInput = document.getElementById('cvc') as HTMLInputElement;

const nameDisplay = document.getElementById('card-name-display') as HTMLParagraphElement;
const numberDisplay = document.getElementById('card-number-display') as HTMLParagraphElement;
const expMonthDisplay = document.getElementById('card-exp-month-display') as HTMLSpanElement;
const expYearDisplay = document.getElementById('card-exp-year-display') as HTMLSpanElement;
const cvcDisplay = document.getElementById('card-cvc-display') as HTMLParagraphElement;

const form = document.getElementById('card-form') as HTMLFormElement;
const successState = document.getElementById('success-state') as HTMLDivElement;
const continueBtn = document.getElementById('continue-btn') as HTMLButtonElement;

// --- Real-Time Updates ---
cardholderNameInput.addEventListener('input', () => {
    nameDisplay.textContent = cardholderNameInput.value || 'Jane Appleseed';
});

cardNumberInput.addEventListener('input', () => {
    // Format card number with spaces every 4 digits
    const formattedNumber = cardNumberInput.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    cardNumberInput.value = formattedNumber;
    numberDisplay.textContent = formattedNumber || '0000 0000 0000 0000';
});

expMonthInput.addEventListener('input', () => {
    expMonthDisplay.textContent = expMonthInput.value.padStart(2, '0') || '00';
});

expYearInput.addEventListener('input', () => {
    expYearDisplay.textContent = expYearInput.value.padStart(2, '0') || '00';
});

cvcInput.addEventListener('input', () => {
    cvcDisplay.textContent = cvcInput.value || '000';
});


// --- Form Validation and Submission ---
form.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    clearErrors();
    let isValid = true;

    // Name Validation
    if (!cardholderNameInput.value) {
        showError('name-error', cardholderNameInput, "Can't be blank");
        isValid = false;
    }

    // Card Number Validation
    const cardNumber = cardNumberInput.value.replace(/\s/g, '');
    if (!cardNumber) {
        showError('number-error', cardNumberInput, "Can't be blank");
        isValid = false;
    } else if (!/^\d{16}$/.test(cardNumber)) {
        showError('number-error', cardNumberInput, "Wrong format, must be 16 digits");
        isValid = false;
    }

    // Expiry Date Validation
    const month = expMonthInput.value;
    const year = expYearInput.value;
    if (!month || !year) {
        showError('date-error', expMonthInput, "Can't be blank");
        if (!year) showError('date-error', expYearInput, ""); // show border on both
        isValid = false;
    } else if (!/^\d{2}$/.test(month) || !/^\d{2}$/.test(year) || +month < 1 || +month > 12) {
        showError('date-error', expMonthInput, "Invalid date");
        showError('date-error', expYearInput, ""); // show border on both
        isValid = false;
    }

    // CVC Validation
    if (!cvcInput.value) {
        showError('cvc-error', cvcInput, "Can't be blank");
        isValid = false;
    } else if (!/^\d{3}$/.test(cvcInput.value)) {
        showError('cvc-error', cvcInput, "Must be 3 digits");
        isValid = false;
    }

    if (isValid) {
        form.classList.add('hidden');
        successState.classList.remove('hidden');
    }
});

// --- Utility Functions ---
function showError(errorElementId: string, inputElement: HTMLInputElement, message: string) {
    const errorElement = document.getElementById(errorElementId) as HTMLDivElement;
    inputElement.classList.add('error');
    if (message) errorElement.textContent = message;
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => (el as HTMLDivElement).textContent = '');
    document.querySelectorAll('input.error').forEach(el => el.classList.remove('error'));
}

// --- Reset Logic ---
continueBtn.addEventListener('click', () => {
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