import Card from './card.js'

// Функция createNumbersArray создает и вщзвращает массив с парными числами
function createNumbersArray(count) {
    const array = [];
    for (let i = 1; i <= count / 2; i++) {
        array.push(i, i)
    }
    return array
}

// Функция shuffle возвращает перемешанный массив
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Функция самой игры.
function newGame(container, cardsCount) {
    // Таймер
    function timer() {
        let timerDiv = document.getElementById('time');
        timerDiv.textContent = 60;
        let timer = setInterval(() => {
            if (timerDiv.textContent == 0) {
                clearInterval(timer);
                alert('Время вышло :(');
                container.innerHTML = '';
                cardsArray = [];
                newGame(container, cardsCount);
            } else timerDiv.textContent--
        }, 1000);
    }
    timer();

    // Игровое поле
    let cardsNumberArray = shuffle(createNumbersArray(cardsCount)),
        cardsArray = [],
        firstCard = null,
        secondCard = null;

    for (const cardNumber of cardsNumberArray) {
        cardsArray.push(new Card(container, cardNumber, flip))
    }

    // Логика
    function flip(card) {
        // Если пара карт не совпала то, картчоки закрываются и счетчик сбрасывается
        if ((firstCard != null && secondCard != null) && (firstCard.number !== secondCard.number)) {
            firstCard.open = false;
            secondCard.open = false;
            firstCard = null;
            secondCard = null;
        }

        // Присовение номеров карт к переменным
        if (firstCard == null) {
            firstCard = card
        } else {
            if (secondCard == null) {
                secondCard = card
            }
        }

        // Если пара карт совпала, то помечаем как найденные и эти карты больше не участвуют в игре
        if ((firstCard != null && secondCard != null) && (firstCard.number == secondCard.number)) {
            firstCard.success = true;
            secondCard.success = true;
            firstCard = null;
            secondCard = null;
        }

        // Если все пары найденные, то игра начинается заново
        if (document.querySelectorAll('.card.success').length == cardsNumberArray.length) {
            setTimeout(() => {
                alert('Вы победили! Сыграем еще раз?');
                container.innerHTML = '';
                cardsArray = [];

                newGame(container, cardsCount);
                clearInterval(timer())
            }, 200)
        }
    }
}
newGame(document.getElementById('game'), 16, 100)
