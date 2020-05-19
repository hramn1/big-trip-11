import {default as AbstractComponent} from "./abstract";
export const MenuItem = {
  TABLE: `Table`,
  STATISTICS: `Stats`,
};
const MENU_ITEM = `trip-tabs__btn`;
const MENU_ITEM_ACTIVE = `trip-tabs__btn--active`;
const NEW_EVENT_BTN = `trip-main__event-add-btn`;
const getTemplateMenu = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${MenuItem.TABLE}</a>
    <a class="trip-tabs__btn" href="#">${MenuItem.STATISTICS}</a>
    </nav>`
  );
};
export default class CreateTemplateMenu extends AbstractComponent {
  constructor() {
    super();
  }
  getTemplate() {
    return getTemplateMenu();
  }
  setOnChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }
      const menuItem = evt.target.textContent;
      this._setMenuItemActive(menuItem);
      handler(menuItem);
    });
  }
  _setMenuItemActive(menuItemActive) {
    const menuItemElements = this.getElement().querySelectorAll(`.${MENU_ITEM}`);

    for (const menuItemElement of menuItemElements) {
      menuItemElement.classList.remove(MENU_ITEM_ACTIVE);
      if (menuItemElement.textContent === menuItemActive) {
        menuItemElement.classList.add(MENU_ITEM_ACTIVE);
      }
    }
  }
  setDefault() {
    this._setMenuItemActive(MenuItem.TABLE);
  }
}
