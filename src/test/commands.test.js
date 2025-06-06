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

describe('Binary commands', () => {
  test('AddCommand adds two numbers', () => {
    const addCommand = new AddCommand();
    expect(addCommand.execute(2, 4)).toBe(6);
    expect(addCommand.execute(0, 0)).toBe(0);
    expect(addCommand.execute(-2, -4)).toBe(-6);
  });
  test('DivideCommand divides two numbers', () => {
    const divideCommand = new DivideCommand();
    expect(divideCommand.execute(6, 2)).toBe(3);
    expect(divideCommand.execute(-10, 2)).toBe(-5);
    expect(divideCommand.execute(0, 5)).toBe(0);
    expect(() => divideCommand.execute(5, 0)).toThrow('Division by zero');
  });
  test('MultiplyCommand multiply two numbers', () => {
    const divideCommand = new MultiplyCommand();
    expect(divideCommand.execute(2, 4)).toBe(8);
    expect(divideCommand.execute(-12, 2)).toBe(-24);
    expect(divideCommand.execute(0, 3)).toBe(0);
  });
  test('SubtractCommand subtract two numbers', () => {
    const subtractCommand = new SubtractCommand();
    expect(subtractCommand.execute(9, 3)).toBe(6);
    expect(subtractCommand.execute(-14, -6)).toBe(-8);
    expect(subtractCommand.execute(5, -2)).toBe(7);
  });
  test('PowerCommand raises to power', () => {
    const powerCommand = new PowerCommand();
    expect(powerCommand.execute(2, 3)).toBe(8);
    expect(powerCommand.execute(4, 0.5)).toBe(2);
    expect(powerCommand.execute(5, 0)).toBe(1);
    expect(powerCommand.execute(2, -1)).toBe(0.5);
  });
  test('MemoryAddCommand adds to memory', () => {
    const memoryAddCommand = new MemoryAddCommand();
    expect(memoryAddCommand.execute(5, 10)).toBe(15);
  });
  test('MemorySubtractCommand subtracts from memory', () => {
    const memorySubtractCommand = new MemorySubtractCommand();
    expect(memorySubtractCommand.execute(3, 10)).toBe(7);
  });
});

describe('Unary commands', () => {
  test('ToggleSignCommand toggles sign', () => {
    const toggleSignCommand = new ToggleSignCommand();
    expect(toggleSignCommand.execute(5)).toBe(-5);
    expect(toggleSignCommand.execute(-3)).toBe(3);
    expect(toggleSignCommand.execute(0)).toBe(-0);
  });

  test('SquareCommand squares a number', () => {
    const squareCommand = new SquareCommand();
    expect(squareCommand.execute(3)).toBe(9);
    expect(squareCommand.execute(-4)).toBe(16);
    expect(squareCommand.execute(0)).toBe(0);
  });

  test('CubeCommand cubes a number', () => {
    const cubeCommand = new CubeCommand();
    expect(cubeCommand.execute(2)).toBe(8);
    expect(cubeCommand.execute(-2)).toBe(-8);
    expect(cubeCommand.execute(0)).toBe(0);
  });

  test('PercentageCommand converts to percent', () => {
    const percentageCommand = new PercentageCommand();
    expect(percentageCommand.execute(50)).toBe(0.5);
    expect(percentageCommand.execute(200)).toBe(2);
    expect(percentageCommand.execute(0)).toBe(0);
  });

  test('InverseCommand returns reciprocal', () => {
    const inverseCommand = new InverseCommand();
    expect(inverseCommand.execute(2)).toBe(0.5);
    expect(inverseCommand.execute(4)).toBe(0.25);
    expect(() => inverseCommand.execute(0)).toThrow('Division by zero');
  });

  test('FactorialCommand returns factorial', () => {
    const factorialCommand = new FactorialCommand();
    expect(factorialCommand.execute(0)).toBe(1);
    expect(factorialCommand.execute(5)).toBe(120);
    expect(() => factorialCommand.execute(-1)).toThrow('Negative number');
  });

  test('TenPowerCommand raises 10 to the power', () => {
    const tenPowerCommand = new TenPowerCommand();
    expect(tenPowerCommand.execute(2)).toBe(100);
    expect(tenPowerCommand.execute(0)).toBe(1);
    expect(tenPowerCommand.execute(1)).toBe(10);
  });

  test('SquareRootCommand returns square root', () => {
    const squareRootCommand = new SquareRootCommand();
    expect(squareRootCommand.execute(4)).toBe(2);
    expect(squareRootCommand.execute(0)).toBe(0);
    expect(squareRootCommand.execute(9)).toBe(3);
  });

  test('CubeRootCommand returns cube root', () => {
    const cubeRootCommand = new CubeRootCommand();
    expect(cubeRootCommand.execute(8)).toBe(2);
    expect(cubeRootCommand.execute(27)).toBe(3);
    expect(() => cubeRootCommand.execute(-8)).toThrow('Negative number');
  });
  test('MemoryClearCommand resets memory to 0', () => {
    const memoryClearCommand = new MemoryClearCommand();
    expect(memoryClearCommand.execute()).toBe(0);
  });
  test('MemoryRecallCommand returns memory value', () => {
    const memoryRecallCommand = new MemoryRecallCommand();
    expect(memoryRecallCommand.execute(42)).toBe(42);
    expect(memoryRecallCommand.execute(0)).toBe(0);
  });
});
