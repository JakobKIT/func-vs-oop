class Validator {
  static MAX_LENGTH = 'MAX_LENGTH';
  static IS_TYPE = 'IS_TYPE';
  static REQUIRED = 'REQUIRED';

  static validate(value, flag, compareValue) {
    switch (flag) {
      case this.REQUIRED:
        return value.trim().length > 0;
      case this.MAX_LENGTH:
        return value <= compareValue;
      case this.IS_TYPE:
        if (compareValue === 'number') {
          return !isNaN(value);
        } else if (compareValue === 'string') {
          return isNaN(value);
        }
      default:
        break;
    }
  }
}

class Factorial {
  constructor(number) {
    this.resultElement = document.getElementById('factorial-result');
    this.number = number;
    this.factorial = this.calculate();
  }

  calculate() {
    let returnValue = 1;
    for (let i = 2; i <= this.number; i++) {
      returnValue = returnValue * i;
    }
    return returnValue;
  }

  display() {
    this.resultElement.innerHTML = this.factorial;
  }
}

class InputForm {
  constructor() {
    this.form = document.getElementById('factorial-form');
    this.numberInput = document.getElementById('factorial');

    this.form.addEventListener('submit', this.factorialHandler.bind(this));
  }

  factorialHandler(event) {
    event.preventDefault();

    const number = this.numberInput.value;

    if (!Validator.validate(number, Validator.REQUIRED) 
      || !Validator.validate(number, Validator.MAX_LENGTH, 100)
      || !Validator.validate(number, Validator.IS_TYPE, 'number'))
      {
        alert('Invalid input - either the number is to big or it is not a number');
        return;
      }

      const factorial = new Factorial(number);
      factorial.display();
  }
}

new InputForm();