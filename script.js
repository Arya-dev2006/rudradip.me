// ===========================
// GSAP SETUP & SMOOTH SCROLLING
// ===========================

gsap.registerPlugin(ScrollTrigger);

// ===========================
// THEME SWITCHER
// ===========================

const themes = ['default', 'blue', 'white', 'pink'];
let currentThemeIndex = 0;

// Load saved theme
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) {
    const themeIndex = themes.indexOf(savedTheme);
    if (themeIndex !== -1) {
        currentThemeIndex = themeIndex;
        if (savedTheme !== 'default') {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }
}

// Theme switcher button
const themeSwitcher = document.querySelector('.theme-switcher');

themeSwitcher.addEventListener('click', () => {
    // Cycle to next theme
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const newTheme = themes[currentThemeIndex];
    
    // Apply theme
    if (newTheme === 'default') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', newTheme);
    }
    
    // Save preference
    localStorage.setItem('portfolio-theme', newTheme);
    
    // Add animation to button
    gsap.fromTo(themeSwitcher, 
        { scale: 1, rotation: 0 },
        { 
            scale: [1.3, 1],
            rotation: 360,
            duration: 0.5,
            ease: 'back.out(2)'
        }
    );
    
    // Show theme name briefly
    showThemeNotification(newTheme);
});

function showThemeNotification(themeName) {
    // Remove existing notification if any
    const existing = document.querySelector('.theme-notification');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'theme-notification';
    notification.textContent = `${themeName.charAt(0).toUpperCase() + themeName.slice(1)} Theme`;
    document.body.appendChild(notification);
    
    // Animate in
    gsap.fromTo(notification,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
    );
    
    // Remove after 2 seconds
    setTimeout(() => {
        gsap.to(notification, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => notification.remove()
        });
    }, 2000);
}

// ===========================
// CUSTOM CURSOR
// ===========================

const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Smooth cursor movement
    const distX = mouseX - cursorX;
    const distY = mouseY - cursorY;
    
    cursorX += distX * 0.3;
    cursorY += distY * 0.3;
    
    const distFollowerX = mouseX - followerX;
    const distFollowerY = mouseY - followerY;
    
    followerX += distFollowerX * 0.15;
    followerY += distFollowerY * 0.15;
    
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor hover effects
const interactiveElements = document.querySelectorAll('a, button, .work-item, input, textarea');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) scale(1.5)`;
        cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) scale(1.5)`;
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) scale(1)`;
        cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) scale(1)`;
    });
});

// ===========================
// NAVIGATION
// ===========================

const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// HERO ANIMATIONS
// ===========================

// Hero text animation
gsap.from('.hero-text', {
    opacity: 0,
    y: 100,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out'
});

gsap.from('.title-line', {
    opacity: 0,
    y: 100,
    duration: 1,
    stagger: 0.2,
    delay: 0.5,
    ease: 'power3.out'
});

gsap.from('.hero-subtitle', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 1.2,
    ease: 'power2.out'
});

// Buttons animation removed - buttons should be immediately visible
// gsap.from('.hero-buttons .btn', {
//     opacity: 0,
//     y: 20,
//     duration: 0.6,
//     stagger: 0.15,
//     delay: 0.8,
//     ease: 'power2.out'
// });

// Hero visual animations - removed for immediate visibility
// gsap.from('.hero-visual', {
//     opacity: 0,
//     scale: 0.8,
//     duration: 1,
//     delay: 0.8,
//     ease: 'power3.out'
// });

// gsap.from('.floating-card', {
//     opacity: 0,
//     scale: 0,
//     duration: 0.8,
//     stagger: 0.2,
//     delay: 1.2,
//     ease: 'back.out(1.7)'
// });

gsap.from('.scroll-indicator', {
    opacity: 0,
    y: -30,
    duration: 0.8,
    delay: 2,
    ease: 'power2.out'
});

// ===========================
// SCROLL TRIGGER ANIMATIONS
// ===========================

