export default class Card {
  _open = false
  _success = false

  // Карточка
  constructor(container, number, action) {
    this.card = document.createElement('div');
    this.card.classList.add('card');
    this.card.textContent = number;
    this.number = number;

    // Добавляем прослушку на клик карточки
    this.card.addEventListener('click', () => {
      if (!this.open && !this.success) {
        this.open = true;
        action(this);
      }
    });

    container.append(this.card);
  }

  // Сеттер на проверку значения true/false и добавление/удаление классов
  set open(value) {
    this._open = value
    value ? this.card.classList.add('open') : this.card.classList.remove('open');
  }

  // Геттер возвращает значение true/false
  get open() {
    return this._open
  }

  // Сеттер на проверку значения true/false и добавление/удаление классов
  set success(value) {
    this._success = value
    value ? this.card.classList.add('success') : this.card.classList.remove('success');
  }

  // Геттер возвращает значение true/false
  get success() {
    return this._success
  }
}
