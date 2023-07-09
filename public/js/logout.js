console.log("logout.js");

const logoutBtn = document.querySelectorAll(".logout_btn");
logoutBtn.forEach(btn => {
    btn.addEventListener("click", async () => {
        await logout();
    })
})

async function logout() {
    const result = await fetch("/auth/logout", {
        method: "POST"
    });
    if (result.ok) {
        console.log("Logout");
        window.location.href = '/';
    }
}