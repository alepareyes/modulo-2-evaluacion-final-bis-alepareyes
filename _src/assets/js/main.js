'use strict';


const inputs = document.querySelectorAll('.js-input');

const cardsContainer = document.querySelector('.js-cards-container');
const startButton = document.querySelector('.js-btn');

const url = 'https://beta.adalab.es/ejercicios-extra/api/pokemon-cards/'

let inputValue = "";
let info = "";



////////////////////INPUT POR DEFECTO////////////////  
function setDefaultInput() {

    const currentInput = document.querySelector('.input4');
    currentInput.checked = true;

}




///////////////COGER INPUT VALUE DEL LS////////////////////
function getLocalStorage() {

    const localStorageInput = localStorage.getItem('Difficulty');

    if (localStorageInput !== null) {
        inputValue = localStorageInput

        for (const input of inputs) {

            if (input.value === inputValue) {
                input.checked = true
            }
        }

    } else {

        setDefaultInput();
    }

    getServerCards();

}

getLocalStorage();



///////////////////PINTAR CARTAS SOLICITADAS//////////////   
function getServerCards() {

    cardsContainer.innerHTML = ""; //No se acumulan las búsquedas

    for (const input of inputs) {
        inputValue = input.value;
        const clickedInput = input.checked; //TRUE O FALSE

        if (clickedInput === true) {

            localStorage.setItem('Difficulty', input.value);

            fetch(`${url}${inputValue}.json`)
                .then(response => response.json())
                .then(data => {
                    info = data;
                    createCard(data);
                })
        }
    }


};




/////////////////CREACIÓN DE LA CARTA (contenedores y clases)/////////////
function createCard(cards) {


    for (const card of cards) {

        const carta = document.createElement('div');
        carta.setAttribute('class', 'js-card card');


        const img = document.createElement('img');
        img.setAttribute('src', card.image);
        img.setAttribute('class', 'js-img img');

        const imgFlip = document.createElement('p');
        imgFlip.setAttribute('class', 'js-flip flip')
        const alepa = document.createTextNode("Who's That Pokémon?");
        imgFlip.appendChild(alepa);


        carta.appendChild(img);
        cardsContainer.appendChild(carta);
        carta.appendChild(imgFlip);

    }

    listenCards();

}


function handler(ev) {
    ev.preventDefault();
    getServerCards();
}


function listenCards() {
    const totalCards = document.querySelectorAll('.js-card');
    for (const card of totalCards) {
        card.addEventListener('click', flipCard);
    }
}



//////////////DAR LA VUELTA A LAS CARTAS////////////////
function flipCard(ev) {

    ev.currentTarget.classList.add('clickedCard');
    ev.currentTarget.classList.remove('card');

}

startButton.addEventListener('click', handler);


setDefaultInput();
