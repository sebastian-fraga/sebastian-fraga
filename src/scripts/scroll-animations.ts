
if (typeof window !== "undefined") {

    const initScrollAnimations = () => {
        const animatedElements = document.querySelectorAll('[class*="scroll-fade"]');
        let hasScrolled = false;

        window.addEventListener("scroll", () => {
            hasScrolled = true;
        }, { once: true });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-seen');
                } else if (hasScrolled) {
                    entry.target.classList.remove('scroll-seen');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        });

        animatedElements.forEach(el => observer.observe(el));
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initScrollAnimations);
    } else {
        initScrollAnimations();
    }
}