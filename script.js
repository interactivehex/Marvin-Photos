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

// Initial reveal check and on scroll for gallery
document.addEventListener("DOMContentLoaded", () => {
	const galleryImages = document.querySelectorAll(".gallery img");

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add("reveal");
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.1 });

	galleryImages.forEach(img => observer.observe(img));
});

// Fullscreen Viewer
const galleryImgs = document.querySelectorAll(".gallery img");
const viewer = document.getElementById("fullscreen-viewer");
const viewerImg = document.getElementById("viewer-img");
const closeViewer = document.getElementById("close-viewer");
const prevBtn = document.getElementById("viewer-prev");
const nextBtn = document.getElementById("viewer-next");

let currentIndex = 0;

// Open viewer
galleryImgs.forEach((img, index) => {
    img.addEventListener("click", () => {
        currentIndex = index;
        viewerImg.src = img.src;
        viewer.style.display = "flex";
        document.body.style.overflow = "hidden";
    });
});

// Close viewer
closeViewer.addEventListener("click", () => {
    viewer.style.display = "none";
    document.body.style.overflow = "auto";
});

// Navigation
function showImage(index) {
    currentIndex = (index + galleryImgs.length) % galleryImgs.length;
    viewerImg.src = galleryImgs[currentIndex].src;
}

prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
nextBtn.addEventListener("click", () => showImage(currentIndex + 1));

// Close on background click
viewer.addEventListener("click", (e) => {
    if (e.target === viewer) {
        viewer.style.display = "none";
        document.body.style.overflow = "auto";
    }
});

// Keyboard controls
document.addEventListener("keydown", (e) => {
    if (viewer.style.display === "flex") {
        if (e.key === "ArrowRight") showImage(currentIndex + 1);
        if (e.key === "ArrowLeft") showImage(currentIndex - 1);
        if (e.key === "Escape") {
            viewer.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }
});
