const cur = document.getElementById('cur');
const ring = document.getElementById('ring');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (cur && !prefersReducedMotion) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', function (e) {
        mx = e.clientX;
        my = e.clientY;
        cur.style.left = mx + 'px';
        cur.style.top = my + 'px';
    });

    function animateRing() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .work-card').forEach(function (el) {
        el.addEventListener('mouseenter', function () {
            cur.style.width = '14px';
            cur.style.height = '14px';
            ring.style.width = '46px';
            ring.style.height = '46px';
        });
        el.addEventListener('mouseleave', function () {
            cur.style.width = '8px';
            cur.style.height = '8px';
            ring.style.width = '32px';
            ring.style.height = '32px';
        });
    });
}

const nav = document.getElementById('nav');
window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

const ham = document.getElementById('ham');
const drawer = document.getElementById('navDrawer');

ham.addEventListener('click', function () {
    const open = drawer.classList.toggle('open');
    ham.setAttribute('aria-expanded', open);
    ham.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

function closeDrawer() {
    drawer.classList.remove('open');
    ham.setAttribute('aria-expanded', false);
    ham.setAttribute('aria-label', 'Open menu');
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDrawer();
});

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
});

let lang = 'zh';

function setLang(l) {
    lang = l;
    document.getElementById('btnZh').classList.toggle('active', l === 'zh');
    document.getElementById('btnZh').setAttribute('aria-pressed', l === 'zh');
    document.getElementById('btnEn').classList.toggle('active', l === 'en');
    document.getElementById('btnEn').setAttribute('aria-pressed', l === 'en');

    document.querySelectorAll('[data-zh]').forEach(function (el) {
        var v = l === 'zh' ? el.dataset.zh : el.dataset.en;
        if (v !== undefined) el.innerHTML = v;
    });

    document.documentElement.lang = l === 'zh' ? 'zh' : 'en';
    document.documentElement.classList.toggle('lang-en', l === 'en');
    document.documentElement.classList.toggle('lang-zh', l === 'zh');

}

let fontSize = 16;

function changeFontSize(direction) {
    fontSize = fontSize + direction;
    if (fontSize < 12) fontSize = 12;
    if (fontSize > 22) fontSize = 22;
    document.documentElement.style.fontSize = fontSize + 'px';
}
