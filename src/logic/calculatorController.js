import {
  AddCommand,
  DivideCommand,
  MultiplyCommand,
  SubtractCommand,
  ToggleSignCommand,
} from '../logic/commands';
import { CalculatorInvoker } from './calculatorInvoker';

export class CalculatorController {
  constructor(displayElement) {
    this.displayElement = displayElement;
    this.invoker = new CalculatorInvoker();
    this.clear();
  }

  clear() {
    this.currentValue = '0';
    this.previousValue = null;
    this.operator = null;
    this.lastCommand = null;
    this.lastOperand = null;
    this.updateDisplay('0');
  }

  setOperation(symbol) {
    if (this.currentValue !== null && this.operator !== null) {
      this.executeOperation();
      this.previousValue = this.currentValue;
    } else {
      this.previousValue = this.currentValue;
    }

    this.currentValue = '';
    this.operator = symbol;

    switch (symbol) {
      case '+':
        this.invoker.setCommand(new AddCommand());
        break;
      case '-':
        this.invoker.setCommand(new SubtractCommand());
        break;
      case '*':
        this.invoker.setCommand(new MultiplyCommand());
        break;
      case '/':
        this.invoker.setCommand(new DivideCommand());
        break;
      case '+/-':
        this.invoker.setCommand(new ToggleSignCommand());
        break;
    }
  }

  executeOperation() {
    if (this.operator === null && this.lastCommand && this.lastOperand !== null) {
      const a = parseFloat(this.currentValue);
      const b = parseFloat(this.lastOperand);
      const rawResult = this.invoker.execute(a, b);
      const result = parseFloat(rawResult.toFixed(10));
      this.updateDisplay(result);
      this.currentValue = String(result);
    }

    if (this.previousValue === null || this.currentValue === null) {
      return;
    }

    const a = parseFloat(this.previousValue);
    const b = parseFloat(this.currentValue);

    try {
      this.lastOperand = this.currentValue;
      const rawResult = this.invoker.execute(a, b);
      const result = parseFloat(rawResult.toFixed(10));
      this.updateDisplay(result);
      this.currentValue = String(result);
      this.previousValue = null;
      this.operator = null;
      this.lastCommand = this.invoker.command;
    } catch (error) {
      this.updateDisplay(error);
    }
  }

  inputDigit(digit) {
    const cleanLength = this.currentValue.length;

    if (cleanLength >= 9) {
      return;
    }

    if (digit === '.') {
      if (this.currentValue.includes('.')) {
        return;
      }
      if (this.currentValue === null || this.currentValue === '') {
        this.currentValue = '0.';
      } else {
        this.currentValue += '.';
      }
    } else {
      if (this.currentValue === '0') {
        this.currentValue = digit;
      } else {
        this.currentValue += digit;
      }
    }
    this.updateDisplay(this.currentValue);
  }

  updateDisplay(value) {
    this.displayElement.textContent = value;
  }
}
