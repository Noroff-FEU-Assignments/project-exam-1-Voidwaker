export function fetchWordPressPosts() {
    console.log('fetchWordPressPosts starter'); // For debugging
    return fetch(allPostsURL) // Bruker allPostsURL definert ovenfor
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(posts => {
            console.log('Innlegg hentet:', posts); // For debugging
            return posts; // Returnerer innleggene for videre bruk
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            throw error; // Kaster feilen videre for å kunne håndtere den der funksjonen kalles
        });
}



export function displayPosts(posts) {
    console.log(posts); // For debugging
    const postsContainer = document.getElementById('postsContainer');
    // Tømmer containeren for tidligere innlegg
    postsContainer.innerHTML = '';

    // Anta at vi starter med de første 4 innleggene
    let startIndex = 0;
    const postsPerView = 4;

    // Viser de første 4 innleggene
    updateView(startIndex, posts, postsPerView);

    document.getElementById('prevButton').addEventListener('click', () => {
        startIndex -= postsPerView;
        if (startIndex < 0) {
            startIndex = posts.length - postsPerView; // Går til siste sett om vi er på starten
        }
        updateView(startIndex, posts, postsPerView);
    });

    document.getElementById('nextButton').addEventListener('click', () => {
        startIndex += postsPerView;
        if (startIndex >= posts.length) {
            startIndex = 0; // Går tilbake til starten om vi er på slutten
        }
        updateView(startIndex, posts, postsPerView);
    });
}

function updateView(startIndex, posts, postsPerView) {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = ''; // Fjerner tidligere innlegg før ny visning

    const endIndex = startIndex + postsPerView;
    for (let i = startIndex; i < endIndex && i < posts.length; i++) {
        const post = posts[i];
        const postElement = document.createElement('div');
        postElement.className = 'post';

        // Her kommer din eksisterende kode for å legge til bildet og teksten til hvert innlegg

        postsContainer.appendChild(postElement);
    }
}





document.addEventListener('DOMContentLoaded', fetchWordPressPosts);




