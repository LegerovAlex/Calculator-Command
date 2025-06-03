import './Calculator.css';
import { createElement } from '../../utils/createElement';
import { ButtonsList } from '../ButtonList/ButtonList';
import { Display } from '../Display/Display';
import { CalculatorController } from '../../logic/calculatorController';

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
    } else if (['+', '-', '*', '/', '+/-'].includes(value)) {
      controller.setOperation(value);
    } else if (value === '=') {
      controller.executeOperation();
    } else if (value === 'AC') {
      controller.clear();
    }
  });

  const calculatorElement = createElement('div', [display, buttonsList], {
    cssClass: ['calculator'],
  });

  return calculatorElement;
};
