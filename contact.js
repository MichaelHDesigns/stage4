document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Serialize form data
        const formData = new FormData(contactForm);

        // Send form data to Formspree using AJAX
        fetch("https://formspree.io/f/xleyopwj", {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json",
            },
        })
        .then((response) => {
            if (response.status === 200) {
                // Handle successful submission
                alert("Thank you for your message! We'll get back to you soon.");

                // Reset the form fields
                contactForm.reset();
            } else {
                // Handle submission error
                alert("Oops! Something went wrong. Please try again later.");
            }
        })
        .catch((error) => {
            // Handle network or other errors
            alert("An error occurred. Please try again later.");
            console.error(error);
        });
    });
});