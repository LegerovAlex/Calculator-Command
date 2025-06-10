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

import { CalculatorController } from '../logic/calculatorController';

describe('Binary commands', () => {
  let mockDisplayElement;
  let controller;
  let invoker;

  beforeEach(() => {
    mockDisplayElement = { textContent: '' };
    controller = new CalculatorController(mockDisplayElement);
    invoker = controller.invoker;
  });

  test('AddCommand adds two numbers', () => {
    controller.currentValue = '7';
    controller.previousValue = '5';
    invoker.setCommand(new AddCommand(controller));
    invoker.execute();
    expect(controller.currentValue).toBe('12');
    expect(mockDisplayElement.textContent).toBe('12');
  });

  test('SubtractCommand subtracts two numbers', () => {
    controller.currentValue = '3';
    controller.previousValue = '10';
    invoker.setCommand(new SubtractCommand(controller));
    invoker.execute();
    expect(controller.currentValue).toBe('7');
    expect(mockDisplayElement.textContent).toBe('7');
  });

  test('MultiplyCommand multiplies two numbers', () => {
    controller.currentValue = '4';
    controller.previousValue = '5';
    invoker.setCommand(new MultiplyCommand(controller));
    invoker.execute();
    expect(controller.currentValue).toBe('20');
    expect(mockDisplayElement.textContent).toBe('20');
  });

  test('DivideCommand divides two numbers', () => {
    controller.currentValue = '2';
    controller.previousValue = '10';
    invoker.setCommand(new DivideCommand(controller));
    invoker.execute();
    expect(controller.currentValue).toBe('5');
    expect(mockDisplayElement.textContent).toBe('5');
  });

  test('DivideCommand handles division by zero', () => {
    controller.currentValue = '0';
    controller.previousValue = '5';
    invoker.setCommand(new DivideCommand(controller));
    invoker.execute();
    expect(mockDisplayElement.textContent).toBe('Division by zero');
  });

  test('PowerCommand raises to power', () => {
    controller.currentValue = '3';
    controller.previousValue = '2';
    invoker.setCommand(new PowerCommand(controller));
    invoker.execute();
    expect(controller.currentValue).toBe('8');
    expect(mockDisplayElement.textContent).toBe('8');
  });
});

