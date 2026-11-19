// Types each line in reading order once it scrolls into view,
// as if the page is being written.

(function () {
    const STAGGER = 140;

    const SELECTOR = [
        '.hero-subtitle',
        '.meta-label',
        '.meta-value',
        '.section-eyebrow',
        '.section-title',
        '.section-description',
        '.about-intro',
        '.about-text > p',
        '.pullquote p',
        '.skills > h3',
        '.skill-card h4',
        '.project-label',
        '.project-subtitle',
        '.project-description',
        '.contact-intro',
        '.scroll-indicator > span'
    ].join(',');

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let observer = null;
    let started = false;
    let contentReady = false;
    let batch = [];
    let batchTimer = null;

    function wait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function baseDelay(length) {
        if (length < 24) return 40;
        if (length < 90) return 22;
        return 14;
    }

    function pauseAfter(char) {
        if (char === '.' || char === ',' || char === ';' || char === ':' || char === '—') return 60;
        if (char === ' ') return 10;
        return 0;
    }

    function readingOrder(elements) {
        return elements
            .map((el) => ({ el, rect: el.getBoundingClientRect() }))
            .sort((a, b) => {
                const topDiff = a.rect.top - b.rect.top;
                if (Math.abs(topDiff) > 8) return topDiff;
                return a.rect.left - b.rect.left;
            })
            .map((item) => item.el);
    }

    async function type(el) {
        const full = el.textContent;
        if (!full || !full.trim()) return;

        const lockedHeight = el.getBoundingClientRect().height;
        el.style.minHeight = lockedHeight + 'px';
        el.classList.add('is-typing');
        el.setAttribute('aria-label', full);
        el.setAttribute('aria-busy', 'true');
        el.textContent = '';

        await new Promise((resolve) => {
            let index = 0;
            let nextAt = 0;

            function frame(now) {
                if (nextAt && now < nextAt) {
                    requestAnimationFrame(frame);
                    return;
                }

                index += 1;
                el.textContent = full.slice(0, index);

                if (index >= full.length) {
                    resolve();
                    return;
                }

                nextAt = now + baseDelay(full.length) + pauseAfter(full[index - 1]);
                requestAnimationFrame(frame);
            }

            requestAnimationFrame(frame);
        });

        await wait(320);
        el.classList.remove('is-typing');
        el.style.minHeight = '';
        el.removeAttribute('aria-busy');
        el.removeAttribute('aria-label');
    }

    function runBatch(elements) {
        const ordered = readingOrder(elements).filter((el) => el.dataset.typed !== '1');
        ordered.forEach((el, index) => {
            el.dataset.typed = '1';
            setTimeout(() => type(el), index * STAGGER);
        });
    }

    function scan() {
        if (reducedMotion) return;
        if (observer) observer.disconnect();

        const pending = [...document.querySelectorAll(SELECTOR)].filter((el) => {
            if (el.dataset.typed === '1') return false;
            if (!el.textContent || !el.textContent.trim()) return false;
            return el.getClientRects().length > 0;
        });

        if (!pending.length) return;

        observer = new IntersectionObserver((entries) => {
            const entered = entries
                .filter((entry) => entry.isIntersecting)
                .map((entry) => entry.target);
            entered.forEach((el) => observer.unobserve(el));
            batch.push(...entered);
            clearTimeout(batchTimer);
            batchTimer = setTimeout(() => {
                const queued = batch;
                batch = [];
                runBatch(queued);
            }, 60);
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.35 });

        pending.forEach((el) => observer.observe(el));
    }

    function begin() {
        if (started || reducedMotion) return;
        started = true;
        scan();
    }

    window.addEventListener('contentLoaded', () => {
        contentReady = true;
        begin();
    });

    window.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            if (!contentReady) begin();
        }, 1200);
    });

    if (document.readyState !== 'loading') {
        setTimeout(() => {
            if (!contentReady) begin();
        }, 1200);
    }
})();
