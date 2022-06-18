/*declare my buttons*/
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equal]');
const clearButton = document.querySelector('[data-clear]');
const eggButton = document.querySelector('[data-egg]');
const deleteButton = document.querySelector('[data-delete]');
const prevOperationScreen = document.querySelector('[data-prevOperationScreen]');
const currentOperationScreen = document.querySelector('[data-currentOperationScreen]');

/* class function to store outputs using a constructor to allow 
            easier changing and clearing of calculator*/
class Calculator {
  constructor(prevOperationScreen, currentOperationScreen) {
    this.prevOperationScreen = prevOperationScreen
    this.currentOperationScreen = currentOperationScreen
    this.clear()
  }

  /*clear function to clear all variables*/
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  egg() {
    this.currentOperand = '8008135!'
    this.previousOperand = 'boobies!'
    this.operation = undefined
    this.updateDisplay()
  }

  /*delete function to delete last digit*/
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  /*function to append a number as user inputs and stop multiply decimals*/
  appendNumber(number) {
    if(number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  /*function for operations when user pushes operation button*/
  quickMath() {
    let result
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if(isNaN(prev) || isNaN(current)) return
      switch(this.operation) {
        case '+':
        result = prev + current
        break
      case '-':
        result = prev - current
        break
      case 'x':
        result = prev * current
        break
      case '/':
        result = prev / current
        break
      case '%':
        result = ((prev/100) * current).toFixed(3)
        break
      default: 
        return result = 'boobs'
    }
    this.currentOperand = result
    this.operation = undefined
    this.previousOperand = ''
  }
  /*helper function to add decimals correctly*/
  displayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if(isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      })
    }
    if(decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  /*function to update display*/
  updateDisplay() {
   this.currentOperationScreen.innerText = this.displayNumber(this.currentOperand)
    if(this.operation != null) {
      this.prevOperationScreen.innerText =
      `${this.displayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.prevOperationScreen.innerText = ''
    } 
  }
    /*function to do check if ready to compute and update variables*/
  chooseOperation(operation) {
    if(this.currentOperand ==='') return
    /*perform the math if previous output display has input*/
    if(this.previousOperand !== '') {
      this.quickMath()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

}
/*eventListeners to get buttons working*/
clearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

eggButton.addEventListener('click', button => {
  calculator.egg()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.quickMath()
  calculator.updateDisplay()
})

/*setting a new calculator object to pass constructor info too*/
const calculator = new Calculator(prevOperationScreen, currentOperationScreen)
