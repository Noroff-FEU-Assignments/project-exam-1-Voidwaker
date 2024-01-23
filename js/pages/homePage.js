document.addEventListener("DOMContentLoaded",() => {
    const imageContainer = document.querySelector(".images");
    let index = 0;

    //function to fetch images from the api
functuon fetchImages(){
    fetch() 
    .then((response => response.json()))
    .then((data) => {
        dispalyImages(data); 
    })
    .catch((error) => {
        console.error("error fetching images:", error);
    })

    //function to display images in the carousel
    function dispalyImages(images){
        images.forEach((image) => {
            const imageElement = document.createElement("img");
            imageElement.src = image.url;
            imageElement.alt = image.title;
            imageElement.classList.add("image");
            imageContainer.appendChild(imageElement);
        });
    }