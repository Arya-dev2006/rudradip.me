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
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.ceil(current) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
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
// ===========================
// WORK VIDEO MODAL SLIDER
// ===========================

const videoModal = document.querySelector('.video-modal');
const closeModalBtn = document.querySelector('.close-modal');
const modalVideoTitle = document.querySelector('.video-modal-title');
const modalVideoCounter = document.querySelector('.video-modal-counter');
const modalStage = document.querySelector('.video-carousel-stage');
const modalTrack = document.querySelector('.video-carousel-track');
const prevVideoBtn = document.querySelector('.prev-video-btn');
const nextVideoBtn = document.querySelector('.next-video-btn');
const playPauseBtn = document.querySelector('.play-pause-btn');
const muteBtn = document.querySelector('.mute-btn');

let currentVideoSources = [];
let currentVideoIndex = 0;
let currentVideoTitle = '';
let modalIsPlaying = false;
let modalIsMuted = false;
let modalIsAnimating = false;
let modalPointerStartX = 0;
let modalPointerCurrentX = 0;
let modalPointerDown = false;
let modalGesturesBound = false;

function getVisiblePanelCount() {
    return window.matchMedia('(max-width: 768px)').matches ? 1 : 3;
}

function getWorkItemVideos(item) {
    const dataVideos = item.getAttribute('data-videos');

    if (dataVideos) {
        try {
            const parsed = JSON.parse(dataVideos);
            return parsed.filter(Boolean);
        } catch (error) {
            console.warn('Invalid data-videos attribute on work item', error);
        }
    }

    const sources = Array.from(item.querySelectorAll('.work-video source'))
        .map(source => source.src)
        .filter(Boolean);

    if (sources.length) {
        return sources;
    }

    const fallbackVideo = item.querySelector('.work-video');
    return fallbackVideo?.src ? [fallbackVideo.src] : [];
}

function clampIndex(index, length) {
    return Math.min(Math.max(index, 0), Math.max(length - 1, 0));
}

function getSlideDirection(currentIndex, targetIndex) {
    if (targetIndex > currentIndex) return 'next';
    if (targetIndex < currentIndex) return 'prev';
    return 'current';
}

function applyVideoOrientation(panel, video) {
    const setOrientation = () => {
        const isPortrait = video.videoHeight > video.videoWidth;
        const isLandscape = video.videoWidth >= video.videoHeight;

        panel.classList.toggle('is-portrait', isPortrait);
        panel.classList.toggle('is-landscape', isLandscape);
        panel.classList.toggle('is-square', video.videoWidth === video.videoHeight);
    };

    if (video.readyState >= 1 && video.videoWidth && video.videoHeight) {
        setOrientation();
        return;
    }

    video.addEventListener('loadedmetadata', setOrientation, { once: true });
}

function createModalPanel(index, role, isActive, isEmpty) {
    const panel = document.createElement('button');
    panel.type = 'button';
    panel.className = `video-carousel-panel ${role ? `is-${role}` : ''} ${isActive ? 'is-active' : ''} ${isEmpty ? 'is-empty' : ''}`;

    if (isEmpty) {
        panel.disabled = true;
        panel.setAttribute('aria-hidden', 'true');
        return panel;
    }

    const video = document.createElement('video');
    video.className = 'video-carousel-video';
    video.src = currentVideoSources[index];
    video.preload = 'metadata';
    video.playsInline = true;
    video.muted = modalIsMuted;
    video.controls = false;

    const veil = document.createElement('div');
    veil.className = 'video-carousel-veil';

    panel.dataset.index = String(index);
    panel.appendChild(video);
    panel.appendChild(veil);
    applyVideoOrientation(panel, video);
    return panel;
}

function updateModalMeta() {
    if (modalVideoTitle) {
        modalVideoTitle.textContent = currentVideoTitle || 'Featured Work';
    }

    if (modalVideoCounter) {
        modalVideoCounter.textContent = `${currentVideoIndex + 1} / ${currentVideoSources.length || 1}`;
    }
}

function updateModalControls() {
    if (prevVideoBtn) {
        prevVideoBtn.disabled = currentVideoIndex === 0 || currentVideoSources.length < 2;
    }

    if (nextVideoBtn) {
        nextVideoBtn.disabled = currentVideoIndex >= currentVideoSources.length - 1 || currentVideoSources.length < 2;
    }

    if (playPauseBtn) {
        const icon = playPauseBtn.querySelector('i');
        if (icon) {
            icon.className = modalIsPlaying ? 'fas fa-pause' : 'fas fa-play';
        }
    }

    if (muteBtn) {
        const icon = muteBtn.querySelector('i');
        if (icon) {
            icon.className = modalIsMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
        }

        muteBtn.setAttribute('aria-label', modalIsMuted ? 'Unmute video' : 'Mute video');
    }
}

