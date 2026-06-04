/* ============================================================
   cursor.js — Precision Ring Cursor
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const dot = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    const shadow = document.getElementById('cursor-shadow');

    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let angle = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        angle += 1.2;

        // Precise dot follows instantly (rotating counter-clockwise)
        dotX += (mouseX - dotX) * 0.3;
        dotY += (mouseY - dotY) * 0.3;
        dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%) rotate(${-angle * 1.5}deg)`;

        // Lagging ring for smoothness (rotating clockwise)
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) rotate(${angle}deg)`;

        // Shadow follows mouse directly
        if (shadow) {
            shadow.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        }

        requestAnimationFrame(animate);
    }

    animate();

    // Interaction states
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .pill');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            ring.classList.add('active');
            dot.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            ring.classList.remove('active');
            dot.classList.remove('active');
        });
    });
});
