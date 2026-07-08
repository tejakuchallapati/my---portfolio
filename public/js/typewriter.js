/* ============================================================
   typewriter.js — Rotating Role Text Effect
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const roles = [
        "Full Stack Developer",
        "Software Developer",
        "Aspiring SDE"
    ];
    
    const target = document.getElementById('role-rotator');
    if (!target) return;

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            target.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            target.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at the end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
});
