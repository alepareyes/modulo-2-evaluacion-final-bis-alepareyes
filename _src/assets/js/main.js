'use strict';


const inputs = document.querySelectorAll('.js-input');

// const option4 = document.querySelector('.js-input4');
// const option6 = document.querySelector('.js-input6');
// const option8 = document.querySelector('.js-input8');

const cardsContainer = document.querySelector('.js-cards-container');
const startButton = document.querySelector('.js-btn');

const url = 'https://beta.adalab.es/ejercicios-extra/api/pokemon-cards/'


////////////////////INPUT POR DEFECTO////////////////  
function setDefaultInput() {

    const currentInput = document.querySelector('.input4');
    currentInput.checked = true;
    currentInput.click(); // FALSO CLICK.
}



let inputValue = "";

function getLocalStorage() {

    const localStorageInput = localStorage.getItem('Difficulty');

    console.log(localStorageInput);
    console.log(inputValue);
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



///////////////////////PINTAR CARTAS SOLICITADAS//////////////   
function getServerCards() {

    cardsContainer.innerHTML = "";

    for (const input of inputs) {
        inputValue = input.value;
        const clickedInput = input.checked;

        if (clickedInput === true) {

            localStorage.setItem('Difficulty', input.value);

            fetch(`${url}${inputValue}.json`)
                .then(response => response.json())
                .then(data => {

                    createCard(data)
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

        // const namePokemon = document.createElement('p');
        // const name = document.createTextNode(card.name);
        // namePokemon.appendChild(name);


        const imgFlip = document.createElement('p');
        imgFlip.setAttribute('class', 'js-flip flip')
        const alepa = document.createTextNode("Who's That Pokémon?");
        imgFlip.appendChild(alepa);


        carta.appendChild(img);
        cardsContainer.appendChild(carta);
        carta.appendChild(imgFlip);
        // carta.appendChild(namePokemon);

    }

    listenCards(cards);



}


function stopBotton(ev) {
    ev.preventDefault();
}



function listenCards() {
    const totalCards = document.querySelectorAll('.js-card');

    for (const card of totalCards) {
        card.addEventListener('click', flipCard);
    }
}


function flipCard(ev) {

    ev.currentTarget.classList.add('clickedCard');
    ev.currentTarget.classList.remove('card');

}

startButton.addEventListener('click', getServerCards);
startButton.addEventListener('click', stopBotton);


// setDefaultInput();

