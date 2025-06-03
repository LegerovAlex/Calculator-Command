import './ButtonList.css';
import { buttonsData } from '../../const/buttons';
import { createElement } from '../../utils/createElement';
import { Button } from '../Button/Button';

export const ButtonsList = () => {
  const rows = buttonsData.map((row) => {
    const buttons = row.map((value) => Button(value));
    return createElement('div', buttons, {
      cssClass: ['button-row'],
    });
  });

  const buttonsListElement = createElement('div', rows, {
    cssClass: ['buttons-container'],
  });
  return buttonsListElement;
};
