import { executeBinaryOperation, executeUnaryOperation } from '../utils/executeOperations';

class Command {
  constructor(controller) {
    this.controller = controller;
    this.isUnary = false;
  }
  execute() {
    throw new Error('must be implemented');
  }
}

export class AddCommand extends Command {
  constructor(controller) {
    super(controller);
  }
  execute() {
    return executeBinaryOperation(this.controller, (a, b) => a + b);
  }
}

export class DivideCommand extends Command {
  constructor(controller) {
    super(controller);
  }
  execute() {
    return executeBinaryOperation(this.controller, (a, b) => {
      if (b === 0) {
        throw new Error('Division by zero');
      }
      return a / b;
    });
  }
}

export class MultiplyCommand extends Command {
  constructor(controller) {
    super(controller);
  }
  execute() {
    return executeBinaryOperation(this.controller, (a, b) => a * b);
  }
}

export class SubtractCommand extends Command {
  constructor(controller) {
    super(controller);
  }
  execute() {
    return executeBinaryOperation(this.controller, (a, b) => a - b);
  }
}

export class ToggleSignCommand extends Command {
  constructor(controller) {
    super(controller);
    this.isUnary = true;
  }
  execute() {
    return executeUnaryOperation(this.controller, (a) => a * -1);
  }
}

export class SquareCommand extends Command {
  constructor(controller) {
    super(controller);
    this.isUnary = true;
  }
  execute() {
    return executeUnaryOperation(this.controller, (a) => a * a);
  }
}

export class CubeCommand extends Command {
  constructor(controller) {
    super(controller);
    this.isUnary = true;
  }
  execute() {
    return executeUnaryOperation(this.controller, (a) => a * a * a);
  }
}

export class PercentageCommand extends Command {
  constructor(controller) {
    super(controller);
    this.isUnary = true;
  }
  execute() {
    return executeUnaryOperation(this.controller, (a) => a / 100);
  }
}

export class InverseCommand extends Command {
  constructor(controller) {
    super(controller);
    this.isUnary = true;
  }

  execute() {
    return executeUnaryOperation(this.controller, (a) => {
      if (a === 0) {
        throw new Error('Division by zero');
      }
      return 1 / a;
    });
  }
}

export class FactorialCommand extends Command {
  constructor(controller) {
    super(controller);
    this.isUnary = true;
  }
  execute() {
    return executeUnaryOperation(this.controller, (a) => {
      if (a < 0 || a % 1 !== 0) {
        throw new Error('Negative number');
      }
      function factorial(n) {
        if (n === 0 || n === 1) {
          return 1;
        }
        return n * factorial(n - 1);
      }
      return factorial(a);
    });
  }
}
export class TenPowerCommand extends Command {
  constructor(controller) {
    super(controller);
    this.isUnary = true;
  }
  execute() {
    return executeUnaryOperation(this.controller, (a) => 10 ** a);
  }
}

export class PowerCommand extends Command {
  constructor(controller) {
    super(controller);
  }
  execute() {
    return executeBinaryOperation(this.controller, (a, b) => a ** b);
  }
}

export class SquareRootCommand extends Command {
  constructor(controller) {
    super(controller);
    this.isUnary = true;
  }
  execute() {
    return executeUnaryOperation(this.controller, (a) => a ** 0.5);
  }
}

export class CubeRootCommand extends Command {
  constructor(controller) {
    super(controller);
    this.isUnary = true;
  }

  execute() {
    return executeUnaryOperation(this.controller, (a) => a ** (1 / 3));
  }
}

export class MemoryClearCommand extends Command {
  constructor(controller) {
    super(controller);
    this.isUnary = true;
  }

  execute() {
    this.controller.memory = 0;
    this.controller.currentValue = '0';
    this.controller.previousValue = null;
    this.controller.updateDisplay(this.controller.currentValue);

    return this.controller.memory;
  }
}

export class MemoryAddCommand extends Command {
  constructor(controller) {
    super(controller);
  }
  execute() {
    const { currentValue, memory } = this.controller.getState();
    const value = parseFloat(currentValue);
    this.controller.memory = memory + value;
    this.controller.previousValue = null;
    this.controller.currentValue = '0';
    this.controller.updateDisplay(currentValue);
    return this.controller.memory;
  }
}
export class MemorySubtractCommand extends Command {
  constructor(controller) {
    super(controller);
  }
  execute() {
    const { currentValue, memory } = this.controller.getState();
    const value = parseFloat(currentValue);
    this.controller.memory = memory - value;
    this.controller.previousValue = null;
    this.controller.currentValue = '0';
    this.controller.updateDisplay(currentValue);
    return this.controller.memory;
  }
}

export class MemoryRecallCommand extends Command {
  constructor(controller) {
    super(controller);
    this.isUnary = true;
  }
  execute() {
    const { memory } = this.controller.getState();
    this.controller.currentValue = String(memory);
    this.controller.previousValue = null;
    this.controller.updateDisplay(memory);
    return memory;
  }
}