function renderModalSlider() {
    if (!modalTrack) return;

    modalTrack.innerHTML = '';
    const visiblePanelCount = getVisiblePanelCount();
    const indices = visiblePanelCount === 1
        ? [currentVideoIndex]
        : [currentVideoIndex - 1, currentVideoIndex, currentVideoIndex + 1];
    const roles = visiblePanelCount === 1 ? ['current'] : ['prev', 'current', 'next'];

    indices.forEach((videoIndex, slotIndex) => {
        const isEmpty = videoIndex < 0 || videoIndex >= currentVideoSources.length;
        const isActive = visiblePanelCount === 1 ? !isEmpty : slotIndex === 1 && !isEmpty;
        const panel = createModalPanel(videoIndex, roles[slotIndex], isActive, isEmpty);
        modalTrack.appendChild(panel);
    });

    modalTrack.querySelectorAll('.video-carousel-panel').forEach(panel => {
        panel.addEventListener('click', (e) => {
            e.stopPropagation();

            if (panel.classList.contains('is-empty')) {
                return;
            }

            const targetIndex = Number(panel.dataset.index);
            if (Number.isNaN(targetIndex)) return;

            if (panel.classList.contains('is-active')) {
                toggleModalPlayPause();
            } else {
                goToModalIndex(targetIndex);
            }
        });
    });

    if (modalIsPlaying) {
        const activeVideo = modalTrack.querySelector('.video-carousel-panel.is-active video');
        if (activeVideo) {
            activeVideo.play().catch(() => {
                modalIsPlaying = false;
                updateModalControls();
            });
        }
    }

    updateModalControls();
}

function handleModalPointerEnd() {
    if (!modalPointerDown) return;

    const deltaX = modalPointerCurrentX - modalPointerStartX;
    modalPointerDown = false;

    if (Math.abs(deltaX) > 40) {
        if (deltaX < 0) {
            goToModalIndex(currentVideoIndex + 1);
        } else {
            goToModalIndex(currentVideoIndex - 1);
        }
    }
}

function openVideoModal(videoSources, startIndex = 0, title = '') {
    if (!videoSources.length || !videoModal) return;

    currentVideoSources = videoSources;
    currentVideoIndex = clampIndex(startIndex, currentVideoSources.length);
    currentVideoTitle = title;
    modalIsPlaying = false;
    modalIsMuted = false;

    videoModal.classList.add('active');
    document.body.classList.add('no-scroll');
    updateModalMeta();
    renderModalSlider();

    requestAnimationFrame(() => {
        playModalVideo();
    });

    if (modalStage && !modalGesturesBound) {
        modalStage.addEventListener('pointerdown', (e) => {
            if (e.target.closest('.slider-nav-btn') || e.target.closest('.control-btn')) {
                return;
            }

            modalPointerDown = true;
            modalPointerStartX = e.clientX;
            modalPointerCurrentX = e.clientX;
            modalStage.setPointerCapture?.(e.pointerId);
        });

        modalStage.addEventListener('pointermove', (e) => {
            if (!modalPointerDown) return;
            modalPointerCurrentX = e.clientX;
        });

        modalStage.addEventListener('pointerup', handleModalPointerEnd);
        modalStage.addEventListener('pointercancel', handleModalPointerEnd);
        modalStage.addEventListener('pointerleave', handleModalPointerEnd);
        modalGesturesBound = true;
    }

    gsap.fromTo('.video-modal-content',
        { scale: 0.94, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
}

function openVideoModalFromItem(item) {
    const videoSources = getWorkItemVideos(item);
    const title = item.querySelector('.work-title')?.textContent?.trim() || 'Featured Work';
    const startIndex = videoSources.length >= 3 ? 1 : 0;

    openVideoModal(videoSources, startIndex, title);
}

function pauseModalVideos() {
    modalTrack?.querySelectorAll('video').forEach(video => video.pause());
}

function playModalVideo() {
    const activeVideo = modalTrack?.querySelector('.video-carousel-panel.is-active video');
    if (!activeVideo) return;

    activeVideo.muted = modalIsMuted;

    activeVideo.play().then(() => {
        modalIsPlaying = true;
        updateModalControls();
    }).catch(() => {
        modalIsPlaying = false;
        updateModalControls();
    });
}

function toggleModalPlayPause() {
    if (modalIsPlaying) {
        pauseModalVideos();
        modalIsPlaying = false;
        updateModalControls();
    } else {
        playModalVideo();
    }
}

function toggleModalMute() {
    modalIsMuted = !modalIsMuted;

    modalTrack?.querySelectorAll('video').forEach(video => {
        video.muted = modalIsMuted;
    });

    updateModalControls();
}

function goToModalIndex(targetIndex) {
    const nextIndex = clampIndex(targetIndex, currentVideoSources.length);
    if (nextIndex === currentVideoIndex || modalIsAnimating) return;

    const direction = getSlideDirection(currentVideoIndex, nextIndex);
    if (direction === 'current') return;

    modalIsAnimating = true;
    const resumePlayback = modalIsPlaying;
    pauseModalVideos();

    const visiblePanelCount = getVisiblePanelCount();
    const offset = direction === 'next'
        ? (visiblePanelCount === 1 ? '-100%' : '-33.333%')
        : (visiblePanelCount === 1 ? '100%' : '33.333%');
    modalTrack.style.transition = 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)';
    modalTrack.style.transform = `translate3d(${offset}, 0, 0)`;

    const finishTransition = () => {
        currentVideoIndex = nextIndex;
        modalTrack.style.transition = 'none';
        modalTrack.style.transform = 'translate3d(0, 0, 0)';
        updateModalMeta();
        renderModalSlider();
        modalTrack.offsetHeight;
        modalTrack.style.transition = '';
        modalIsAnimating = false;

        if (resumePlayback) {
            playModalVideo();
        }
    };

    modalTrack.addEventListener('transitionend', finishTransition, { once: true });
}

window.addEventListener('resize', () => {
    if (!videoModal?.classList.contains('active') || modalIsAnimating) return;
    renderModalSlider();
});

function closeVideoModal() {
    gsap.to('.video-modal-content', {
        scale: 0.94,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
            videoModal.classList.remove('active');
            document.body.classList.remove('no-scroll');
            pauseModalVideos();
            currentVideoSources = [];
            currentVideoIndex = 0;
            currentVideoTitle = '';
            modalIsPlaying = false;
            modalPointerDown = false;
            updateModalControls();
            updateModalMeta();
            gsap.set('.video-modal-content', { clearProps: 'all' });
        }
    });
}

