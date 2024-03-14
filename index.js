const input = document.querySelector('input'); // on sélectionne l'élément d'entrée (input)
const favoriteBtn = document.querySelector(".btn-favorite"); // le bouton de favoris
const submitBtn = document.querySelector(".submit"); // le bouton de soumission
const ul = document.querySelector("ul"); // la liste non
const page = document.querySelector('body');
const lettres = document.querySelectorAll('.lettres')
const container = document.querySelector('.container')

// Initialisation du tableau de favoris
let favTable = []

// on va afficher les détails du repas en fonction de la recherche
function displayMeal() {
    // Vérifie si la valeur de l'entrée (input) si elle n'est pas vide
    if (input.value !== "") {
        ul.innerHTML = ""; 
        const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`; 
        axios.get(URL)
            .then(res => {
                const body = res.data.meals; // on récupère les données des repas
                console.log(body);

                scroll()

                

                body.forEach(element => { // une boucle à travers chaque repas récupéré
                    const title = element.strMeal; // Titre du repas
                    const category = element.strCategory; // Catégorie du repas
                    const area = element.strArea; // Région et origine du repas
                    const img = element.strMealThumb; // l'image du repas
                    const li = document.createElement("li"); // Crée un élément li (<p>${instructions}</p>)
                    
                    li.classList.add('li-plats')

                    li.innerHTML = `
                        <img src="${img}" alt="poster">
                        <h2>${title}</h2>
                        <h3>${category}</h3>
                        <h3>${area}</h3>
                        <button id=${element.idMeal} class="btn-add">Add to favorite</button>      
                    `;
                    ul.appendChild(li); // on va ajouter l'élément li à la liste ul

                    

                

                    // On vient chercher le 5ème enfant du li 
                    const addBtn = li.children[4]

                    // On écoute le bouton (aka 5ème enfant de ton li)
                    addBtn.addEventListener('click', () => {
                        if (!favTable.includes(element.idMeal)) {
                            // On ajoute au tableau de favoris l'id du meal / repas
                            favTable.push(addBtn.id)
                            // On ajoute notre tableau de favs au local storage
                            localStorage.setItem('favorites', JSON.stringify(favTable))
                            addBtn.textContent = "Delete from favorites"
                            addBtn.style.color = "red"
                        } else {
                            const index = favTable.indexOf(addBtn.id)
                            favTable.splice(index, 1)
                            localStorage.setItem('favorites', JSON.stringify(favTable))
                            addBtn.textContent = "Add to favorites"
                            addBtn.style.color = "black"
                        }
                    })
                    
                    
                });
                
            }).catch(e => console.error(e)); // catch qui va gère les erreurs de la requête 
    }
}
 
// l'événement lors du clic sur le bouton de favoris
favoriteBtn.addEventListener("click", () => {
    ul.innerHTML = ""; // on va éfface le contenu précédent de la liste

    const favorites = JSON.parse(localStorage.getItem("favorites")) || []; // puis récupère les favoris depuis le stockage local
    
    favorites.forEach(idMeal => { 
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
        
        axios.get(url)
        .then(res => {
            const data = res.data.meals
            console.log(data)

            data.forEach(element => {
                const title = element.strMeal; // Titre du repas
                const category = element.strCategory; // Catégorie du repas
                const area = element.strArea; // Région et origine du repas
                const img = element.strMealThumb; // l'image du repas
                const li = document.createElement("li"); // Crée un élément li (<p>${instructions}</p>)

                li.innerHTML = `
                    <img src="${img}" alt="poster">
                    <h2>${title}</h2>
                    <h3>${category}</h3>
                    <h3>${area}</h3>
                    <button id=${element.idMeal} class="btn-del">Delete from favorite</button>`;

                ul.appendChild(li); // on va ajouter l'élément li à la liste ul

                const delBtn = li.children[4]

                delBtn.addEventListener('click', () => {
                    delBtn.parentElement.remove()
                    const id = delBtn.id

                    const index = favTable.indexOf(id)
                    favTable.splice(index, 1)
                    localStorage.setItem('favorites', JSON.stringify(favTable))

                })
            })
        })
        .catch(err => console.log(err))
    });
});
 
submitBtn.addEventListener("click",displayMeal)
 // et pour finir l'événement lors du clic sur le bouton de soumission pour afficher les repas


window.addEventListener('keypress', (e) => {
    if(e.key === "Enter") {
        submitBtn.click()
    }
})

function scroll (){
    const scrollBtn = document.createElement('img')
    scrollBtn.src = "assets/arrow.svg"
    scrollBtn.classList.add('scroll-btn')
    container.appendChild(scrollBtn) 
    
    scrollBtn.addEventListener('click', scroll)
    if (window.scrollY > 0) {
        scrollToTop();
        scrollBtn.style.transform = 'rotate(270deg)'  
        scrollBtn.style.transition = '1s'  
        
    } else {
        scrollToBottom();
        
    }
}

function scrollToTop (){
    window.scrollTo({
        top:0,
        behavior: 'smooth'
        
    })
}
function scrollToBottom () {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    })
}


lettres.forEach(lettre => {
    lettre.addEventListener('click', () => {
        const lettreClicked = lettre.textContent;
        ul.innerHTML = ""; 

        
        const URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${lettreClicked}`;
        axios.get(URL)
            .then(res => {
                const body = res.data.meals; 
                scroll()

                body.forEach(element => { 
                    const title = element.strMeal; 
                    const category = element.strCategory; 
                    const area = element.strArea; 
                    const img = element.strMealThumb; 
                    const li = document.createElement("li"); 

                    li.innerHTML = `
                        <img src="${img}" alt="poster">
                        <h2>${title}</h2>
                        <h3>${category}</h3>
                        <h3>${area}</h3>
                        <button id=${element.idMeal} class="btn-add">Add to favorite</button>      
                    `;
                    ul.appendChild(li); 

                    
                    const addBtn = li.children[4]

                    
                    addBtn.addEventListener('click', () => {
                        if (!favTable.includes(element.idMeal)) {
                            favTable.push(addBtn.id)
                            localStorage.setItem('favorites', JSON.stringify(favTable))
                            addBtn.textContent = "Delete from favorites"
                            addBtn.style.color = "red"
                        } else {
                            const index = favTable.indexOf(addBtn.id)
                            favTable.splice(index, 1)
                            localStorage.setItem('favorites', JSON.stringify(favTable))
                            addBtn.textContent = "Add to favorites"
                            addBtn.style.color = "black"
                        }
                    })

                });
            }).catch(e => console.error(e)); 
    });
});




