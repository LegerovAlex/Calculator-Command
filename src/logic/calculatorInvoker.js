export class CalculatorInvoker {
  constructor() {
    this.command = null;
  }

  setCommand(command) {
    this.command = command;
  }

  execute(a, b) {
    if (this.command.isUnary) {
      return this.command.execute(a);
    }
    return this.command.execute(a, b);
  }
}
