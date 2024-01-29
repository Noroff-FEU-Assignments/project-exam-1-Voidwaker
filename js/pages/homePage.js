export function initializeCarousel(images) {
    const imageContainer = document.getElementById("imageContainer");
    let index = 0;
    const totalImages = images.length;

    function updateCarousel() {
        const newTransformValue = -index * 100;
        imageContainer.style.transform = `translateX(${newTransformValue}%)`;
    }

    document.getElementById("prevButton").addEventListener("click", () => {
        index = (index - 1 + totalImages) % totalImages;
        updateCarousel();
    });

    document.getElementById("nextButton").addEventListener("click", () => {
        index = (index + 1) % totalImages;
        updateCarousel();
    });

    updateCarousel(); // Oppdater karusellen umiddelbart etter initiering
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
