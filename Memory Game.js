const matchImages = [
    {image: "images/Pic 1.jpg", card: "McDonalds"},
    {image: "images/Pic 1.jpg", card: "McDonalds"},
    {image: "images/Pic 2.jpg", card: "BurgerKing"},
    {image: "images/Pic 2.jpg", card: "BurgerKing"},
    {image: "images/Pic 3.jpg", card: "SteakNShake"},
    {image: "images/Pic 3.jpg", card: "SteakNShake"},
    {image: "images/Pic 4.jpg", card: "TacoBell"},
    {image: "images/Pic 4.jpg", card: "TacoBell"},
    {image: "images/Pic 5.jpg", card: "InNOut"},
    {image: "images/Pic 5.jpg", card: "InNOut"},
    {image: "images/Pic 6.jpg", card: "Sonic"},
    {image: "images/Pic 6.jpg", card: "Sonic"},
    {image: "images/Pic 7.jpg", card: "Popeyes"},
    {image: "images/Pic 7.jpg", card: "Popeyes"},
    {image: "images/Pic 8.jpg", card: "ChickFilA"},
    {image: "images/Pic 8.jpg", card: "ChickFilA"},
    {image: "images/Pic 9.jpg", card: "JackInTheBox"},
    {image: "images/Pic 9.jpg", card: "JackInTheBox"},
    {image: "images/Pic 10.jpg", card: "CarlsJr"},
    {image: "images/Pic 10.jpg", card: "CarlsJr"}
]

let currentScore = 0;
let matchCount = 0;
let fastestGame = localStorage.getItem("fastestGame") || ""
let gameArea = document.querySelector(".game-area");
let selectedCardA = "";
let selectedCardB = "";
let cardFrontInput, cardBackInput, cardHolder, card, cardBack, cardFront, newButton, currentCard, winNotice, closeWin, winButton;

function startGame(array) {
    gameArea = document.querySelector(".game-area");
    gameArea.innerHTML = "";
    randomizeImages(array);
    setUpGame(array);
    currentScore = 0;
    matchCount = 0;
    document.getElementsByClassName("cards-overturned")[0].innerText = currentScore;
    document.getElementsByClassName("best-score")[0].innerText = fastestGame;
}

function randomizeImages(array) {
    for(let i = array.length-1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const val = array[i]
        array[i] = array[j]
        array[j] = val
    }
}

function setUpGame(array) {
    for (let i=0; i<array.length; i++) {
        card = document.createElement("div");
        card.className = "card";
        card.setAttribute("card-kind", array[i]["card"])
        cardHolder = document.createElement("div");
        cardHolder.className = "gamePiece";        
        cardFrontInput = document.createElement("img");
        cardFrontInput.src = array[i]["image"] 
        cardFront = document.createElement("div");
        cardFront.className = "side back";
        cardBackInput = document.createElement("img");
        cardBackInput.src = "images/card-back.jpg"; 
        cardBack = document.createElement("div");
        cardBack.className = "side";
        cardBack.appendChild(cardBackInput);
        cardFront.appendChild(cardFrontInput);
        card.appendChild(cardBack);
        card.appendChild(cardFront);
        cardHolder.appendChild(card);
        gameArea.appendChild(cardHolder);
    }
}

function nonMatch() {
    selectedCardA.classList.toggle("flipped");
    selectedCardB.classList.toggle("flipped");
    selectedCardA = "";
    selectedCardB = "";
    gameArea.style.pointerEvents = "auto";
}

window.onload = function() {
    startGame(matchImages);
    newButton = document.querySelector('#start-game');
    newButton.addEventListener("click", () => startGame(matchImages));
    gameArea.addEventListener("click", function(event) {
        currentCard = event.target.parentElement.parentElement;
        if (currentCard.classList.contains("flipped") || event.target.tagName != "IMG") {
            return;
        } else {
            currentCard.classList.toggle('flipped');
            currentScore += 1;
            document.getElementsByClassName("cards-overturned")[0].innerText = currentScore;
            if (!selectedCardA) {
                selectedCardA = currentCard;
            } else {
                selectedCardB = currentCard;
                if (selectedCardA.getAttribute("card-kind") === selectedCardB.getAttribute("card-kind")) {
                    matchCount += 1;
                    selectedCardA = "";
                    selectedCardB = "";
                    if (matchCount === 10) {
                        closeWin = document.getElementsByClassName("close-win-notice")[0];
                        winNotice = document.querySelector(".win-notice");
                        document.getElementsByClassName("cards-overturned2")[0].innerText = currentScore;
                        winNotice.style.display = "block";
                        closeWin.onclick = function() {
                            winNotice.style.display = "none";
                        };
                        winButton = document.querySelector('#start-game-win');
                        winButton.onclick = function() {
                            startGame(matchImages);
                            winNotice.style.display = "none";
                        }
                        if (!fastestGame || currentScore < fastestGame) {
                            localStorage.setItem("fastestGame", currentScore);
                            fastestGame = localStorage.getItem("fastestGame");
                            document.getElementsByClassName("fastest-game")[0].innerText = fastestGame;
                        }
                    }
                } else {
                    gameArea.style.pointerEvents = "none";
                    window.setTimeout(nonMatch, 800);
                }
            }
        }
    })
}