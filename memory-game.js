const cardGrid = document.querySelector('.card-grid')
const timer = document.querySelector('#timer')
const timerBox = document.querySelector('#timer-box')
const timer3s = document.querySelector('.timer3s')
const scoreElement = document.querySelector('#score')


const milisec = 100
const playTime = 30 * milisec
let currentPlayTime = playTime
let gameIsRunning = true
let gameCompleted = false

let isRunning = null

let score = 100 

let cardTimeout = null
score = Math.floor((currentPlayTime/playTime) * 100)
const setTimer = (score) => {
    const setIntervalId = setInterval(() => {
        if (currentPlayTime <= (5 * milisec)) {
            timer3s.innerHTML = timer.innerHTML
            timer3s.style.display = "flex"
            timer.style.display = "none"
            timer3s.style.fontSize = "800px"
        }
        if (currentPlayTime != -1) {
            timer.textContent = `${(currentPlayTime/milisec).toFixed(1)}`;
            currentPlayTime -= 1
            timerBox.style.width =  `${(currentPlayTime/playTime)*100}vw` 
        }
        else {
            // timer3s.style.display = "block"
            timer3s.style.fontSize = "300px"
            timer3s.style.color = "rgba(253, 69, 86, 1)"
            timer3s.textContent = "TIMEOUT"
            timer3s.style.zIndex = "1"
            timer3s.style.WebkitTextstrokeWidth = "4px"; 
            timer3s.style.WebkitTextstrokeColor = "black"; 
            gameIsRunning =  false
            clearInterval(setIntervalId)
        }


        if (score >= 0) {
            score -= (((currentPlayTime+1)/playTime)*100 - (currentPlayTime/playTime)*100)
        }
        
        

        
        scoreElement.textContent = `Score: ${score.toFixed(0)}`

        console.log(score)

        
    }, 10)
} 

// setTimer()

// setInterval(() => {
//     timerBox.style.width = `${Math.floor((currentPlayTime/playTime*100)*100)}vw`
// }, 1)




// const AGENT = ['jett', 'chamber', 'yoru', 'omen', 'harbor', 'reyna']
let AGENTS = ['jett', 'chamber', 'yoru', 'omen', 'harbor', 'reyna', 'jett', 'chamber', 'yoru', 'omen', 'harbor', 'reyna']
let currentSelectedCard = []
// const newElement = document.createElement('p')
// newElement.innerHTML = 'hello this p is created using Js'
// cardGrid.appendChild(newElement)

let gameBoard = [
    [],
    [],
    []
]

const createCard = (id, agent) => `
    <div class="flip-card" id="card-${id}">
    <div class="flip-card-inner ${agent}" id="${id}">
        <div class="flip-card-back">
            <img src="./assets/card_normal.png" draggable="false">
        </div>
        <div class="flip-card-front">
            <img src="./assets/cardToChoose/${agent}.png"
                alt="Avatar" draggable="false">
        </div>
    </div>
`

const makeGame = (gameBoard, AGENTS, cardGrid, score) => {
    currentSelectedCard = []
    gameBoard = [
        [],
        [],
        []
    ]
    cardGrid.innerHTML = ''
    currentPlayTime = playTime
    gameIsRunning = true

    timer3s.style.display = "none"
    timer.style.display = "block"
    timer3s.style.zIndex = "-1"

    score = 100


    

    let agentCounter = 0
    let agentIndexCount = 0

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 2; j++) {
            for (let k = 0; k < 2; k++) {
                gameBoard[i].push(AGENTS[agentCounter])
                agentIndexCount++
            }
            agentCounter++
        }
    }
    
    cardGrid.innerHTML = ''
    
    for (let i = 0; i < 3; i++) {
        for (let k = 0; k < 4; k++) {
            const randRowIndex = Math.floor(Math.random() * 3)
            const randCollumnIndex = Math.floor(Math.random() * 4)
    
            let tempHolder = gameBoard[i][k]
    
            gameBoard[i][k] = gameBoard[randRowIndex][randCollumnIndex]
            gameBoard[randRowIndex][randCollumnIndex] = tempHolder
    
            cardGrid.innerHTML += gameBoard[i][k]
        }
    }
    
    
    
    let secondAgentIndexCounter = 0
    cardGrid.innerHTML = ''
    
    for (let i = 0; i < 3; i++) {
        for (let k = 0; k < 4; k++) {
            cardGrid.innerHTML += createCard(secondAgentIndexCounter, gameBoard[i][k])
            secondAgentIndexCounter++
        }
    }

    setTimer(score)


const cards = document.querySelectorAll(".flip-card");

cards.forEach((card) =>
    card.addEventListener("click", (event, score) => {
        if (gameIsRunning) {
            const flipCard = function (inner) {
                if (!inner.classList.contains('fixed')) {
                    const inner = card.querySelector(".flip-card-inner");
    
                    if (!inner.classList.contains("rotate")) {
                        inner.classList.add("rotate");
                    } else {
                        inner.classList.remove("rotate");
                    }
    
                    currentSelectedCard.push(card)
                }
            }
    
            if (currentSelectedCard.length !== 2) {
                const inner2 = card.querySelector('.flip-card-inner')
                if (currentSelectedCard.length === 1) {
                    const inner1 = currentSelectedCard[0].querySelector(".flip-card-inner")
                    if (inner1.id !== inner2.id) {
                        flipCard(inner2)
                    }
                }
                else {
                    flipCard(inner2)
                }
            }
    
            const cardFlipping = () => {
                const inner1 = currentSelectedCard[0].querySelector(".flip-card-inner")
                const inner2 = currentSelectedCard[1].querySelector(".flip-card-inner")

                if (!(inner1.classList[1] === inner2.classList[1])) {
                    inner1.classList.remove("rotate");
                    inner2.classList.remove("rotate");
                }

                else {
                    inner1.classList.add("fixed")
                    inner2.classList.add("fixed")
                    score += 10

                    console.log(score, scoreElement)
                }
                currentSelectedCard = []

            }
    
            if (currentSelectedCard.length === 2) {
                cardTimeout =  setTimeout(cardFlipping, 700)
            }
            else {
                clearTimeout(cardTimeout)
                cardFlipping()
            }
        }
        else {
            makeGame(gameBoard, AGENTS, cardGrid, score)
        }
    })
);
}

makeGame(gameBoard, AGENTS, cardGrid, score)


timer3s.addEventListener('click', () => {
    console.log('clicking on timer text');
    makeGame(gameBoard, AGENTS, cardGrid, score)
    
})

    