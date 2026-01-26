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

// --- PROJECT DATA ---
const projectData = {
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