document.querySelectorAll('.work-item').forEach(item => {
    const open = (e) => {
        if (e) e.stopPropagation();
        openVideoModalFromItem(item);
    };

    const playBtn = item.querySelector('.play-btn');

    if (playBtn) {
        playBtn.addEventListener('click', open);
    }

    item.addEventListener('click', open);
});

closeModalBtn?.addEventListener('click', closeVideoModal);

videoModal?.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        closeVideoModal();
    }
});

prevVideoBtn?.addEventListener('click', () => {
    goToModalIndex(currentVideoIndex - 1);
    gsap.from(prevVideoBtn, {
        scale: 1.08,
        duration: 0.2,
        ease: 'power2.out'
    });
});

nextVideoBtn?.addEventListener('click', () => {
    goToModalIndex(currentVideoIndex + 1);
    gsap.from(nextVideoBtn, {
        scale: 1.08,
        duration: 0.2,
        ease: 'power2.out'
    });
});

playPauseBtn?.addEventListener('click', () => {
    toggleModalPlayPause();
    gsap.from(playPauseBtn, {
        scale: 1.08,
        duration: 0.2,
        ease: 'power2.out'
    });
});

muteBtn?.addEventListener('click', () => {
    toggleModalMute();
    gsap.from(muteBtn, {
        scale: 1.08,
        duration: 0.2,
        ease: 'power2.out'
    });
});

document.addEventListener('keydown', (e) => {
    if (!videoModal?.classList.contains('active')) return;

    if (e.key === 'Escape') {
        closeVideoModal();
    }

    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToModalIndex(currentVideoIndex - 1);
    }

    if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToModalIndex(currentVideoIndex + 1);
    }

    if (e.code === 'Space') {
        e.preventDefault();
        toggleModalPlayPause();
    }
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
// WORK GRID SHOW MORE TOGGLE
// ===========================
const workGrid = document.getElementById('work-grid');
const showMoreBtn = document.querySelector('.show-more-btn');

if (workGrid && showMoreBtn) {
    // start collapsed showing only first 3
    workGrid.classList.add('collapsed');

    showMoreBtn.addEventListener('click', () => {
        if (workGrid.classList.contains('collapsed')) {
            workGrid.classList.remove('collapsed');
            showMoreBtn.setAttribute('aria-expanded', 'true');
            showMoreBtn.querySelector('span').textContent = 'Show less';
            showMoreBtn.querySelector('i').className = 'fas fa-chevron-up';
        } else {
            workGrid.classList.add('collapsed');
            showMoreBtn.setAttribute('aria-expanded', 'false');
            showMoreBtn.querySelector('span').textContent = 'Show more';
            showMoreBtn.querySelector('i').className = 'fas fa-chevron-down';
            // ensure the grid is visible after collapsing
            workGrid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
}

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
