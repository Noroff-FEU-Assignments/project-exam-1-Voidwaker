export const allPostsURL = "https://bollingvaaler.no/wp-json/wp/v2/posts?per_page=12&_embed";

export function fetchWordPressPosts() {
    console.log('fetchWordPressPosts starter'); // For debugging
    return fetch(allPostsURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(posts => {
            console.log('Innlegg hentet:', posts); // For debugging
            return posts;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            throw error;
        });
}

// Denne delen er ikke nødvendig hvis du allerede har den i hjemmesiden din
export function displayPosts(posts) {
    console.log(posts); // For debugging
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '';

    let startIndex = 0;
    const postsPerView = 4;

    updateView(startIndex, posts, postsPerView);

    document.getElementById('prevButton').addEventListener('click', () => {
        startIndex -= postsPerView;
        if (startIndex < 0) {
            startIndex = posts.length - postsPerView;
        }
        updateView(startIndex, posts, postsPerView);
    });

    document.getElementById('nextButton').addEventListener('click', () => {
        startIndex += postsPerView;
        if (startIndex >= posts.length) {
            startIndex = 0;
        }
        updateView(startIndex, posts, postsPerView);
    });
}

function updateView(startIndex, posts, postsPerView) {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '';

    const endIndex = startIndex + postsPerView;
    for (let i = startIndex; i < endIndex && i < posts.length; i++) {
        const post = posts[i];
        const postElement = document.createElement('div');
        postElement.className = 'post';

        // Legg til koden for å legge til bildet og teksten til hvert innlegg her

        postsContainer.appendChild(postElement);
    }
}





