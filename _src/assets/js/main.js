'use strict';


// const inputs = document.querySelectorAll('.js-input');

const option4 = document.querySelector('.js-input4');
const option6 = document.querySelector('.js-input6');
const option8 = document.querySelector('.js-input8');

const cardsContainer = document.querySelector('.js-cards-container');
const startButton = document.querySelector('.js-btn');

const url = 'https://beta.adalab.es/ejercicios-extra/api/pokemon-cards/'

/* 
function setDefaultCards() {
    const currentOption = optionFour;
    currentOption.checked = true;
    currentOption.click();
} */


function getServerCards() { //Lo intenté recorriendo el array y metiendo el inputvalue en el url pero no funcionaba.

    if (option4.checked) {
        fetch(`${url}${option4.value}.json`)
            .then(response => response.json())
            .then(data => createCard(data))

    }
    if (option6.checked) {
        fetch(`${url}${option6.value}.json`)
            .then(response => response.json())
            .then(data => createCard(data))
    }

    if (option8.checked) {
        fetch(`${url}${option8.value}.json`)
            .then(response => response.json())
            .then(data => createCard(data))
    }
};



function createCard(cards) {
    for (const card of cards) {
        const carta = document.createElement('div');
        carta.setAttribute('class', '.js-card card');

        const img = document.createElement('img');
        img.setAttribute('src', card.image);
        img.setAttribute('class', '.js-img img hidden');

        const imgFlip = document.createElement('p');
        imgFlip.setAttribute('class', '.js-flip flip')
        const alepa = document.createTextNode('Ale Reyes');
        imgFlip.appendChild(alepa);

        carta.appendChild(img);
        cardsContainer.appendChild(carta);
    }
}


startButton.addEventListener('click', getServerCards);

// setDefaultCards();