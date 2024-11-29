// This is my script page where I have some cool functions
// Below is the function that allows me to toggle the menu bar
// Originally, I had it so the menu would be the full side of the screen, but it didn’t look right, so I changed it
// I am not proficient with JavaScript, so if things look weird or inefficient, I apologize; my main goal was functionality

function toggleMenu() {
    const menu = document.getElementById("menu");
    const isMenuVisible = menu.style.display === "block";

    // Toggle the menu visibility
    menu.style.display = isMenuVisible ? "none" : "block";
}

// Below is the function that allows PDFs to be viewed on the same page and updates them
// if a different PDF link is selected
function loadPDF(pdfPath) {
    const pdfViewer = document.getElementById("pdfViewer");
    const footer = document.querySelector("footer");

    if (pdfViewer && footer) {
        pdfViewer.src = pdfPath;

        // Adjust the viewer height dynamically
        const footerHeight = footer.offsetHeight;
        const contentHeight = window.innerHeight - footerHeight;

        pdfViewer.style.height = `${contentHeight}px`;
    }
}

// Below is the username and password section
// It shows hidden items only if the correct username and password are entered
function authenticate() {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("pwd");
    const username = usernameInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    // Authentication logic
    if (["brad", "noir"].includes(username) && password === "info") {
        document.querySelectorAll("#hidden_work").forEach(item => {
            item.style.display = "list-item";
        });
    } else {
        alert("Incorrect username or password.");
    }

    // Clear input fields if the page is reloaded
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        usernameInput.value = "";
        passwordInput.value = "";
    }
}

// Scroll-to-top functionality
const scrollTopBtn = document.getElementById("scrollTopBtn");

// Display the button when the user scrolls down 20px from the top
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    const scrolled = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    if (scrolled > 20 && scrollableHeight > 50) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
}

// Smoothly scroll to the top when the user clicks the button
function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: "smooth", // Smooth scrolling
    });
}









