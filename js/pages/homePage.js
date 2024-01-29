document.addEventListener("DOMContentLoaded", () => {
    const imageContainer = document.getElementById("imageContainer");
    let index = 0;
});

// carousel.js
export function initializeCarousel() {
    const imageContainer = document.getElementById("imageContainer");
}
    let index = 0;

    function fetchImages() {
        fetch("https://bollingvaaler.no/wp-json/wp/v2/media")
        .then(response => response.json())
        .then(data => {
            displayImages(data); 
        })
        .catch(error => {
            console.error("Error fetching images:", error);
        });
    }

    function displayImages(images) {
        images.forEach(image => {
            const imageElement = document.createElement("img");
            imageElement.src = image.url; // Endre feltene etter APIets responsstruktur
            imageElement.alt = image.title; // Endre feltene etter APIets responsstruktur
            imageContainer.appendChild(imageElement);
        });
    }

    fetchImages();

    const images = document.querySelectorAll(".carousel img");
    const totalImages = images.length;
    document.getElementById("prevButton").addEventListener("click", () => {
        index = (index - 1 + totalImages) % totalImages;
        updateCarousel();
    });
    document.getElementById("nextButton").addEventListener("click", () => {
        index = (index + 1) % totalImages;
        updateCarousel();
    });

    function updateCarousel() {
        const newTransformValue = -index * 100;
        imageContainer.style.transform = `translateX(${newTransformValue}%)`;
    }

    // Initialiserer karrusellen etter at bildene er lastet
    window.addEventListener('load', initializeCarousel);
