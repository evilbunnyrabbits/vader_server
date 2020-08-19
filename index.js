document.addEventListener('DOMContentLoaded', function(e){
    const url = "http://localhost:3000/chicken/"


    document.addEventListener("submit", e => {
        const newChickenForm = e.target
        const type = newChickenForm.type.value
        const sauce = newChickenForm.sauce.value
        const score = 0
        const image = "https://media1.tenor.com/images/79d7dae61442332401760be3b2420e5f/tenor.gif?itemid=10302436"
        const chickenObj = {
            type: type,
            sauce: sauce,
            score: score,
            image: image
        }

        sendChickenData(chickenObj)
        newChickenForm.reset()
    })


    const sendChickenData = (chickenObj) => {
        const packet = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(chickenObj)
        }

        fetch(url, packet)
            .then(res => res.json())
    }


    const getChickenTenders = () => {
        fetch(url)
            .then(res => res.json())
            .then(data => displayAllChickenTenders(data))
    }


    const displayAllChickenTenders = (data) => {
        data.forEach(function(tenderObj) {
            const tenderList = document.getElementById("tender-list")
            processChickenTenders(tenderObj, tenderList)
        })
    }


    const processChickenTenders = (data, list) => {
        const tenderP = document.createElement('p')
        tenderP.classList.add("tender")
        tenderP.id = data.id

        tenderP.innerHTML = `
        <img src="${data.image}" alt="dancing tenders"/>
        <p>Type: ${data.type}</p>
        <p>Sauce: ${data.sauce}</p>
        <p class="score">${data.score}</p>
        <button class="up-vote">Up Vote</button>
        <button class="down-vote">Down Vote</button>
        <button class="delete">Delete</button>
        `
        list.append(tenderP)
    }

    const clickHandlerChicken = () => {
        e.preventDefault()
        document.addEventListener("click", e => {
            if (e.target.matches(".up-vote")){

                const button = e.target
                const parentDiv = button.parentElement
                const tenderId = parentDiv.id
                const scoreContainer = parentDiv.querySelector(".score")
                const newScore = parseInt(scoreContainer.textContent) + 1


                const packet = {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify({score: newScore}),
                }

                fetch(url + tenderId, packet)
                    .then(res => res.json())
                    .then(tenderObj => {
                        scoreContainer.textContent = tenderObj.score
                    })


            }else if (e.target.matches(".down-vote")){

                const button = e.target
                const parentDiv = button.parentElement
                const tenderId = parentDiv.id
                const scoreContainer = parentDiv.querySelector(".score")
                const newScore = parseInt(scoreContainer.textContent) - 1

                const packet = {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify({score: newScore}),
                }

                fetch(url + tenderId, packet)
                    .then(res => res.json())
                    .then(tenderObj => {
                        scoreContainer.textContent = tenderObj.score
                    })


            }else if (e.target.matches(".delete")){

                const button = e.target
                const parentDiv = button.parentElement

                const fullChickenList = parentDiv.parentElement


                const tenderId = parentDiv.id



                const packet = {
                    method: "DELETE",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    //body: JSON.stringify({score: newScore}),
                }

                fetch(url + tenderId, packet)
                    .then(res => res.json())

                fullChickenList.removeChild(parentDiv)

            }
        })
    }


    getChickenTenders()
    clickHandlerChicken()

})