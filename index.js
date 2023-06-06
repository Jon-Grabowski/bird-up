fetch('http://localhost:3000/birds')
    .then(res => res.json())
    .then(birdArray => {
        renderBird(birdArray[0]);
        birdArrayIterator(birdArray);
    })

function renderBird(bird) {
    const img = document.getElementById('bird-image');
    img.src = bird.imgURL
    img.alt = bird.name
    const heading = document.querySelector('#bird-name');
    heading.innerText = bird.name;
    const descrip = document.querySelector('#bird-description');
    descrip.innerText = bird.decription;
    const dateLocation = document.querySelector('#bird-date-location');
    dateLocation.innerText = `Bird spotted on ${bird.date} in ${bird.location}`;
    const comments = document.querySelector('#comments-section');
    comments.innerHTML = ""
    bird.comments.forEach((comment) => {
        const oneComment = document.createElement('p');
        oneComment.innerText = comment;
        comments.append(oneComment);
    })
}

const birdForm = document.getElementById("new-bird-form")
birdForm.addEventListener("submit", e => {
    e.preventDefault()
    let bird = {
        "name": e.target.name.value,
        "location": e.target.location.value,
        "date": e.target.date.value,
        "imgURL": e.target.imgURL.value,
        "description": e.target.description.value,
        "comments": []
    }
    fetch('http://localhost:3000/birds', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bird)
    })
})

const searchButton = document.getElementById("search-button")
searchButton.addEventListener("click", e => {
    e.preventDefault()
    let birdName = document.getElementById("search").value
    fetch('http://localhost:3000/birds')
    .then(r => r.json())
    .then(birds => {
        birds.forEach(bird => {
            if(bird.name.toLowerCase() === birdName.toLowerCase()){
                renderBird(bird)
                return
            }
        })
        alert(`${birdName} is not in the database`)
    })
})


function birdArrayIterator(birdArray) {
    birdArray.forEach(bird => renderNavBar(bird))
}

const navBar = document.getElementById('bird-list');
console.log(navBar)
function renderNavBar(bird) {
    const listElement = document.createElement('li');
    listElement.innerText = bird.name;
    listElement.addEventListener('click', (e) => renderBird(bird))
    listElement.addEventListener('mouseover', e => {
        e.target.classList.add('hover')
    })
    listElement.addEventListener('mouseout', e => {
        e.target.classList.remove('hover')
    })
    navBar.append(listElement);
}

// Get the "Add New Bird" button element
const addBirdButton = document.getElementById("add-bird-button");

// Get the new bird form element
const newBirdForm = document.getElementById("new-bird-form");

// Add an event listener to the button
addBirdButton.addEventListener("click", () => {
  // Toggle the visibility of the new bird form
  newBirdForm.style.display = newBirdForm.style.display === "none" ? "block" : "none";
});