// About section
gsap.from('.about-text', {
    scrollTrigger: {
        trigger: '.about-text',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    x: -100,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.about-image', {
    scrollTrigger: {
        trigger: '.about-image',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    x: 100,
    duration: 1,
    ease: 'power3.out'
});

// Animate stats counter
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

ScrollTrigger.create({
    trigger: '.about-stats',
    start: 'top 80%',
    once: true,
    onEnter: () => {
        document.querySelectorAll('.stat-number').forEach(stat => {
            animateCounter(stat);
        });
    }
});

// Skills section - removed opacity animation to ensure visibility
gsap.from('.skill-card', {
    scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    y: 30,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
});

// Skill bars animation
ScrollTrigger.create({
    trigger: '.skills-grid',
    start: 'top 80%',
    once: true,
    onEnter: () => {
        document.querySelectorAll('.skill-progress').forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            gsap.to(bar, {
                width: progress + '%',
                duration: 1.5,
                ease: 'power2.out'
            });
        });
    }
});

// Work section
gsap.from('.work-item', {
    scrollTrigger: {
        trigger: '.work-grid',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    scale: 0.8,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out'
});

// Contact section
gsap.from('.contact-info', {
    scrollTrigger: {
        trigger: '.contact-content',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    x: -50,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.contact-form', {
    scrollTrigger: {
        trigger: '.contact-content',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    x: 50,
    duration: 1,
    ease: 'power3.out'
});

// ===========================
// VIDEO PLAYER FUNCTIONALITY
// ===========================

const videoModal = document.querySelector('.video-modal');
const modalVideo = document.getElementById('modal-video');
const closeModalBtn = document.querySelector('.close-modal');
const playPauseBtn = document.querySelector('.play-pause-btn');
const muteBtn = document.querySelector('.mute-btn');
const fullscreenBtn = document.querySelector('.fullscreen-btn');
const progressBar = document.querySelector('.progress-bar');
const progressFilled = document.querySelector('.progress-filled');
const currentTimeDisplay = document.querySelector('.current-time');
const durationDisplay = document.querySelector('.duration');

let isPlaying = false;

// Open video modal with single video per work item
document.querySelectorAll('.work-item').forEach(item => {
    const playBtn = item.querySelector('.play-btn');
    const video = item.querySelector('.work-video');
    const videoSrc = video.querySelector('source').src;

    const open = (e) => {
        if (e) e.stopPropagation();
        openVideoModal(videoSrc);
    };

    if (playBtn) playBtn.addEventListener('click', open);
    item.addEventListener('click', open);
});

function openVideoModal(videoSrc) {
    // Set source directly on video for reliable reloads
    modalVideo.src = videoSrc;
    modalVideo.load();
    modalVideo.currentTime = 0;
    videoModal.classList.add('active');
    document.body.classList.add('no-scroll');
    
    // Add entrance animation and ensure content becomes visible
    gsap.fromTo('.video-modal-content',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
    
    // Auto play with fallback for autoplay restrictions
    modalVideo.play()
        .then(() => {
            isPlaying = true;
            updatePlayPauseIcon();
        })
        .catch(() => {
            modalVideo.muted = true;
            modalVideo.play().catch(() => {
                isPlaying = false;
                updatePlayPauseIcon();
            });
        });
}

function closeVideoModal() {
    gsap.to('.video-modal-content', {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
            videoModal.classList.remove('active');
            document.body.classList.remove('no-scroll');
            modalVideo.pause();
            modalVideo.currentTime = 0;
            modalVideo.removeAttribute('src');
            const sourceEl = modalVideo.querySelector('source');
            if (sourceEl) sourceEl.src = '';
            modalVideo.load();
            isPlaying = false;
            updatePlayPauseIcon();
            progressFilled.style.width = '0%';
            currentTimeDisplay.textContent = '0:00';
            durationDisplay.textContent = '0:00';
            gsap.set('.video-modal-content', { clearProps: 'all' });
        }
    });
}

// Close modal
closeModalBtn.addEventListener('click', closeVideoModal);

videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        closeVideoModal();
    }
});

