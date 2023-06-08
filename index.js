// BIRD UP! created by Jonathan Grabowski, Marc Katz, and Ammar Hussain

//Renders comments on page.
function renderComment(comment, comments){
    const oneComment = document.createElement('p');
    oneComment.className = 'current-comment'
    oneComment.innerText = comment;
    comments.append(oneComment); 
};

//Render Bird to center of page
function renderBird(birdID) {
    fetch(`http://localhost:3000/birds/${birdID}`)
    .then(r => r.json())
    .then(bird => {
        const img = document.getElementById('bird-image');
        img.src = bird.imgURL
        img.alt = bird.name
        const heading = document.querySelector('#bird-name');
        heading.innerText = bird.name;
        const descrip = document.querySelector('#bird-description');
        descrip.innerText = bird.description;
        const dateLocation = document.querySelector('#bird-date-location');
        dateLocation.innerText = `Spotted on ${bird.date} in ${bird.location}`;
        dateLocation.style = 'font-style: italic; padding-top: 10px'
        const comments = document.querySelector('#comments-section');
        comments.innerHTML = ""
        bird.comments.forEach((comment) => {
            renderComment(comment, comments);
        });
        const wrapper = document.getElementById('featured-bird-image');
        wrapper.dataset.id = bird.id
    });
};

//Adds event listener and handles submit for new comments.
function submitNewComment() {
    const commentButton = document.getElementById('new-comment-form');
    commentButton.addEventListener('submit', (e) => {
        e.preventDefault();
        const newComment = e.target['new-comment'].value
        const comments = document.querySelector('#comments-section');
        renderComment(newComment, comments);
        commentButton.reset();

        const birdID = document.getElementById('featured-bird-image').dataset.id;
        const commentList = Array.from(document.querySelectorAll('.current-comment')).map(p => p.innerText)
        fetch(`http://localhost:3000/birds/${birdID}`, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "comments": commentList
            })
        });
    });
};

//Renders the Navagation Bar on left of page.
function renderNavBar(bird, navBar) {
    const listElement = document.createElement('li');
    listElement.innerText = bird.name;
    listElement.addEventListener('click', (e) => renderBird(bird.id))
    listElement.addEventListener('mouseover', e => {
        e.target.classList.add('hover')
    })
    listElement.addEventListener('mouseout', e => {
        e.target.classList.remove('hover')
    })
    navBar.append(listElement);
};

//Adds event listener to Add Bird Form and handles POST to DB.
function renderNewBirdForm() {
    const birdForm = document.getElementById("bird-form")
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
        .then(r => r.json())
        .then(b => {
            const navBar = document.getElementById('bird-list');
            renderNavBar(b, navBar)
            renderBird(b.id)
        })
        birdForm.reset()
    });
};

//Search bar functionality. 
function searchBar() {
    const searchButton = document.getElementById("search-button")
    searchButton.addEventListener("click", e => {
        e.preventDefault()
        let birdName = document.getElementById("search").value
        fetch('http://localhost:3000/birds')
        .then(r => r.json())
        .then(birds => {
            let inDatabase = false
            birds.forEach(bird => {
                if(bird.name.toLowerCase() === birdName.toLowerCase()){
                    inDatabase = true
                    renderBird(bird.id)
                };
            });
            if(!inDatabase){
                alert(`${birdName} is not in the database`)
            };
        });
    });
};

//Iterates through the array of bird objects.
function birdArrayIterator(birdArray) {
    const navBar = document.getElementById('bird-list');
    birdArray.forEach(bird => renderNavBar(bird, navBar));
};

//Function that initializes on page load.
function init() {
    //
    fetch('http://localhost:3000/birds')
    .then(res => res.json())
    .then(birdArray => {
        birdArrayIterator(birdArray);
        renderBird(birdArray[0].id)
    });

    //Adding extra feature event listener.
    document.getElementById('bird-image').addEventListener('click', () => {alert(`Please don't touch the wildlife.`)});

    //Adding event listener for Add Bird pop up menu.
    const addBirdButton = document.getElementById("add-bird-button");
    const newBirdForm = document.getElementById("new-bird-form");
    //Visablity toggle for Add Bird form.
    addBirdButton.addEventListener("click", () => {
        newBirdForm.style.display = newBirdForm.style.display === "none" ? "block" : "none";
    });

    //Calling functions we want to execute on page load.
    searchBar();
    renderNewBirdForm();
    submitNewComment();
};


init();