/* ==========================================================
   FLAVA BASE
   EXPERIENCE PAGE
   experience.js
   Part 1
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initialiseRatings();

});

/* ==========================================================
   CREATE STAR RATINGS
========================================================== */

function initialiseRatings() {

    const ratingGroups = document.querySelectorAll(".star-rating");

    ratingGroups.forEach(group => {

        const ratingName = group.dataset.rating;

        for (let i = 1; i <= 5; i++) {

            const star = document.createElement("span");

            star.classList.add("star");

            star.innerHTML = "★";

            star.dataset.value = i;

            /* Hover */

            star.addEventListener("mouseenter", () => {

                highlightStars(group, i);

            });

            /* Click */

            star.addEventListener("click", () => {

                saveRating(group, ratingName, i);

            });

            group.appendChild(star);

        }

        /* Mouse leaves */

        group.addEventListener("mouseleave", () => {

            restoreRating(group);

        });

    });

}

/* ==========================================================
   HOVER EFFECT
========================================================== */

function highlightStars(group, rating) {

    const stars = group.querySelectorAll(".star");

    stars.forEach((star, index) => {

        if (index < rating) {

            star.classList.add("active");

        } else {

            star.classList.remove("active");

        }

    });

}

/* ==========================================================
   SAVE RATING
========================================================== */

function saveRating(group, name, rating) {

    group.dataset.selected = rating;

    highlightStars(group, rating);

    const hiddenInput = document.getElementById(name + "Rating");

    if (hiddenInput) {

        hiddenInput.value = rating;

    }

}

/* ==========================================================
   RESTORE AFTER HOVER
========================================================== */

function restoreRating(group) {

    const selected = parseInt(group.dataset.selected || 0);

    const stars = group.querySelectorAll(".star");

    stars.forEach((star, index) => {

        if (index < selected) {

            star.classList.add("active");

        } else {

            star.classList.remove("active");

        }

    });

}

/* ==========================================================
   GET RATING VALUE
========================================================== */

function getRating(name) {

    const input = document.getElementById(name + "Rating");

    if (!input) return 0;

    return parseInt(input.value || 0);

}

/* ==========================================================
   SCROLL TO FORM
========================================================== */

function scrollToForm() {

    const form = document.getElementById("experience-form");

    if (!form) return;

    form.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

} /* ==========================================================
   FORM SUBMISSION
========================================================== */

const experienceForm = document.getElementById("flavaExperienceForm");

if (experienceForm) {

    experienceForm.addEventListener("submit", function (event) {

        const overall = getRating("overall");

        if (overall === 0) {

            event.preventDefault();

            alert("Please rate your overall experience before submitting.");

            scrollToForm();

            return;

        }

        showLoading();

    });

}

/* ==========================================================
   LOADING SCREEN
========================================================== */

function showLoading() {

    const button = document.querySelector(".btn-large");

    if (button) {

        button.disabled = true;

        button.innerHTML = "Sending your experience...";

    }

}

/* ==========================================================
   SUCCESS SCREEN
========================================================== */

function showSuccess() {

    const formSection = document.querySelector(".experience-form");

    if (formSection) {

        formSection.style.display = "none";

    }

    const success = document.createElement("div");

    success.className = "success-screen show";

    let message = `
        <h2>❤️ Thank You!</h2>

        <p>
        Thank you for taking the time to share
        your Flava Experience.
        </p>

        <p>
        Every review helps our family business grow.
        </p>
    `;

    if (getRating("overall") === 5) {

        message += `

        <a
            class="review-button"
            href="https://g.page/r/YOUR_GOOGLE_REVIEW_LINK"
            target="_blank">

            ⭐ Leave us a Google Review

        </a>

        `;

    }

    success.innerHTML = message;

    document.querySelector("#experience-form .container")
        .appendChild(success);

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

/* ==========================================================
   RESET FORM
========================================================== */

function resetExperienceForm(){

    if(!experienceForm) return;

    experienceForm.reset();

    document.querySelectorAll(".star-rating").forEach(group=>{

        group.dataset.selected = 0;

        restoreRating(group);

    });

}

/* ==========================================================
   FADE IN ON SCROLL
========================================================== */

const observer = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";

            entry.target.style.transform="translateY(0)";

        }

    });

},{
    threshold:0.15
});

document.querySelectorAll(

    ".experience-card, .intro-card, .promise-card"

).forEach(card=>{

    card.style.opacity="0";

    card.style.transform="translateY(40px)";

    card.style.transition="all .8s ease";

    observer.observe(card);

});

/* ==========================================================
   END OF FILE
========================================================== */
