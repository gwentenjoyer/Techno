console.log("account.js");

let accountBtn = document.querySelector(".profile");

accountBtn.addEventListener("click", function() {
    showModal("modal-account");
})

let profile = document.querySelector('.profile');
let profileImg = document.querySelector('.profile>figure>img');
let text = document.querySelector(".profile>figure>figcaption");

profile.addEventListener("mouseenter", () => {
    profileImg.setAttribute("src", "../img/icons/admin.png");
})

profile.addEventListener('mouseleave', () => {
    const computedStyle = getComputedStyle(text);
    const textColor = computedStyle.color;
    if (textColor === "rgb(0, 0, 0)") {
        profileImg.setAttribute("src", "../img/icons/admin.png");
    } else if (textColor === "rgb(255, 255, 255)") {
        profileImg.setAttribute("src", "../img/icons/admin_light.png");
    }
});

const upperHeader = document.querySelector("header > .upper_header");
upperHeader.classList.remove("d-none");