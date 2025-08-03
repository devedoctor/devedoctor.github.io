
window.onload = function() {
    // --- Header Slider Functionality ---
    const sliderImages = document.querySelectorAll('.slider-image');
    const sliderTextSpan = document.getElementById('sliderText');
    let currentImageIndex = 0;
    const slideInterval = 10000; // 10 seconds

    function updateSlider() {
        // Remove 'active' class from all images and update text
        sliderImages.forEach(image => {
            image.classList.remove('active');
        });

        // Add 'active' class to the current image
        sliderImages[currentImageIndex].classList.add('active');

        // Update the descriptive text
        const newText = sliderImages[currentImageIndex].getAttribute('data-text');
        sliderTextSpan.textContent = newText;
        
        // Move to the next image
        currentImageIndex = (currentImageIndex + 1) % sliderImages.length;
    }

    // Start the slider and update it every 10 seconds
    setInterval(updateSlider, slideInterval);


    // --- Carousel Functionality for Skills and Services ---
    const carouselContainers = document.querySelectorAll('.carousel-container');

    carouselContainers.forEach(container => {
        const carousel = container.querySelector('.skills-carousel, .services-carousel');
        const prevButton = container.parentElement.querySelector('.carousel-control-prev');
        const nextButton = container.parentElement.querySelector('.carousel-control-next');
        let currentIndex = 0;
        let cardWidth = carousel.firstElementChild.offsetWidth + 30; // Card width + margin
        let itemsPerView = 3; // Default for desktop
        
        // Function to update items per view based on screen size
        function updateItemsPerView() {
            if (carousel.classList.contains('skills-carousel')) {
                if (window.innerWidth >= 992) {
                    itemsPerView = 3;
                } else if (window.innerWidth >= 768) {
                    itemsPerView = 2;
                } else {
                    itemsPerView = 1;
                }
            } else if (carousel.classList.contains('services-carousel')) {
                if (window.innerWidth >= 1200) {
                    itemsPerView = 4;
                } else if (window.innerWidth >= 768) {
                    itemsPerView = 2;
                } else {
                    itemsPerView = 1;
                }
            }
            cardWidth = carousel.firstElementChild.offsetWidth + 30;
        }

        // Event listener for next button click
        nextButton.addEventListener('click', () => {
            const totalCards = carousel.children.length;
            const maxIndex = Math.max(0, totalCards - itemsPerView);
            currentIndex = (currentIndex + itemsPerView) % totalCards;
            if (currentIndex > maxIndex) {
                 // Loop back to start if we go past the end
                currentIndex = 0;
            }
            carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        });

        // Event listener for previous button click
        prevButton.addEventListener('click', () => {
            const totalCards = carousel.children.length;
            const maxIndex = Math.max(0, totalCards - itemsPerView);
            currentIndex = (currentIndex - itemsPerView + totalCards) % totalCards;
            if (currentIndex < 0) {
                 // Loop back to end if we go past the start
                currentIndex = maxIndex;
            }
            carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        });

        // Initialize and listen for resize events
        updateItemsPerView();
        window.addEventListener('resize', () => {
            updateItemsPerView();
            // Reset position on resize to avoid visual issues
            carousel.style.transform = `translateX(0)`;
            currentIndex = 0;
        });
    });

    // --- Lucide Icons initialization ---
    // This function automatically replaces the <span> tags with SVG icons
    lucide.createIcons();
};
