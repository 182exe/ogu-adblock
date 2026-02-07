(() => {
    let obs = null;

    const hasRainbet = (a) => a && a.href && a.href.includes("rainbet.com");

    const isRainbetImg = (img) => {
        if (!img) return false;
        const src = img.getAttribute("src") || "";
        const dataSrc = img.getAttribute("data-src") || "";
        return /rainbet/i.test(src) || /rainbet/i.test(dataSrc);
    };

    const isBanner = (el) => {
        if (!el || !el.matches("div.responsivehide")) return false;
        const link = el.querySelector('a[href*="rainbet.com"]');
        const img = el.querySelector("img");
        return Boolean(link && isRainbetImg(img));
    };

    const pick = (a) => {
        if (!a) return null;
        const row = a.closest("tr.thread_row");
        if (row) return row;
        const banner = a.closest("div.responsivehide");
        if (isBanner(banner)) return banner;
        return a;
    };

    const sweep = (root = document) => {
        root.querySelectorAll('a[href*="rainbet.com"]').forEach((a) => {
            if (!hasRainbet(a)) return;
            const el = pick(a);
            if (el && el !== document.body && el !== document.documentElement) {
                el.remove();
            }
        });
    };

    const watch = () => {
        if (obs) return;
        obs = new MutationObserver((muts) => {
            for (const m of muts) {
                m.addedNodes.forEach((n) => {
                    if (n.nodeType !== Node.ELEMENT_NODE) return;
                    sweep(n);
                });
            }
        });
        obs.observe(document.documentElement, { childList: true, subtree: true });
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            sweep();
            watch();
        }, { once: true });
    } else {
        sweep();
        watch();
    }
})();
