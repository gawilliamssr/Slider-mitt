document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            faqItems.forEach((otherItem) => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            item.classList.toggle('active');
        });
    });

    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#') {
                return;
            }
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const hamburger = document.querySelector('.hamburger');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
        });
    }

    const nav = document.querySelector('.nav');

    const handleScroll = () => {
        if (!nav) {
            return;
        }
        nav.classList.toggle('scrolled', window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    const ctaButtons = document.querySelectorAll('.cta-primary');

    ctaButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            button.appendChild(ripple);

            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const useCenter = event.clientX === 0 && event.clientY === 0;
            const pointerX = useCenter ? rect.left + rect.width / 2 : event.clientX;
            const pointerY = useCenter ? rect.top + rect.height / 2 : event.clientY;
            const x = pointerX - rect.left - size / 2;
            const y = pointerY - rect.top - size / 2;

            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            setTimeout(() => {
                ripple.remove();
            }, 500);
        });
    });

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll(
        '.feature, .benefit, .comparison-column, .badge, .testimonial, .exploded-view, .press-strip'
    );

    animateElements.forEach((element) => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });

    const videoPlaceholder = document.querySelector('.video-placeholder');

    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', () => {
            videoPlaceholder.classList.add('playing');

            setTimeout(() => {
                videoPlaceholder.classList.remove('playing');
            }, 1000);
        });
    }
});
