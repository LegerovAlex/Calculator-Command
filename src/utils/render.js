export function render(element, parentClassName) {
  const rootElement = document.querySelector(parentClassName);
  rootElement.append(element);
}
