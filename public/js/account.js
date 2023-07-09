console.log("account.js");

let accountBtn = document.querySelector(".profile");

accountBtn.addEventListener("click", async () => {
    let nickname = document.querySelector(".profile>figure>figcaption").innerHTML;
    const result = await fetch(`/user/single/${nickname.trim()}`, {
        method: "GET",
        headers: { 'Content-Type' : 'application/json'}
    })
    if (result.ok) {
        const profileData = await result.json();
        console.log("Data received");
        console.log(profileData);
        setupProfile(profileData);
        
    } else {
        console.log("something went wrong while trying to get prodile data");
    }
    showModal("modal-account");
})

let profile = document.querySelector('.profile');
let profileImg = document.querySelector('.profile>figure>img');
let text = document.querySelector(".profile>figure>figcaption");

function setupProfile(profileData) {
    const nicknameField = document.querySelector("#user-nickname");
    const emailField = document.querySelector("#user-email");
    const statusField = document.querySelector("#user-status");
    const profileImage = document.querySelector("#modal-account .profile-image")

    nicknameField.innerHTML = profileData.user_nickname;
    emailField.innerHTML = profileData.user_email;
    if (profileData.isAdmin) {
        statusField.innerHTML = "Адміністратор";
        profileImage.setAttribute("src", "img/icons/admin_light.png")
    } else {
        statusField.innerHTML = "Користувач";
        profileImage.setAttribute("src", "img/icons/user_light.png")
    }
}

/* profile.addEventListener("mouseenter", () => {
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
}); */

const upperHeader = document.querySelector("header > .upper_header");
upperHeader.classList.remove("d-none");