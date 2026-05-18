// ===== SMOOTH SCROLL FOR NAVIGATION LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Add active state
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide navbar on scroll down, show on scroll up
    if (currentScrollY > lastScrollY && currentScrollY > 500) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.animation = `fadeInUp 0.8s ease forwards`;
            }, index * 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-card, .project-card, .timeline-content, .contact-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===== ACTIVE NAVIGATION LINK BASED ON SCROLL =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== CERTIFICATE MODAL FUNCTIONALITY =====
const certModal = document.getElementById('certModal');
const modalImg = document.getElementById('certImg');
const captionText = document.getElementById('certCaption');

const certImages = {
    'cert1': { 
        src: 'certificates/frontend_certificate.pdf', 
        caption: 'Introduction to Front End Development - Simplilearn SkillUp',
        type: 'pdf'
    },
    'cert2': { 
        src: 'certificates/be10x_cert.jpg', 
        caption: 'AI Tools Workshop - Be10x',
        type: 'image'
    },
    'cert3': { 
        src: 'certificates/python_cert.jpg', 
        caption: 'Python Programming Language - JK Innovative Pvt. Ltd.',
        type: 'image'
    },
    'cert4': { 
        src: 'certificates/java_cert.jpg', 
        caption: 'Advanced Java Programming - JK Innovative Pvt. Ltd.',
        type: 'image'
    },
    'cert5': { 
        src: 'certificates/ai_for_student.pdf', 
        caption: 'AI for Students: Build Your Own Generative AI Model - NxtWave',
        type: 'pdf'
    },
    'cert6': { 
        src: 'certificates/micro_ai.pdf', 
        caption: 'Microsoft AI Skills Challenge Completion - Microsoft',
        type: 'pdf'
    },
    'cert7': { 
        src: 'certificates/cpp_nashra_cert.jpg', 
        caption: 'C++ Programming Language - Padhmashri Computer Institute',
        type: 'image'
    },
    'cert8': { 
        src: 'certificates/euphoria_cert.jpg', 
        caption: 'Award: Contributing as a Coordinator - College Fest EUPHORIA 2K24',
        type: 'image'
    },
    'cert9': { 
        src: 'certificates/lpf_scholar_cert.jpg', 
        caption: 'LPF Scholar (Lila Girl 2021) - LPF Lila Poonawalla Foundation',
        type: 'image'
    },
    'cert10': { 
        src: 'certificates/12th_cert.jpg', 
        caption: 'Award for Best Performance in Class 12 - Knowledge Hub Coaching Classes',
        type: 'image'
    },
};

function openCertModal(certId) {
    const cert = certImages[certId];
    if (!cert) return;

    certModal.classList.add('active');
    certModal.style.display = 'flex';
    captionText.innerHTML = cert.caption;

    if (cert.type === 'pdf') {
        modalImg.style.display = 'none';
        let pdfViewer = document.getElementById('certPdfViewer');
        
        if (!pdfViewer) {
            pdfViewer = document.createElement('iframe');
            pdfViewer.id = 'certPdfViewer';
            pdfViewer.style.cssText = `
                width: 100%;
                height: 500px;
                border: none;
                border-radius: 8px;
            `;
            const wrapper = certModal.querySelector('.modal-content-wrapper');
            wrapper.insertBefore(pdfViewer, captionText);
        }
        
        pdfViewer.src = cert.src;
        pdfViewer.style.display = 'block';
    } else {
        if (document.getElementById('certPdfViewer')) {
            document.getElementById('certPdfViewer').style.display = 'none';
        }
        modalImg.style.display = 'block';
        modalImg.src = cert.src;
        modalImg.style.animation = 'scaleIn 0.4s ease';
    }
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeCertModal() {
    certModal.classList.remove('active');
    certModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// ===== RESUME MODAL FUNCTIONALITY =====
const resumeModal = document.getElementById('resumeModal');
const resumeIframe = document.getElementById('resumeIframe');

function openResumeModal() {
    resumeModal.classList.add('active');
    resumeModal.style.display = 'flex';
    resumeIframe.src = 'nashra_resume.pdf';
    document.body.style.overflow = 'hidden';
}

function closeResumeModal() {
    resumeModal.classList.remove('active');
    resumeModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// ===== MODAL CLICK OUTSIDE TO CLOSE =====
window.addEventListener('click', (event) => {
    if (event.target === certModal) {
        closeCertModal();
    }
    if (event.target === resumeModal) {
        closeResumeModal();
    }
});

// ===== CLOSE MODALS WITH ESCAPE KEY =====
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeCertModal();
        closeResumeModal();
    }
});

