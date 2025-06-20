// Toggle the menu bar visibility
function toggleMenu() {
    const menu = document.getElementById("menu");
    const isMenuVisible = menu.style.display === "block";
    menu.style.display = isMenuVisible ? "none" : "block";
}

// Adjust PDF viewer height dynamically (if used)
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

// Hardcoded login validation with redirect
function authenticate() {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("pwd");
    const username = usernameInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    // Clear any fake session
    sessionStorage.removeItem('loggedIn');

    if (username === "chris" && password === "Ambedkar") {
        // Simulate login session
        sessionStorage.setItem('loggedIn', 'true');
        window.location.href = "profile.html";
    } else {
        alert("Incorrect username or password.");
    }
}


// Scroll-to-top button functionality
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    const scrolled = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    if (scrollTopBtn && scrolled > 20 && scrollableHeight > 50) {
        scrollTopBtn.style.display = "block";
    } else if (scrollTopBtn) {
        scrollTopBtn.style.display = "none";
    }
}

// Smooth scroll to the top
function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}






