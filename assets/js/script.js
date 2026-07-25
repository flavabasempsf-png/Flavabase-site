/* ==========================================================
   FLAVA BASE WEBSITE V2.0
   Main JavaScript
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initStickyHeader();
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initActiveNavigation();
    initFaqAccordion();

});


/* ==========================================================
   STICKY HEADER
========================================================== */

function initStickyHeader(){

    const header = document.querySelector(".site-header");

    if(!header) return;

    window.addEventListener("scroll", () => {

        if(window.scrollY > 60){

            header.classList.add("scrolled");

        }else{

            header.classList.remove("scrolled");

        }

    });

}


/* ==========================================================
   MOBILE MENU
========================================================== */

function initMobileMenu(){

    const toggle = document.querySelector(".mobile-toggle");
    const nav = document.querySelector(".site-nav");

    if(!toggle || !nav) return;

    toggle.addEventListener("click", () => {

        nav.classList.toggle("active");

        const expanded =
            toggle.getAttribute("aria-expanded") === "true";

        toggle.setAttribute(
            "aria-expanded",
            !expanded
        );

    });

    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* ==========================================================
   SMOOTH SCROLL
========================================================== */

function initSmoothScrolling(){

    document.querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener("click", function(e){

                const target =
                    document.querySelector(
                        this.getAttribute("href")
                    );

                if(!target) return;

                e.preventDefault();

                target.scrollIntoView({

                    behavior:"smooth",
                    block:"start"

                });

            });

        });

}


/* ==========================================================
   ACTIVE NAVIGATION
========================================================== */

function initActiveNavigation(){

    const current =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".site-nav a")
        .forEach(link => {

            const href = link.getAttribute("href");

            if(href === current){

                link.classList.add("active");

            }

        });

}


/* ==========================================================
   SCROLL REVEAL
========================================================== */

function initScrollAnimations(){

    const items = document.querySelectorAll(

        ".food-card,\
         .feature,\
         .service-card,\
         .review-card,\
         .journey-step,\
         .about-image,\
         .about-content,\
         .section-heading"

    );

    if(items.length === 0) return;

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if(entry.isIntersecting){

                    entry.target.classList.add("fade-up");

                    observer.unobserve(entry.target);

                }

            });

        },

        {

            threshold:0.15

        }

    );

    items.forEach(item => {

        observer.observe(item);

    });

}


/* ==========================================================
   FAQ ACCORDION
========================================================== */

function initFaqAccordion(){

    const items = document.querySelectorAll(".faq-item");

    if(items.length === 0) return;

    items.forEach(item => {

        const question = item.querySelector(".faq-question");

        if(!question) return;

        question.addEventListener("click", () => {

            const isActive = item.classList.contains("active");

            items.forEach(other => {

                other.classList.remove("active");

            });

            if(!isActive){

                item.classList.add("active");

            }

        });

    });

}


/* ==========================================================
   FUTURE MODULES
========================================================== */

// Contact form validation
// Booking enquiry tracking
// Gallery lightbox
// Testimonial slider
// Menu filtering
// Event calendar
// Cookie consent
// Analytics
// Dark mode (optional)
