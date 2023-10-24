const cardGrid = document.querySelector('.card-grid')
const timer = document.querySelector('#timer')
const timerBox = document.querySelector('#timer-box')
const timer3s = document.querySelector('.timer3s')

const milisec = 100
const playTime = 5 * milisec


let currentPlayTime = playTime
let gameIsRunning = true
const setTimer = () => {
    const setIntervalId = setInterval(() => {
        if (currentPlayTime <= 3 * milisec) {
            timer3s.innerHTML = timer.innerHTML
            timer3s.style.display = "block"
            timer3s.style.fontSize = "800px";
            timer.style.display = "none"
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

const makeGame = (gameBoard, AGENTS, cardGrid) => {
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
    timer.style.display = "flex"

    timer3s.style.zIndex = "-1"

    

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

    setTimer()
}



makeGame(gameBoard, AGENTS, cardGrid)




const cards = document.querySelectorAll(".flip-card");

console.log(gameIsRunning)

cards.forEach((card) =>
    card.addEventListener("click", (event) => {
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
    
    
    
            if (currentSelectedCard.length === 2) {
                setTimeout(() => {
                    const inner1 = currentSelectedCard[0].querySelector(".flip-card-inner")
                    const inner2 = currentSelectedCard[1].querySelector(".flip-card-inner")
    
                    // console.log(inner1.classList[1], inner2.classList[1])
                    if (!(inner1.classList[1] === inner2.classList[1])) {
                        inner1.classList.remove("rotate");
                        inner2.classList.remove("rotate");
                    }
    
                    else {
                        inner1.classList.add("fixed")
                        inner2.classList.add("fixed")
                    }
                    currentSelectedCard = []
                }, 700)
    
            }
        }
        else {
            makeGame(gameBoard, AGENTS, cardGrid)
        }
    })
);
    

