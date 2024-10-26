// About Us Popup
const aboutUsPopup = document.getElementById("about-us-popup");
const aboutUsLink = document.getElementById("about-us");
const closeAboutPopupButton = document.getElementById("close-popup");

aboutUsLink.addEventListener("click", (event) => {
    event.preventDefault();
    aboutUsPopup.style.display = "flex";
    sessionStorage.setItem("aboutUsShown", "true");
});

closeAboutPopupButton.addEventListener("click", () => closePopup(aboutUsPopup, "aboutUsShown"));
window.addEventListener("click", (event) => {
    if (event.target === aboutUsPopup) closePopup(aboutUsPopup, "aboutUsShown");
});

if (sessionStorage.getItem("aboutUsShown") === "true") {
    aboutUsPopup.style.display = "flex";
}

// Contact Us Popup
const contactUsPopup = document.getElementById("contact-us-popup");
const contactUsLink = document.getElementById("contact-us");
const closeContactPopupButton = document.getElementById("close-contact-popup");

contactUsLink.addEventListener("click", (event) => {
    event.preventDefault();
    contactUsPopup.style.display = "flex";
    sessionStorage.setItem("contactUsShown", "true");
});

closeContactPopupButton.addEventListener("click", () => closePopup(contactUsPopup, "contactUsShown"));
window.addEventListener("click", (event) => {
    if (event.target === contactUsPopup) closePopup(contactUsPopup, "contactUsShown");
});

if (sessionStorage.getItem("contactUsShown") === "true") {
    contactUsPopup.style.display = "flex";
}


function closePopup(popupElement, storageKey) {
    popupElement.style.display = "none";
    sessionStorage.setItem(storageKey, "false");
}
