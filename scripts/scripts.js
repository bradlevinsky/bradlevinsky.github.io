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