class Command {
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
  execute(a) {
    return a * -1;
  }
}
