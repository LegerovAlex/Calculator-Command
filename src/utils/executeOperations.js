export function executeBinaryOperation(controller, operationCallback) {
  const { currentValue, previousValue, lastOperand, operator, lastCommand } = controller.getState();

  try {
    if (operator === null && lastCommand && lastOperand !== null) {
      const a = parseFloat(currentValue);
      const b = parseFloat(lastOperand);
      const rawResult = operationCallback(a, b);
      const result = parseFloat(rawResult.toFixed(10));
      controller.currentValue = String(result);
      controller.updateDisplay(result);
      return result;
    }

    if (previousValue === null || currentValue === null) {
      return;
    }

    const a = parseFloat(previousValue);
    const b = parseFloat(currentValue);
    const rawResult = operationCallback(a, b);
    const result = parseFloat(rawResult.toFixed(10));

    controller.lastOperand = currentValue;
    controller.currentValue = String(result);
    controller.previousValue = null;
    controller.operator = null;
    controller.lastCommand = controller.invoker.command;
    controller.updateDisplay(result);

    return result;
  } catch (error) {
    controller.updateDisplay(error.message);
  }
}

export function executeUnaryOperation(controller, operationCallback) {
  const { currentValue } = controller.getState();

  try {
    const value = parseFloat(currentValue);
    const rawResult = operationCallback(value);
    const result = parseFloat(rawResult.toFixed(10));
    controller.currentValue = String(result);
    controller.lastCommand = controller.invoker.command;
    controller.updateDisplay(result);
    return result;
  } catch (error) {
    controller.updateDisplay(error.message);
  }
}
