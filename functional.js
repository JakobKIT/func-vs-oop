const MAX_LENGTH = 'MAX_LENGTH';
const IS_TYPE = 'IS_TYPE';
const REQUIRED = 'REQUIRED';

function getElement(tag) {
  return document.querySelector(tag);
}

function getValueFromElement(tag) {
  return getElement(tag).value;
}

function displayResult(result) {
  getElement('#factorial-result').innerHTML = result
}

function validate(value, flag, compareValue) {
  switch (flag) {
    case REQUIRED:
      return value.trim().length > 0;
    case MAX_LENGTH:
      return value <= compareValue;
    case IS_TYPE:
      if (compareValue === 'number') {
        return !isNaN(value);
      } else if (compareValue === 'string') {
        return isNaN(value);
      }
    default:
      break;
  }
}

function factorial(number) {
  let returnValue = 1;
  for (let i = 2; i <= number; i++) {
    returnValue = returnValue * i;
  }
  return returnValue;
}

function calculateFactorial(number) {
  if (validate(number, REQUIRED) && validate(number, MAX_LENGTH, 100) && validate(number, IS_TYPE, 'number')) {
    return factorial(number);
  } else {
    throw new Error(
      'Invalid input - either the number is to big or it is not a number'
    );
  }
}

function factorialHandler(event) {
  event.preventDefault();

  const inputNumber = getValueFromElement('#factorial');
  
  try {
    const result = calculateFactorial(inputNumber);
    displayResult(result);
  } catch (error) {
    alert(error.message);
  } 
}

function addSubmitHandler(tag, handler) {
  const form = getElement(tag);
  form.addEventListener('submit', handler);
}

addSubmitHandler("#factorial-form", factorialHandler);