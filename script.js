// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = '#1e293b'; // Slate
            navLinks.style.padding = '2rem';
            navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
        } else {
            navLinks.style.display = '';
        }
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Mobile menu cleanup
        if (window.innerWidth <= 768 && navLinks) {
            navLinks.classList.remove('active');
            navLinks.style.display = '';
        }

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Navbar Scroll Effect (Glassmorphism on scroll)
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// --- ANIMATIONS & OBSERVERS ---

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // Skill Bar Animation
            if (entry.target.classList.contains('skills-container')) {
                const progressBars = entry.target.querySelectorAll('.progress-fill');
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                });
            }

            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Observe all reveal elements
document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
    // Also check on load if already in view (for hero section especially)
    if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('active');
    }
});


// Typing Effect
const words = ["Software Engineer", "Problem Solver", "AI Enthusiast", "Web Developer"];
let i = 0;
let timer;

function typingEffect() {
    const target = document.querySelector('.typing-target');
    if (!target) return;

    let word = words[i].split("");
    var loopTyping = function () {
        if (word.length > 0) {
            target.innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, 2000); // Wait before deleting
            return false;
        }
        timer = setTimeout(loopTyping, 100);
    };

    // Clear initial content before starting new loop cycle if needed, 
    // but first run might want to keep existing text? 
    // Actually simplicity:
    target.innerHTML = "";
    loopTyping();
}

function deletingEffect() {
    const target = document.querySelector('.typing-target');
    if (!target) return;

    let word = words[i].split("");
    var loopDeleting = function () {
        if (word.length > 0) {
            word.pop();
            target.innerHTML = word.join("");
        } else {
            if (words.length > (i + 1)) {
                i++;
            } else {
                i = 0;
            }
            typingEffect();
            return false;
        }
        timer = setTimeout(loopDeleting, 50);
    };
    loopDeleting();
}

// Start typing effect on load
// Verify if element exists, then start
document.addEventListener('DOMContentLoaded', () => {
    const typingTarget = document.querySelector('.typing-target');
    if (typingTarget) {
        // Initial delay
        setTimeout(deletingEffect, 2000);
    }
});


// --- PROJECT DATA ---
const projectData = {
    client: {
        title: "Personal Website Development",
        tech: "HTML5 • Modern CSS • Responsive",
        desc: "A sleek, professional portfolio website developed for a client. Focuses on clean typography, responsive design, and rapid loading times."
    },
    main: {
        title: "Animal Intrusion Detection System",
        tech: "HTML/CSS • MySQL • AI Logic",
        desc: "A comprehensive security system designed to detect and deter wild animals from entering restricted zones. <br><br>The project utilizes advanced computer vision logic (YOLO) translated into web-compatible formats. It features real-time alert generation, a database for intrusion logging (MySQL), and an automated deterrent mechanism involving ultrasonic sound emitters. <br><br><strong>Current Status:</strong> In active development."
    },
    mini: {
        title: "College Timetable System",
        tech: "Web Development • MySQL • Automation",
        desc: "An intelligent scheduling application designed to solve the complexity of college timetable generation. <br><br>Features include conflict detection, faculty load balancing, and automated schedule generation using a constraint-satisfaction algorithm. Built with a robust MySQL backend for data integrity."
    },
    portfolio: {
        title: "Professional Portfolio",
        tech: "Modern UI/UX • Responsive Design",
        desc: "This portfolio website itself is a demonstration of modern web engineering. Uniquely, it was built using an 'AI-Augmented' workflow, leveraging Google's Gemini to rapidly iterate on design themes (from Cyber-Construct to Professional Standard) and generate clean, semantic code."
    }
};

// --- MODAL LOGIC ---
document.addEventListener('DOMContentLoaded', () => {

    // Form Submission
    const contactForm = document.getElementById('contact-form');
    const thankYouMsg = document.getElementById('thank-you-message');

    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            const btn = contactForm.querySelector('button[type="submit"]');
            if (btn) {
                btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
                btn.style.opacity = '0.7';
            }

            // Optimistic UI interaction
            setTimeout(() => {
                contactForm.style.display = 'none';
                thankYouMsg.style.display = 'block';
            }, 1000);
        });
    }

    // Modal
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-modal');
    const modalButtons = document.querySelectorAll('.btn-modal');

    const mTitle = document.getElementById('modal-title');
    const mTech = document.getElementById('modal-tech');
    const mDesc = document.getElementById('modal-body');

    modalButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const pid = btn.getAttribute('data-project');
            const data = projectData[pid];

            if (data) {
                mTitle.innerText = data.title;
                mTech.innerHTML = data.tech;
                mDesc.innerHTML = data.desc;

                modal.style.display = "block";
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = "none";
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    });

});


// --- BACKGROUND PARTICLES ANIMATION ---
const canvas = document.getElementById('particles-bg');
const ctx = canvas.getContext('2d');

let particlesArray;

// Set Canvas Size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Particle Class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.directionX = (Math.random() * 0.4) - 0.2; // Speed X
        this.directionY = (Math.random() * 0.4) - 0.2; // Speed Y
        this.size = Math.random() * 2 + 1;
        this.color = '#38bdf8'; // Primary Sky Blue
    }

    // Method to draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.3; // Low opacity for subtle look
        ctx.fill();
    }

    // Check particle position, check mouse position, move the particle, draw the particle
    update() {
        // limit particles to canvas boundary or wrap around
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
    }
}

// Create particle array
function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 15000; // Density
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

// Animation Loop
function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();

        // Connect particles with lines if close enough
        // This adds the "Constellation" effect
        /* 
        // Optional: Uncomment for connected lines (might be too busy for text BG)
        // Let's keep it simple floating orbs for now to ensure readability
        */
    }
}

// Start
initParticles();
animateParticles();

