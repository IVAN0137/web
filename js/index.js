document.querySelectorAll('.carousel-prev, .carousel-next').forEach(button => {
    button.addEventListener('click', () => {
        const carouselId = button.getAttribute('data-carousel');
        const carousel = document.querySelector(carouselId);
        const carouselInner = carousel.querySelector('.carousel-inner');
        const items = carousel.querySelectorAll('.carousel-item');
        const currentIndex = [...items].findIndex(item => item.classList.contains('active'));
        
        if (button.classList.contains('carousel-prev')) {
            // Navegar hacia atrás
            moveToIndex(carousel, (currentIndex - 1 + items.length) % items.length);
        } else {
            // Navegar hacia adelante
            moveToIndex(carousel, (currentIndex + 1) % items.length);
        }
    });
});

function moveToIndex(carousel, index) {
    const carouselInner = carousel.querySelector('.carousel-inner');
    const items = carousel.querySelectorAll('.carousel-item');
    const offset = -index * 100;

    // Ajustar la posición del carrusel
    carouselInner.style.transform = `translateX(${offset}%)`;

    // Actualizar las clases activas
    items.forEach((item, i) => item.classList.toggle('active', i === index));
}
