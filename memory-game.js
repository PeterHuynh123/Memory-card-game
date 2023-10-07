const cards = document.querySelectorAll(".card")
let cardsArray = [[]]

let addCardCounter = 0 

// for(let i = 0; i < 5; i++) {
//     for(let k = 0; k < 4; k++) {
//         cardsArray[i].push(cards[addCardCounter])
//         addCardCounter ++
//     }
//     console.log(cardsArray)
// }




cards.forEach((card, index) => {
    card.addEventListener("click", e => {
        // console.log(card.classList, index)
        // if (card.classList.contains("card-front")) {
        //     card.className = "card-back"
        //     img.src = "https://cdn.vox-cdn.com/thumbor/eNOhiVdnvnyYEv_9kIw1IABEyZI=/0x0:3011x1447/1400x933/filters:focal(1123x329:1603x809):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/66954486/VALORANT_Jett_Red_crop.0.jpg"   
        //     // card.style.transform = "transform: rotateY(180deg);" 
        // } else if (card.classList.contains("card-back")){
        //     card.className = "card-front"
        //     img.src = "./assets/card_normal.png"
        // }
        const inner = card.querySelector(".card-inner")

        if (!card.classList.contains('rotate')) {
            inner.classList.add('rotate')
        }
        else {
            inner.classList.remove('rotate')
        }

        console.log('hi')
    })
})

