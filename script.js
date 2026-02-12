// script.js
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(15, 23, 42, 0.98)';
    } else {
        nav.style.background = 'rgba(15, 23, 42, 0.95)';
    }
});

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
});

document.querySelectorAll('.skill-card, .project-card, .timeline-content').forEach(el => {
    observer.observe(el);
});

// Certificate Modal Functionality
const certModal = document.getElementById('certModal');
const modalImg = document.getElementById('certImg');
const captionText = document.getElementById('certCaption');

const certImages = {
    cert1: { src: 'https://via.placeholder.com/800x600?text=Front+End+Development+Cert', caption: 'Introduction to Front End Development - Simplilearn SkillUp' },
    cert2: { src: 'https://via.placeholder.com/800x600?text=AI+Tools+Workshop+Cert', caption: 'AI Tools Workshop - Be10x' },
    cert3: { src: 'https://via.placeholder.com/800x600?text=Python+Cert', caption: 'Python Programming Language - JK Innovative Pvt. Ltd.' },
    cert4: { src: 'https://via.placeholder.com/800x600?text=Advanced+Java+Cert', caption: 'Advanced Java Programming - JK Innovative Pvt. Ltd.' },
    cert5: { src: 'https://via.placeholder.com/800x600?text=Generative+AI+Cert', caption: 'AI for Students: Build Your Own Generative AI Model - NxtWave' },
    cert6: { src: 'https://via.placeholder.com/800x600?text=Microsoft+AI+Cert', caption: 'Microsoft AI Skills Challenge Completion - Microsoft' },
    cert7: { src: 'https://via.placeholder.com/800x600?text=C%2B%2B+Cert', caption: 'C++ Programming Language - Padhmashri Computer Institute' },
    cert8: { src: 'https://via.placeholder.com/800x600?text=EUPHORIA+Coordinator+Cert', caption: 'Contributing as a Coordinator - EUPHORIA 2K24' },
    cert9: { src: 'https://via.placeholder.com/800x600?text=LPF+Scholar+Cert', caption: 'LPF Scholar (Lila Girl 2021) - Lila Poonawalla Foundation' },
    cert10: { src: 'https://via.placeholder.com/800x600?text=Best+Performance+Cert', caption: 'Award for Best Performance in Class 12 - Knowledge Hub Coaching Classes' }
};

function openCertModal(certId) {
    certModal.style.display = 'block';
    modalImg.src = certImages[certId].src;
    captionText.innerHTML = certImages[certId].caption;
}

function closeCertModal() {
    certModal.style.display = 'none';
}

// Resume Modal Functionality
const resumeModal = document.getElementById('resumeModal');
const resumeIframe = document.getElementById('resumeIframe');

function openResumeModal() {
    resumeModal.style.display = 'block';
    resumeIframe.src = 'resume.pdf'; // Reload to ensure it displays
}

function closeResumeModal() {
    resumeModal.style.display = 'none';
}

// Close modals on outside click
window.onclick = function(event) {
    if (event.target == certModal) {
        closeCertModal();
    }
    if (event.target == resumeModal) {
        closeResumeModal();
    }
}

// Close modals on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeCertModal();
        closeResumeModal();
    }
});

// Touch/swipe support for mobile modal close (optional enhancement)
let startY;
[certModal, resumeModal].forEach(modal => {
    modal.addEventListener('touchstart', e => startY = e.touches[0].clientY);
    modal.addEventListener('touchmove', e => {
        const currentY = e.touches[0].clientY;
        if (startY - currentY > 50) { // Swipe up to close
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        }
    });
});