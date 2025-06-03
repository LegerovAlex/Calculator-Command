export class CalculatorInvoker {
  constructor() {
    this.command = null;
  }

  setCommand(command) {
    this.command = command;
  }

  execute(a, b) {
    return this.command.execute(a, b);
  }
}
