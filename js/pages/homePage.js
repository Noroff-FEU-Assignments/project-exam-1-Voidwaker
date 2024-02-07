import { fetchWordPressPosts } from './api/getPost.js'; // Legg til importen øverst i hjemmeside.js

document.addEventListener('DOMContentLoaded', () => {
    fetchWordPressPosts();
});

function updateCarousel(imageContainer, index, totalPosts) {
    const shiftPercentage = -(index * 100);
    imageContainer.style.transform = `translateX(${shiftPercentage}%)`;
}

export function initializeCarousel(posts) {
    const postsContainer = document.getElementById('postsContainer');
    let index = 0; // Startpunkt for karusellen
    const totalPosts = posts.length;
    const postsPerView = 4;
    const totalViews = Math.ceil(totalPosts / postsPerView); // Hvor mange "vinduer" eller visninger vi har

    // Her kommer din eksisterende logikk for å legge til posts i postsContainer...

    document.getElementById("prevButton").addEventListener("click", () => {
        if (index > 0) {
            index--; // Beveger seg bakover
        } else {
            index = totalViews - 1; // Går til den siste visningen hvis vi er på den første
        }
        updateCarousel(postsContainer, index * postsPerView, totalPosts);
    });

    document.getElementById("nextButton").addEventListener("click", () => {
        if (index < totalViews - 1) {
            index++; // Beveger seg fremover
        } else {
            index = 0; // Går tilbake til start hvis vi er på den siste visningen
        }
        updateCarousel(postsContainer, index * postsPerView, totalPosts);
    });
}




// Legg til eventuelle hendelseslyttere eller kodedeler som trenger DOMContentLoaded her
 document.addEventListener("DOMContentLoaded", () => {

    function fetchImages() {
        fetch("https://bollingvaaler.no/wp-json/wp/v2/posts/")
            .then(response => response.json())
            .then(data => {
                displayImages(data); 
            })
            .catch(error => {
                console.error("Error fetching images:", error);
            });
    }

    function displayImages(imagesData) {
        const images = imagesData.map(imageData => {
            if (imageData.url && imageData.title) { // Sjekk om nødvendige data finnes
                const imageElement = document.createElement("img");
                imageElement.src = imageData.url; // Feltene må matche API responsen
                imageElement.alt = imageData.title;
                return imageElement; // Returner elementet for å bruke i karusellen
            }
            return null;
        }).filter(imageElement => imageElement !== null); // Filtrer bort null-verdier

        const imageContainer = document.getElementById("imageContainer");
        images.forEach(imageElement => {
            imageContainer.appendChild(imageElement);
        });

        // Nå som bildene er lastet, initialiser karusellen
        initializeCarousel(images);
    }

    fetchImages();
});
 