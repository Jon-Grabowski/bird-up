fetch('http://localhost:3000/birds')
    .then(res => res.json())
    .then(birdArray => {
        renderBird(birdArray[0]);
        birdArrayIterator(birdArray);
    })

function renderBird(bird) {
    const img = document.querySelector('.image-container');
    img.src = bird.imgURL
    img.alt = bird.name
    const headingContainer = document.querySelector('.heading-1-div');
    const heading = document.createElement('h2');
    heading.innerText = bird.name;
    headingContainer.append(heading);
    
}

const birdForm = document.getElementById("bird-form")
birdForm.addEventListener("submit", e => {
    e.preventDefault()
    let bird = {
        name: e.target.name.value,
        location: e.target.location.value,
        date: e.target.date.value,
        imgURL: e.target.imgURL.value,
        description: e.target.description.value
    }
    fetch('http://localhost:3000/birds', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bird)
    })
})


function birdArrayIterator(birdArray) {
    birdArray.forEach(bird => renderNavBar(bird))
}

const navBar = document.querySelector('.nav-container ul');
console.log(navBar)
function renderNavBar(bird) {
    const listElement = document.createElement('li');
    
}