export class CalculatorInvoker {
  constructor() {
    this.command = null;
  }

  setCommand(command) {
    this.command = command;
  }

  execute() {
    return this.command.execute();
  }
}
