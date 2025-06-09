import {
  AddCommand,
  CubeCommand,
  CubeRootCommand,
  DivideCommand,
  FactorialCommand,
  InverseCommand,
  MemoryAddCommand,
  MemoryClearCommand,
  MemoryRecallCommand,
  MemorySubtractCommand,
  MultiplyCommand,
  PercentageCommand,
  PowerCommand,
  SquareCommand,
  SquareRootCommand,
  SubtractCommand,
  TenPowerCommand,
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
    this.memory = 0;
    this.updateDisplay('0');
  }

  setOperation(symbol) {
    switch (symbol) {
      case '+':
        this.invoker.setCommand(new AddCommand(this));
        break;
      case '-':
        this.invoker.setCommand(new SubtractCommand(this));
        break;
      case '*':
        this.invoker.setCommand(new MultiplyCommand(this));
        break;
      case '/':
        this.invoker.setCommand(new DivideCommand(this));
        break;
      case '+/-':
        this.invoker.setCommand(new ToggleSignCommand(this));
        break;
      case 'x²':
        this.invoker.setCommand(new SquareCommand(this));
        break;
      case 'x³':
        this.invoker.setCommand(new CubeCommand(this));
        break;
      case '%':
        this.invoker.setCommand(new PercentageCommand(this));
        break;
      case '1/x':
        this.invoker.setCommand(new InverseCommand(this));
        break;
      case '!':
        this.invoker.setCommand(new FactorialCommand(this));
        break;
      case '10ˣ':
        this.invoker.setCommand(new TenPowerCommand(this));
        break;
      case 'xʸ':
        this.invoker.setCommand(new PowerCommand(this));
        break;
      case '√':
        this.invoker.setCommand(new SquareRootCommand(this));
        break;
      case '∛':
        this.invoker.setCommand(new CubeRootCommand(this));
        break;
    }

    if (!this.invoker.command?.isUnary) {
      if (this.currentValue !== null) {
        this.previousValue = this.currentValue;
        this.currentValue = '';
      }
      this.operator = symbol;
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

  memoryOperations(symbol) {
    switch (symbol) {
      case 'MC':
        this.invoker.setCommand(new MemoryClearCommand(this));
        break;
      case 'MR':
        this.invoker.setCommand(new MemoryRecallCommand(this));
        break;
      case 'M+':
        this.invoker.setCommand(new MemoryAddCommand(this));
        break;
      case 'M-':
        this.invoker.setCommand(new MemorySubtractCommand(this));
        break;
    }
  }

  updateDisplay(value) {
    if (isNaN(Number(value))) {
      this.displayElement.textContent = value;
    } else {
      const formatted = value.toString().slice(0, 12);
      this.displayElement.textContent = formatted;
    }
  }

  getState() {
    return {
      currentValue: this.currentValue,
      previousValue: this.previousValue,
      lastOperand: this.lastOperand,
      operator: this.operator,
      lastCommand: this.lastCommand,
      memory: this.memory,
    };
  }
}