describe('Unary Commands', () => {
  let mockDisplayElement;
  let controller;
  let invoker;

  beforeEach(() => {
    mockDisplayElement = { textContent: '' };
    controller = new CalculatorController(mockDisplayElement);
    invoker = controller.invoker;
  });

  test('ToggleSignCommand negates number', () => {
    controller.currentValue = '5';
    invoker.setCommand(new ToggleSignCommand(controller));
    invoker.execute();
    expect(controller.currentValue).toBe('-5');
    expect(mockDisplayElement.textContent).toBe('-5');
  });

  test('SquareCommand squares number', () => {
    controller.currentValue = '4';
    invoker.setCommand(new SquareCommand(controller));
    invoker.execute();
    expect(controller.currentValue).toBe('16');
    expect(mockDisplayElement.textContent).toBe('16');
  });

  test('CubeCommand cubes number', () => {
    controller.currentValue = '3';
    invoker.setCommand(new CubeCommand(controller));
    invoker.execute();
    expect(controller.currentValue).toBe('27');
    expect(mockDisplayElement.textContent).toBe('27');
  });

  test('PercentageCommand calculates percentage', () => {
    controller.currentValue = '50';
    invoker.setCommand(new PercentageCommand(controller));
    invoker.execute();
    expect(controller.currentValue).toBe('0.5');
    expect(mockDisplayElement.textContent).toBe('0.5');
  });

  test('InverseCommand calculates reciprocal', () => {
    controller.currentValue = '4';
    invoker.setCommand(new InverseCommand(controller));
    invoker.execute();
    expect(controller.currentValue).toBe('0.25');
    expect(mockDisplayElement.textContent).toBe('0.25');
  });

  test('InverseCommand handles division by zero', () => {
    controller.currentValue = '0';
    invoker.setCommand(new InverseCommand(controller));
    invoker.execute();
    expect(mockDisplayElement.textContent).toBe('Division by zero');
  });

  test('FactorialCommand calculates factorial', () => {
    controller.currentValue = '5';
    invoker.setCommand(new FactorialCommand(controller));
    invoker.execute();
    expect(controller.currentValue).toBe('120');
    expect(mockDisplayElement.textContent).toBe('120');
  });

  test('FactorialCommand handles negative numbers', () => {
    controller.currentValue = '-3';
    invoker.setCommand(new FactorialCommand(controller));
    invoker.execute();
    expect(mockDisplayElement.textContent).toBe('Negative number');
  });

  test('TenPowerCommand raises 10 to power', () => {
    controller.currentValue = '2';
    invoker.setCommand(new TenPowerCommand(controller));
    invoker.execute();
    expect(controller.currentValue).toBe('100');
    expect(mockDisplayElement.textContent).toBe('100');
  });

  test('SquareRootCommand calculates square root', () => {
    controller.currentValue = '9';
    invoker.setCommand(new SquareRootCommand(controller));
    invoker.execute();
    expect(controller.currentValue).toBe('3');
    expect(mockDisplayElement.textContent).toBe('3');
  });

  test('SquareRootCommand handles negative input', () => {
    controller.currentValue = '-9';
    invoker.setCommand(new SquareRootCommand(controller));
    invoker.execute();
    expect(mockDisplayElement.textContent).toBe('Negative number');
  });

  test('CubeRootCommand calculates cube root', () => {
    controller.currentValue = '27';
    invoker.setCommand(new CubeRootCommand(controller));
    invoker.execute();
    expect(controller.currentValue).toBe('3');
    expect(mockDisplayElement.textContent).toBe('3');
  });

  test('CubeRootCommand handles negative input', () => {
    controller.currentValue = '-8';
    invoker.setCommand(new CubeRootCommand(controller));
    invoker.execute();
    expect(mockDisplayElement.textContent).toBe('Negative number');
  });
});

describe('Memory Commands', () => {
  let mockDisplayElement;
  let controller;
  let invoker;

  beforeEach(() => {
    mockDisplayElement = { textContent: '' };
    controller = new CalculatorController(mockDisplayElement);
    invoker = controller.invoker;
    controller.memory = 10;
  });

  test('MemoryClearCommand resets memory and values', () => {
    controller.currentValue = '25';
    controller.previousValue = '5';
    invoker.setCommand(new MemoryClearCommand(controller));
    invoker.execute();
    expect(controller.memory).toBe(0);
    expect(controller.currentValue).toBe('0');
    expect(controller.previousValue).toBe(null);
    expect(mockDisplayElement.textContent).toBe('0');
  });

  test('MemoryAddCommand adds current value to memory', () => {
    controller.currentValue = '5';
    invoker.setCommand(new MemoryAddCommand(controller));
    invoker.execute();
    expect(controller.memory).toBe(15);
    expect(controller.currentValue).toBe('0');
    expect(mockDisplayElement.textContent).toBe('5');
  });

  test('MemorySubtractCommand subtracts current value from memory', () => {
    controller.currentValue = '4';
    invoker.setCommand(new MemorySubtractCommand(controller));
    invoker.execute();
    expect(controller.memory).toBe(6);
    expect(controller.currentValue).toBe('0');
    expect(mockDisplayElement.textContent).toBe('4');
  });

  test('MemoryRecallCommand sets current value from memory', () => {
    invoker.setCommand(new MemoryRecallCommand(controller));
    invoker.execute();
    expect(controller.currentValue).toBe('10');
    expect(controller.previousValue).toBe(null);
    expect(mockDisplayElement.textContent).toBe('10');
  });
});
