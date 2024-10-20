// THis is my script page where i have some cool functions
//BElow is the function that allows me to be able to toggel the menu bar oringially i had it so
//that the menu would be the full side of the screen but it didnt look right so i changed it to this
//I am not proficienct with java script so if things look weird or they are in efficient
//i apoligise for that my main goal was to have something that worked
function toggleMenu() {
    var menu = document.getElementById("menu");
    var content = document.querySelector(".content");

    if (menu.style.display === "block") {
        menu.style.display = "none";
        content.style.marginLeft = "0";
    } else {
        menu.style.display = "block";
        content.style.marginLeft = "0px";
    }
}

//Below is the function that allows the pdfs to be viewed on the same page and to change them
//if ia different pdf link is selected
function loadPDF(pdfPath) {
    var pdfViewer = document.getElementById('pdfViewer');
    pdfViewer.src = pdfPath;

    var fixedFooterHeight = document.querySelector('footer').offsetHeight;
    var contentHeight = window.innerHeight - fixedFooterHeight;

    pdfViewer.style.height = contentHeight + 'px';
}

//Below is my username and password section it is what allows the image to be hidden
//and only shows the image if the correct username and password are entered
// i learnt about the alert feature that has a pop up and it seemed like a good idea.
function authenticate() {
    var usernameInput = document.getElementById("username");
    var passwordInput = document.getElementById("pwd");
    var username = usernameInput.value;
    var password = passwordInput.value;

    if ((username === "Brad" || username === "brad"|| username === "Noir"|| username === "noir") && password === "info") {

        var hiddenItems = document.querySelectorAll("#hidden_work");
        hiddenItems.forEach(function(item) {
            item.style.display = "list-item";
        });
    } else {
        alert("Incorrect username or password.");
    }

    if (performance.navigation.type === 1) {
        usernameInput.value = "";
        passwordInput.value = "";
    }
}

// Get the button
var scrollTopBtn = document.getElementById("scrollTopBtn");

// Show the button when the user scrolls down 20px from the top
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
}

// Scroll to the top of the document when the user clicks the button
function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling
    });
}