// ===== TOUCH SWIPE TO CLOSE MODALS =====
let touchStartY = 0;
let touchEndY = 0;

function handleSwipe() {
    if (touchStartY - touchEndY > 100) {
        closeCertModal();
        closeResumeModal();
    }
}

[certModal, resumeModal].forEach(modal => {
    modal.addEventListener('touchstart', e => {
        touchStartY = e.changedTouches[0].clientY;
    }, false);
    
    modal.addEventListener('touchend', e => {
        touchEndY = e.changedTouches[0].clientY;
        handleSwipe();
    }, false);
});

// ===== ENHANCED SKILL CARD INTERACTIONS =====
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
    });
    
    card.addEventListener('click', function() {
        this.style.transform = 'scale(1.05)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// ===== PROJECT CARD PARALLAX EFFECT =====
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const rotateX = (y - 0.5) * 10;
        const rotateY = (x - 0.5) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ===== TYPING ANIMATION FOR HERO TEXT =====
function typeText(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing animation
// const heroTitle = document.querySelector('.hero-title');
// if (heroTitle) {
//     window.addEventListener('load', () => {
//         typeText(heroTitle, heroTitle.textContent);
//     });
// }

// ===== COUNTER ANIMATION FOR STATISTICS =====
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
        } else {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        }
    };
    
    updateCounter();
}

// ===== FORM VALIDATION (IF CONTACT FORM EXISTS) =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate form fields
        const inputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (isValid) {
            // Add success feedback
            const successMsg = document.createElement('div');
            successMsg.textContent = 'Message sent successfully!';
            successMsg.style.cssText = `
                background: #10b981;
                color: white;
                padding: 1rem;
                border-radius: 8px;
                margin-bottom: 1rem;
                animation: slideInUp 0.4s ease;
            `;
            contactForm.insertBefore(successMsg, contactForm.firstChild);
            
            setTimeout(() => {
                successMsg.remove();
                contactForm.reset();
            }, 3000);
        }
    });
}

// ===== LAZY LOADING FOR IMAGES =====
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ===== CURSOR TRACKING EFFECT =====
const followCursor = (e) => {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
};

document.addEventListener('mousemove', followCursor);

// ===== SCROLL PROGRESS INDICATOR =====
function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;
    
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = (scrollPercent * 100) + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);

// ===== INITIALIZE ALL ANIMATIONS ON PAGE LOAD =====
window.addEventListener('load', () => {
    // Fade in all sections
    document.querySelectorAll('section').forEach((section, index) => {
        section.style.animation = `fadeInUp 0.8s ease ${index * 0.2}s both`;
    });
    
    // Add ripple effect to buttons
    document.querySelectorAll('.btn, .cert-btn, .resume-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// ===== ADD RIPPLE ANIMATION KEYFRAMES =====
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    img.loaded {
        animation: fadeInUp 0.6s ease;
    }
    
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #3b82f6, #60a5fa);
        z-index: 999;
        width: 0;
        transition: width 0.3s ease;
    }
`;
document.head.appendChild(style);

// ===== PERFORMANCE MONITORING =====
if (window.performance) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time: ' + pageLoadTime + 'ms');
    });
}

// ===== SMOOTH REVEAL ANIMATION FOR SECTIONS =====
const revealOnScroll = () => {
    const reveals = document.querySelectorAll('section');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// ===== MOBILE MENU TOGGLE (IF EXISTS) =====
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// ===== PRELOADER =====
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

console.log('✨ Portfolio loaded successfully!');
