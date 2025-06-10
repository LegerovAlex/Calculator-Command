import { CalculatorController } from '../logic/calculatorController';
import { AddCommand } from '../logic/commands';

describe('CalculatorController and CalculatorInvoker Interaction', () => {
  let mockDisplayElement;
  let controller;
  let invoker;

  beforeEach(() => {
    mockDisplayElement = { textContent: '' };
    controller = new CalculatorController(mockDisplayElement);
    invoker = controller.invoker;
  });

  test('Sets and executes the binary addition command via invoker', () => {
    controller.inputDigit('6');
    controller.setOperation('+');
    expect(invoker.command).toBeInstanceOf(AddCommand);
    controller.inputDigit('3');
    invoker.execute();
    expect(controller.currentValue).toBe('9');
    expect(mockDisplayElement.textContent).toBe('9');
  });
});
