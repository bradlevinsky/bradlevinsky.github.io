// Function to toggle the menu bar visibility
function toggleMenu() {
    const menu = document.getElementById("menu");
    const isMenuVisible = menu.style.display === "block";

    menu.style.display = isMenuVisible ? "none" : "block";
}

// Function to load and adjust PDF viewer height dynamically
function loadPDF(pdfPath) {
    const pdfViewer = document.getElementById("pdfViewer");
    const footer = document.querySelector("footer");

    if (pdfViewer && footer) {
        pdfViewer.src = pdfPath;
        const footerHeight = footer.offsetHeight;
        const contentHeight = window.innerHeight - footerHeight;
        pdfViewer.style.height = `${contentHeight}px`;
    }
}

// Authentication function to validate username and password
function authenticate() {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("pwd");
    const username = usernameInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    if (["brad", "alex"].includes(username) && password === "creative") {
        document.querySelectorAll("#hidden_work").forEach(item => {
            item.style.display = "list-item";
        });
    } else {
        alert("Incorrect username or password.");
    }

    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        usernameInput.value = "";
        passwordInput.value = "";
    }
}

// Scroll-to-top functionality
const scrollTopBtn = document.getElementById("scrollTopBtn");

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

// Smooth scroll to the top of the page
function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}










