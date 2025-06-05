class Command {
  constructor() {
    this.isUnary = false;
  }
  execute() {
    throw new Error('must be implemented');
  }
}

export class AddCommand extends Command {
  execute(a, b) {
    return a + b;
  }
}

export class DivideCommand extends Command {
  execute(a, b) {
    if (b === 0) {
      throw new Error('Division by zero');
    } else {
      return a / b;
    }
  }
}

export class MultiplyCommand extends Command {
  execute(a, b) {
    return a * b;
  }
}

export class SubtractCommand extends Command {
  execute(a, b) {
    return a - b;
  }
}

export class ToggleSignCommand extends Command {
  constructor() {
    super();
    this.isUnary = true;
  }
  execute(a) {
    return a * -1;
  }
}

export class SquareCommand extends Command {
  constructor() {
    super();
    this.isUnary = true;
  }
  execute(a) {
    return a * a;
  }
}

export class CubeCommand extends Command {
  constructor() {
    super();
    this.isUnary = true;
  }
  execute(a) {
    return a * a * a;
  }
}

export class PercentageCommand extends Command {
  constructor() {
    super();
    this.isUnary = true;
  }
  execute(a) {
    return a / 100;
  }
}

export class InverseCommand extends Command {
  constructor() {
    super();
    this.isUnary = true;
  }
  execute(a) {
    if (a === 0) {
      throw new Error('Division by zero');
    }
    return 1 / a;
  }
}

export class FactorialCommand extends Command {
  constructor() {
    super();
    this.isUnary = true;
  }
  execute(a) {
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
  }
}

export class TenPowerCommand extends Command {
  constructor() {
    super();
    this.isUnary = true;
  }
  execute(a) {
    return 10 ** a;
  }
}

export class PowerCommand extends Command {
  execute(a, b) {
    return a ** b;
  }
}

export class SquareRootCommand extends Command {
  constructor() {
    super();
    this.isUnary = true;
  }
  execute(a) {
    return a ** 0.5;
  }
}

export class CubeRootCommand extends Command {
  constructor() {
    super();
    this.isUnary = true;
  }
  execute(a) {
    if (a < 0) {
      throw new Error('Negative number');
    }
    return a ** (1 / 3);
  }
}

export class MemoryClearCommand extends Command {
  constructor() {
    super();
    this.isUnary = true;
  }
  execute() {
    return 0;
  }
}

export class MemoryAddCommand extends Command {
  execute(a, memory) {
    return memory + a;
  }
}

export class MemorySubtractCommand extends Command {
  execute(a, memory) {
    return memory - a;
  }
}

export class MemoryRecallCommand extends Command {
  constructor() {
    super();
    this.isUnary = true;
  }
  execute(memory) {
    return memory;
  }
}