// Escape key to close
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        closeVideoModal();
    }
});

// Play/Pause functionality
playPauseBtn.addEventListener('click', togglePlayPause);

modalVideo.addEventListener('click', togglePlayPause);

function togglePlayPause() {
    if (isPlaying) {
        modalVideo.pause();
        isPlaying = false;
    } else {
        modalVideo.play();
        isPlaying = true;
    }
    updatePlayPauseIcon();
    
    // Add micro animation
    gsap.from(playPauseBtn, {
        scale: 1.3,
        duration: 0.2,
        ease: 'power2.out'
    });
}

function updatePlayPauseIcon() {
    const icon = playPauseBtn.querySelector('i');
    if (isPlaying) {
        icon.className = 'fas fa-pause';
    } else {
        icon.className = 'fas fa-play';
    }
}

// Mute/Unmute functionality
muteBtn.addEventListener('click', () => {
    modalVideo.muted = !modalVideo.muted;
    updateMuteIcon();
    
    // Add micro animation
    gsap.from(muteBtn, {
        scale: 1.3,
        duration: 0.2,
        ease: 'power2.out'
    });
});

function updateMuteIcon() {
    const icon = muteBtn.querySelector('i');
    if (modalVideo.muted) {
        icon.className = 'fas fa-volume-mute';
    } else {
        icon.className = 'fas fa-volume-up';
    }
}

// Fullscreen functionality
fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        modalVideo.requestFullscreen();
        fullscreenBtn.querySelector('i').className = 'fas fa-compress';
    } else {
        document.exitFullscreen();
        fullscreenBtn.querySelector('i').className = 'fas fa-expand';
    }
    
    // Add micro animation
    gsap.from(fullscreenBtn, {
        scale: 1.3,
        duration: 0.2,
        ease: 'power2.out'
    });
});

// Progress bar
modalVideo.addEventListener('timeupdate', () => {
    const progress = (modalVideo.currentTime / modalVideo.duration) * 100;
    progressFilled.style.width = progress + '%';
    
    currentTimeDisplay.textContent = formatTime(modalVideo.currentTime);
});

modalVideo.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(modalVideo.duration);
});

progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    modalVideo.currentTime = pos * modalVideo.duration;
    
    // Add micro animation
    gsap.from(progressFilled, {
        scaleY: 1.5,
        duration: 0.2,
        ease: 'power2.out'
    });
});

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Video ended event
modalVideo.addEventListener('ended', () => {
    isPlaying = false;
    updatePlayPauseIcon();
});

// ===========================
// MICRO INTERACTIONS
// ===========================

// Button hover animations
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    btn.addEventListener('click', () => {
        gsap.fromTo(btn, 
            { scale: 0.95 },
            { scale: 1, duration: 0.2, ease: 'power2.out' }
        );
    });
});

