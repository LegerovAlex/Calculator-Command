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
      case 'x²':
        this.invoker.setCommand(new SquareCommand());
        break;
      case 'x³':
        this.invoker.setCommand(new CubeCommand());
        break;
      case '%':
        this.invoker.setCommand(new PercentageCommand());
        break;
      case '1/x':
        this.invoker.setCommand(new InverseCommand());
        break;
      case '!':
        this.invoker.setCommand(new FactorialCommand());
        break;
      case '10ˣ':
        this.invoker.setCommand(new TenPowerCommand());
        break;
      case 'xʸ':
        this.invoker.setCommand(new PowerCommand());
        break;
      case '√':
        this.invoker.setCommand(new SquareRootCommand());
        break;
      case '∛':
        this.invoker.setCommand(new CubeRootCommand());
        break;
    }

    if (this.invoker.command?.isUnary) {
      this.applyUnaryOperation();
      return;
    }

    if (this.currentValue !== null && this.operator !== null) {
      this.executeOperation();
      this.previousValue = this.currentValue;
    } else {
      this.previousValue = this.currentValue;
    }

    this.currentValue = '';
    this.operator = symbol;
  }

  applyUnaryOperation() {
    if (!this.invoker.command?.isUnary) {
      return;
    }
    try {
      const value = parseFloat(this.currentValue);
      const rawResult = this.invoker.execute(value);
      const result = parseFloat(rawResult.toFixed(10));
      this.currentValue = String(result);
      this.lastCommand = this.invoker.command;
      this.updateDisplay(this.currentValue);
    } catch (error) {
      this.updateDisplay(error);
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

  memoryOperations(symbol) {
    const value = parseFloat(this.currentValue);

    switch (symbol) {
      case 'MC':
        this.invoker.setCommand(new MemoryClearCommand());
        this.memory = this.invoker.execute();
        this.updateDisplay(this.currentValue);
        break;

      case 'MR':
        this.invoker.setCommand(new MemoryRecallCommand());
        const recalled = this.invoker.execute(this.memory);
        this.currentValue = String(recalled);
        this.updateDisplay(this.currentValue);
        break;

      case 'M+':
        this.invoker.setCommand(new MemoryAddCommand());
        this.memory = this.invoker.execute(value, this.memory);
        break;

      case 'M-':
        this.invoker.setCommand(new MemorySubtractCommand());
        this.memory = this.invoker.execute(value, this.memory);
        break;
    }

    this.currentValue = '0';
    this.previousValue = null;
  }

  updateDisplay(value) {
    if (isNaN(Number(value))) {
      this.displayElement.textContent = value;
    } else {
      const formatted = value.toString().slice(0, 12);
      this.displayElement.textContent = formatted;
    }
  }
}
