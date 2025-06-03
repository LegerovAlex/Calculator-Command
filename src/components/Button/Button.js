import { createElement } from '../../utils/createElement';
import { buttonsStyleData } from '../../const/buttons';
import './Button.css';

export const Button = (value) => {
  const className = ['button'];

  if (buttonsStyleData.orange.includes(value)) {
    className.push('button--orange');
  } else if (buttonsStyleData.lightgray.includes(value)) {
    className.push('button--lightgray');
  }

  const buttonElement = createElement('button', [document.createTextNode(value)], {
    cssClass: className,
  });

  return buttonElement;
};