// Skill card hover effects
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            y: -10,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Work item hover effects
document.querySelectorAll('.work-item').forEach(item => {
    const overlay = item.querySelector('.work-overlay');
    const playBtn = item.querySelector('.play-btn');
    
    item.addEventListener('mouseenter', () => {
        gsap.to(overlay, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
        
        gsap.from(playBtn, {
            scale: 0,
            rotation: 180,
            duration: 0.4,
            ease: 'back.out(2)'
        });
    });
    
    item.addEventListener('mouseleave', () => {
        gsap.to(overlay, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Form input animations
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
        gsap.to(input, {
            scale: 1.02,
            duration: 0.2,
            ease: 'power2.out'
        });
    });
    
    input.addEventListener('blur', () => {
        gsap.to(input, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out'
        });
    });
});

// Social links hover
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(link, {
            y: -5,
            rotation: 5,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    link.addEventListener('mouseleave', () => {
        gsap.to(link, {
            y: 0,
            rotation: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// ===========================
// CONTACT FORM SUBMISSION
// ===========================

const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show success animation
    const submitBtn = contactForm.querySelector('.btn');
    const originalText = submitBtn.querySelector('span').textContent;
    
    submitBtn.querySelector('span').textContent = 'Sending...';
    submitBtn.classList.add('loading');
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        submitBtn.querySelector('span').textContent = 'Message Sent!';
        submitBtn.classList.remove('loading');
        
        // Add success animation
        gsap.from(submitBtn, {
            scale: 1.2,
            duration: 0.3,
            ease: 'back.out(2)'
        });
        
        // Reset form
        setTimeout(() => {
            contactForm.reset();
            submitBtn.querySelector('span').textContent = originalText;
        }, 2000);
    }, 1500);
});

// ===========================
// IMAGE FRAME 3D EFFECT
// ===========================

const imageFrame = document.querySelector('.image-frame');

if (imageFrame) {
    imageFrame.addEventListener('mousemove', (e) => {
        const rect = imageFrame.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        gsap.to(imageFrame, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
    
    imageFrame.addEventListener('mouseleave', () => {
        gsap.to(imageFrame, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
}

// ===========================
// PARALLAX EFFECTS
// ===========================

// Floating cards parallax
gsap.to('.floating-card', {
    y: -50,
    duration: 2,
    ease: 'power1.inOut',
    stagger: 0.2,
    repeat: -1,
    yoyo: true
});

// Gradient orbs parallax
gsap.to('.gradient-orb', {
    x: '+=100',
    y: '+=100',
    duration: 20,
    ease: 'sine.inOut',
    stagger: 2,
    repeat: -1,
    yoyo: true
});

// ===========================
// SECTION NUMBER ANIMATIONS
// ===========================

document.querySelectorAll('.section-number').forEach(number => {
    ScrollTrigger.create({
        trigger: number,
        start: 'top 80%',
        onEnter: () => {
            gsap.from(number, {
                opacity: 0,
                x: -50,
                duration: 0.8,
                ease: 'power3.out'
            });
        }
    });
});

// ===========================
// PAGE LOAD ANIMATION
// ===========================

window.addEventListener('load', () => {
    // Hide loader if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        gsap.to(loader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => loader.remove()
        });
    }
    
    // Animate page entrance
    gsap.from('body', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
    });
});

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================

// Debounce resize events
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});

// Lazy loading for work items
if ('IntersectionObserver' in window) {
    const workItems = document.querySelectorAll('.work-item');
    const workObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                workObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    workItems.forEach(item => workObserver.observe(item));
}

// ===========================
// CONSOLE MESSAGE
// ===========================

console.log('%c🎬 Rudradip Panigrahi - Video Editor Portfolio', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cCrafted with passion and precision', 'color: #8b5cf6; font-size: 14px;');

// ===========================
// KEYBOARD SHORTCUTS
// ===========================

document.addEventListener('keydown', (e) => {
    // Space to play/pause video when modal is open
    if (e.code === 'Space' && videoModal.classList.contains('active')) {
        e.preventDefault();
        togglePlayPause();
    }
    
    // M to mute/unmute
    if (e.code === 'KeyM' && videoModal.classList.contains('active')) {
        e.preventDefault();
        muteBtn.click();
    }
    
    // F for fullscreen
    if (e.code === 'KeyF' && videoModal.classList.contains('active')) {
        e.preventDefault();
        fullscreenBtn.click();
    }
    
    // Arrow keys for video seek
    if (videoModal.classList.contains('active')) {
        if (e.code === 'ArrowLeft') {
            e.preventDefault();
            modalVideo.currentTime -= 5;
        }
        if (e.code === 'ArrowRight') {
            e.preventDefault();
            modalVideo.currentTime += 5;
        }
    }
});

// ===========================
// ACTIVE NAV LINK HIGHLIGHT
// ===========================

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===========================
// TEXT REVEAL ON HOVER
// ===========================

document.querySelectorAll('.work-title, .skill-card h3').forEach(title => {
    title.addEventListener('mouseenter', () => {
        gsap.to(title, {
            color: '#6366f1',
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    title.addEventListener('mouseleave', () => {
        gsap.to(title, {
            color: '#ffffff',
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// ===========================
// END OF SCRIPT
// ===========================
