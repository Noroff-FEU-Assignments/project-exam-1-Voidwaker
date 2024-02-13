import { fetchWordPressPosts } from '../api/getPost.js'; 

document.addEventListener('DOMContentLoaded', () => {
    fetchWordPressPosts();
});

function updateCarousel(imageContainer, index, totalPosts) {
    const shiftPercentage = -(index * 100);
    imageContainer.style.transform = `translateX(${shiftPercentage}%)`;
}

export function initializeCarousel(posts) {
    const postsContainer = document.getElementById('postsContainer');
    let index = 0; 
    const totalPosts = posts.length;
    const postsPerView = 4;
    const totalViews = Math.ceil(totalPosts / postsPerView); 

    // Her kommer din eksisterende logikk for å legge til posts i postsContainer...

    document.getElementById("prevButton").addEventListener("click", () => {
        if (index > 0) {
            index--; 
        } else {
            index = totalViews - 1; 
        }
        updateCarousel(postsContainer, index * postsPerView, totalPosts);
    });

    document.getElementById("nextButton").addEventListener("click", () => {
        if (index < totalViews - 1) {
            index++; 
        } else {
            index = 0; 
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
            if (imageData.url && imageData.title) { 
                const imageElement = document.createElement("img");
                imageElement.src = imageData.url; 
                imageElement.alt = imageData.title;
                return imageElement; 
            }
            return null;
        }).filter(imageElement => imageElement !== null); 

        const imageContainer = document.getElementById("imageContainer");
        images.forEach(imageElement => {
            imageContainer.appendChild(imageElement);
        });

        // Nå som bildene er lastet, initialiser karusellen
        initializeCarousel(images);
    }

    fetchImages();
});
 