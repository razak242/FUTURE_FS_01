
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});


document.querySelectorAll(".nav-links li a").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
}));

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

const revealElements = document.querySelectorAll(".reveal");
revealElements.forEach(el => revealObserver.observe(el));

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links li a");
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.style.background = "var(--glass-bg)";
        navbar.style.backdropFilter = "blur(15px)";
        navbar.style.borderBottomColor = "rgba(255, 255, 255, 0.1)";
    } else {
        navbar.style.background = "transparent";
        navbar.style.backdropFilter = "none";
        navbar.style.borderBottomColor = "var(--glass-border)";
    }

    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(item => {
        item.classList.remove("active");
        if (item.getAttribute("href").includes(current)) {
            item.classList.add("active");
        }
    });
});

navItems.forEach(item => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
        const id = item.getAttribute("href").slice(1);
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -80;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    });
});

const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector("button");
        const originalText = btn.innerText;
        
        btn.innerText = "Sending...";
        btn.disabled = true;
        
        setTimeout(() => {
            alert("Thank you for your message! This is a demo, so no email was actually sent.");
            contactForm.reset();
            btn.innerText = originalText;
            btn.disabled = false;
        }, 1500);
    });
}
