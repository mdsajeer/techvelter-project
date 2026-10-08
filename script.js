








// Scroll Reveal Animation using Intersection Observer
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.glass-pane, .section-title').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});


// Smooth Scrolling for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ── Portfolio: Auto-scroll + Manual Arrow Controls ──
window.addEventListener('load', function () {
    const track = document.getElementById('portfolio-track');
    // ...
    const prevBtn = document.getElementById('portfolio-prev');
    const nextBtn = document.getElementById('portfolio-next');
    if (!track || !prevBtn || !nextBtn) return;

    // Remove CSS animation — we drive it from JS
    track.style.animation = 'none';

    const speed = 0.8;            // px per frame (auto-scroll speed)
    let position = 0;
    let paused = false;
    let resumeTimer = null;
    const RESUME_DELAY = 3000;    // ms before auto-scroll resumes after manual action

    function halfWidth() {
        return track.scrollWidth / 2;
    }

    function applyTranslate(smooth) {
        if (smooth) {
            track.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
        } else {
            track.style.transition = 'none';
        }
        track.style.transform = `translateX(${-position}px)`;
    }

    // Continuous auto-scroll
    function autoScroll() {
        if (!paused) {
            position += speed;
            // Loop seamlessly when we've scrolled past the first set
            if (position >= halfWidth()) {
                position -= halfWidth();
            }
            applyTranslate(false);
        }
        requestAnimationFrame(autoScroll);
    }
    requestAnimationFrame(autoScroll);

    // Pause & schedule resume
    function pauseAndScheduleResume() {
        paused = true;
        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(() => {
            paused = false;
        }, RESUME_DELAY);
    }

    // ── Arrow buttons ──
    const cardStep = 380; // card width (350) + gap (30)

    nextBtn.addEventListener('click', () => {
        pauseAndScheduleResume();
        position += cardStep;
        if (position >= halfWidth()) position -= halfWidth();
        applyTranslate(true);
        // After transition remove smooth so auto-scroll isn't jittery
        setTimeout(() => { track.style.transition = 'none'; }, 520);
    });

    prevBtn.addEventListener('click', () => {
        pauseAndScheduleResume();
        position -= cardStep;
        if (position < 0) position += halfWidth();
        applyTranslate(true);
        setTimeout(() => { track.style.transition = 'none'; }, 520);
    });

    // ── Hover pause (keep existing behavior) ──
    const container = document.getElementById('portfolio-marquee');
    if (container) {
        container.addEventListener('mouseenter', () => {
            paused = true;
            clearTimeout(resumeTimer);
        });
        container.addEventListener('mouseleave', () => {
            paused = false;
        });
    }
});
