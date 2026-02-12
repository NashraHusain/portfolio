document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(15, 23, 42, 0.98)';
    } else {
        nav.style.background = 'rgba(15, 23, 42, 0.95)';
    }
});

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

const certModal = document.getElementById('certModal');
const modalImg = document.getElementById('certImg');
const captionText = document.getElementById('certCaption');

const certImages = {
    'cert1': { 
        src: 'frontend_Certificate.pdf', 
        caption: 'Introduction to Front End Development - Simplilearn' 
    },
    'cert2': { 
        src: 'be10x_cert.jpeg', 
        caption: 'AI Tools Workshop - Be10x' 
    },
    'cert3': { 
        src: 'python_cert.jpg', 
        caption: 'Python Programming Language - JK Innovative' 
    },
    'cert4': { 
        src: 'java_cert.jpg', 
        caption: 'Advanced Java Programming - JK Innovative' 
    },
    'cert5': { 
        src: 'ai_for_student.pdf', 
        caption: 'AI for Students: Build Your Own Generative AI Model - NxtWave' 
    },
    'cert6': { 
        src: 'micro_ai.pdf', 
        caption: 'Microsoft AI Skills Challenge Completion - Microsoft' 
    },
    'cert7': { 
        src: 'c++_nashra_cert.jpg', 
        caption: 'C++ Programming Language - Padhmashri Computer Institute' 
    },
    'cert8': { 
        src: 'euphoria_cert.jpeg', 
        caption: 'Award: Contributing as a Coordinator - College Fest ‘EUPHORIA 2K24’' 
    },
    'cert9': { 
        src: 'lpf_scholar_cert.jpeg', 
        caption: 'LPF Scholar (Lila Girl 2021) - LPF (Lila Poonawalla Foundation)' 
    },
    'cert10': { 
        src: '12th_cert.jpeg', 
        caption: 'Award for Best Performance in Class 12 - Knowledge Hub Coaching Classes' 
    },
};

function openCertModal(certId) {
    const cert = certImages[certId];
    if (!cert) return;

    certModal.style.display = 'block';
    captionText.innerHTML = cert.caption;

    if (cert.src.toLowerCase().endsWith('.pdf')) {
        
        modalImg.style.display = 'none';
        let pdfViewer = document.getElementById('certPdfViewer');
        if (!pdfViewer) {
            pdfViewer = document.createElement('iframe');
            pdfViewer.id = 'certPdfViewer';
            pdfViewer.style.width = '100%';
            pdfViewer.style.height = '400px';
            modalImg.parentNode.insertBefore(pdfViewer, captionText);
        }
        pdfViewer.src = cert.src;
        pdfViewer.style.display = 'block';
    } else {
        if (document.getElementById('certPdfViewer')) {
            document.getElementById('certPdfViewer').style.display = 'none';
        }
        modalImg.style.display = 'block';
        modalImg.src = cert.src;
    }
}

function closeCertModal() {
    certModal.style.display = 'none';
}

// Resume Modal Functionality
const resumeModal = document.getElementById('resumeModal');
const resumeIframe = document.getElementById('resumeIframe');

function openResumeModal() {
    resumeModal.style.display = 'block';
    resumeIframe.src = 'nashra_resume.pdf'; 
}

function closeResumeModal() {
    resumeModal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == certModal) {
        closeCertModal();
    }
    if (event.target == resumeModal) {
        closeResumeModal();
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeCertModal();
        closeResumeModal();
    }
});

let startY;
[certModal, resumeModal].forEach(modal => {
    modal.addEventListener('touchstart', e => startY = e.touches[0].clientY);
    modal.addEventListener('touchmove', e => {
        const currentY = e.touches[0].clientY;
        if (startY - currentY > 50) {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        }
    });
});
