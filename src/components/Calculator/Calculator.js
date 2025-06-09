import './Calculator.css';
import { createElement } from '../../utils/createElement';
import { ButtonsList } from '../ButtonList/ButtonList';
import { Display } from '../Display/Display';
import { CalculatorController } from '../../logic/calculatorController';
import { memoryOperationButtons, operationButtons } from '../../const/buttons';

export const Calculator = () => {
  const buttonsList = ButtonsList();
  const display = Display();
  const controller = new CalculatorController(display);

  buttonsList.addEventListener('click', (event) => {
    if (!event.target.classList.contains('button')) {
      return;
    }

    const value = event.target.textContent;

    if (!isNaN(value) || value === '.') {
      controller.inputDigit(value);
    } else if (operationButtons.includes(value)) {
      controller.setOperation(value);
      if (controller.invoker.command?.isUnary) {
        try {
          controller.invoker.execute();
        } catch (error) {
          controller.updateDisplay(error);
        }
      }
    } else if (value === '=') {
      try {
        controller.invoker.execute();
      } catch (error) {
        controller.updateDisplay(error);
      }
    } else if (value === 'AC') {
      controller.clear();
    } else if (memoryOperationButtons.includes(value)) {
      try {
        controller.memoryOperations(value);
        controller.invoker.execute();
      } catch (error) {
        controller.updateDisplay(error);
      }
    }
  });

  const calculatorElement = createElement('div', [display, buttonsList], {
    cssClass: ['calculator'],
  });

  return calculatorElement;
};
