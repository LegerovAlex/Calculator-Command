import { CalculatorController } from '../logic/calculatorController';
const mockDisplayElement = {
  textContent: '',
};

describe('CalcualtorController Integration Tests', () => {
  let controller;

  beforeEach(() => {
    mockDisplayElement.textContent = '';
    controller = new CalculatorController(mockDisplayElement);
  });

  test('perform an operation 5 + 3 = 8', () => {
    controller.inputDigit('5');
    controller.setOperation('+');
    controller.inputDigit('3');
    controller.executeOperation();
    expect(controller.currentValue).toBe('8');
    expect(mockDisplayElement.textContent).toBe('8');
    expect(controller.previousValue).toBeNull();
    expect(controller.operator).toBeNull();
  });
});
