// Slides
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let current = 0;

// Show slide function
function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');

    current = index;
}

// Dots click event
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        showSlide(parseInt(dot.dataset.slide));
        resetSlideshow();
    });
});

// Auto slideshow
let slideshowInterval = setInterval(nextSlide, 5000); // 5 seconds

function nextSlide() {
    let next = (current + 1) % slides.length;
    showSlide(next);
}

// Reset slideshow interval if user clicks a dot
function resetSlideshow() {
    clearInterval(slideshowInterval);
    slideshowInterval = setInterval(nextSlide, 5000);
}

// Scroll reveal for highlight grid
const items = document.querySelectorAll('.grid .item');

function revealItems() {
    const triggerBottom = window.innerHeight * 0.85;

    items.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        if (itemTop < triggerBottom) {
            item.classList.add('reveal');
        }
    });
}

// Initial reveal check and on scroll
window.addEventListener('scroll', revealItems);
window.addEventListener('load', revealItems);
