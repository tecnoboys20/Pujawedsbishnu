// ==========================================
// 1. Navbar Scroll Effect & Mobile Menu
// ==========================================
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger lines
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            hamburger.click();
        }
    });
});

// ==========================================
// 2. Generate Night Sky Stars
// ==========================================
function generateStars() {
    const sky = document.getElementById('skyBg');
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random positioning
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size (0.5px to 2.5px)
        const size = Math.random() * 2 + 0.5;
        
        // Random animation duration and delay
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 5;

        star.style.left = `${x}vw`;
        star.style.top = `${y}vh`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;

        // Distribute stars among different layers for parallax effect later if needed
        const layer = Math.floor(Math.random() * 3) + 1;
        document.querySelector(`.stars-layer-${layer}`).appendChild(star);
    }
}

// Generate shooting stars occasionally
function createShootingStar() {
    const sky = document.getElementById('skyBg');
    const star = document.createElement('div');
    star.classList.add('shooting-star');
    
    star.style.left = `${Math.random() * 100 + 20}vw`; // Start from top right mostly
    star.style.top = `-${Math.random() * 20}vh`;
    
    const duration = Math.random() * 1.5 + 0.5;
    star.style.animationDuration = `${duration}s`;
    
    sky.appendChild(star);
    
    setTimeout(() => {
        star.remove();
    }, duration * 1000);
}

// Initialization
generateStars();
setInterval(createShootingStar, 4000);

// ==========================================
// 2.5 Generate Floating Lanterns dynamically
// ==========================================
function generateLanterns() {
    const container = document.getElementById('lanterns-container');
    const lanternCount = 12; // Adjust number of lanterns

    for (let i = 0; i < lanternCount; i++) {
        const lantern = document.createElement('img');
        lantern.src = 'assets/ufefe.png'; // Using the user's uploaded asset
        lantern.classList.add('lantern');
        lantern.alt = 'Floating Lantern';

        // Random positioning
        const x = Math.random() * 90; // 0 to 90vw
        
        // Random size (bigger range)
        const size = Math.random() * 300 + 150; // Between 150px and 450px
        
        // Random animation duration (20s to 50s)
        const duration = Math.random() * 30 + 20;
        
        // Random animation delay (0 to 30s) so they don't all start at once
        const delay = Math.random() * 30;

        // Random blur based on size (smaller = more blurred for depth)
        let blur = 0;
        if (size < 200) blur = 2;
        else if (size < 300) blur = 1;

        lantern.style.left = `${x}vw`;
        lantern.style.width = `${size}px`;
        lantern.style.animationDuration = `${duration}s`;
        lantern.style.animationDelay = `-${delay}s`; // Negative delay starts animation mid-way
        
        // Add strong golden glow and keep original color
        lantern.style.filter = `blur(${blur}px) drop-shadow(0 0 25px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 50px rgba(255, 215, 0, 0.5))`;

        container.appendChild(lantern);
    }
}

generateLanterns();

// ==========================================
// 3. Wedding Countdown
// ==========================================
// Set the date we're counting down to (12th May of current year, or next year if passed)
const currentYear = new Date().getFullYear();
let weddingDate = new Date(`May 12, ${currentYear} 19:00:00`).getTime();

// If May 12th has already passed this year, set to next year
if (new Date().getTime() > weddingDate) {
    weddingDate = new Date(`May 12, ${currentYear + 1} 19:00:00`).getTime();
}

const countdownTimer = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display results with leading zeros
    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

    // If countdown is finished
    if (distance < 0) {
        clearInterval(countdownTimer);
        document.getElementById("timer").innerHTML = "<div class='glass-card' style='padding: 2rem;'><h3 style='color: var(--text-gold);'>The Big Day is Here!</h3></div>";
    }
}, 1000);

// ==========================================
// 4. Scroll Reveal Animations
// ==========================================
function reveal() {
    const reveals = document.querySelectorAll(".reveal");

    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
// Trigger once on load
reveal();

// ==========================================
// 5. Audio Controls
// ==========================================
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const iconOn = document.getElementById("musicIconOn");
const iconOff = document.getElementById("musicIconOff");

let isPlaying = false;

// Attempt auto-play on first user interaction
let hasInteracted = false;
document.body.addEventListener('click', () => {
    if (!hasInteracted && !isPlaying) {
        bgMusic.volume = 0.5; // Soft volume
        bgMusic.play().then(() => {
            isPlaying = true;
            iconOn.style.display = "block";
            iconOff.style.display = "none";
        }).catch(e => console.log("Audio autoplay prevented"));
        hasInteracted = true;
    }
}, { once: true });

musicToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent triggering the body click
    if (isPlaying) {
        bgMusic.pause();
        iconOn.style.display = "none";
        iconOff.style.display = "block";
    } else {
        bgMusic.play();
        iconOn.style.display = "block";
        iconOff.style.display = "none";
    }
    isPlaying = !isPlaying;
    hasInteracted = true;
});
