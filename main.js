function getFirstName() {
    return document.getElementById('firstName');
}
function getLastName() {
    return document.getElementById('lastName');
}
function getLocation() {
    return document.getElementById('location');
}

function valueChangeHandler($el, name) {
    validateField(name, $el.value);
}

function validateAndGoNext() {
    const firstName = getFirstName().value;
    const lastName = getLastName().value;
    const location = getLocation().value;

    showErrors(firstName, lastName, location);

    if (firstName && lastName && location) {
        nextHandler(1);
    }
}

function showErrors(firstName, lastName, location) {
    validateField('firstName', firstName);
    validateField('lastName', lastName);
    validateField('location', location);
}

function validateField(name, value) {
    if (!value) {
        document.getElementsByClassName(`${name}-error`)[0].style.display = 'block';
        document.getElementById(name).classList.add('error');
    } else {
        document.getElementsByClassName(`${name}-error`)[0].style.display = 'none';
        document.getElementById(name).classList.remove('error');
    }
}

function nextHandler(index) {
    document.getElementsByClassName(`step-${index-1}`)[0].style.display='none';
    document.getElementsByClassName(`step-${index}`)[0].style.display='block';
}

function estimatePropertyValue(value) {
    const val = parseInt(value, 10);

    if (val === 1) {
        return 'Under $10,000';
    }

    if (val < 40) {
        return getPeriodLabel(val, 1e4);
    } else if (val < 50) {
        return getPeriodLabel(val, 2e4);
    } else if (val < 75) {
        return '1-1.5M';
    }

    return `2M+`;
}

function getPeriodLabel(val, step) {
    const start = (val - 1) * step + 1;
    const end = val * step;

    return `$${start.toLocaleString()} - $${end.toLocaleString()}`;
}

function setLabel(value) {
    const val = estimatePropertyValue(value);

    const $el = document.getElementById('range-input');

    $el.innerHTML = val;
}
