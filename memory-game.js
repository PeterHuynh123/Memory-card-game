const cardGrid = document.querySelector('.card-grid')

// const AGENT = ['jett', 'chamber', 'yoru', 'omen', 'harbor', 'reyna']
let AGENTS = ['jett', 'chamber', 'yoru', 'omen', 'harbor', 'reyna', 'jett', 'chamber', 'yoru', 'omen', 'harbor', 'reyna']
let currentSelectedCard = []
// const newElement = document.createElement('p')
// newElement.innerHTML = 'hello this p is created using Js'
// cardGrid.appendChild(newElement)

const gameBoard = [
    [],
    [],
    []
]

const createCard = (id, agent) =>  `
    <div class="flip-card" id="card-${id}">
    <div class="flip-card-inner ${agent}">
        <div class="flip-card-back">
            <img src="./assets/card_normal.png" draggable="false">
        </div>
        <div class="flip-card-front">
            <img src="./assets/cardToChoose/${agent}.png"
                alt="Avatar" draggable="false">
        </div>
    </div>
`

let agentCounter = 0
let agentIndexCount = 0

for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 2; j++) {
        for (let k = 0; k < 2; k++) {
            const newCard = createCard(agentIndexCount, AGENTS[agentCounter])
            gameBoard[i].push(AGENTS[agentCounter])
            cardGrid.innerHTML += newCard

            agentIndexCount ++
        }
        agentCounter ++
    }
}

console.log(gameBoard)

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
        secondAgentIndexCounter ++
    }
}

   
const cards = document.querySelectorAll(".flip-card");
 
console.log(cards);

cards.forEach((card) =>
  card.addEventListener("click", (event) => {
        if (currentSelectedCard.length !== 2) {
            const inner = card.querySelector(".flip-card-inner");

            if (!inner.classList.contains("rotate")) {
            inner.classList.add("rotate");
            } else {
            inner.classList.remove("rotate");
            }

            currentSelectedCard.push(card)
            if (currentSelectedCard.length === 2) {
                setTimeout(800)
            }

        }



        if (currentSelectedCard.length === 2) {
            setTimeout(() => {
                const inner1 = currentSelectedCard[0].querySelector(".flip-card-inner")
                const inner2 = currentSelectedCard[1].querySelector(".flip-card-inner")

                if (!(inner1.classList[1] === inner2.classList[1])) {
                    inner1.classList.remove("rotate");
                    inner2.classList.remove("rotate");
                }

                currentSelectedCard = []
            }, 800)
            
        }
  })
);
