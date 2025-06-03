import './Display.css';
import { createElement } from '../../utils/createElement';

export const Display = (initialValue = '0') => {
  const displayElement = createElement(
    'div',
    [document.createTextNode(document.createTextNode(initialValue))],
    {
      cssClass: ['display'],
    }
  );

  return displayElement;
};
