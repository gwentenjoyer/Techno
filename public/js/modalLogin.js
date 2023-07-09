console.log("modalLogin.js");

let signBtn = document.querySelector(".sign_btn");

const loginContainer = document.getElementById("login-table");
const loginBtn = document.querySelector("#modal-login .modal_header #btnradio1");
const registerBtn = document.querySelector("#modal-login .modal_header #btnradio2");

const loginConfirmBtn = document.querySelector("#modal-login .modal_footer > .buttons > .login_btn");
const registerConfirmBtn = document.querySelector("#modal-login .modal_footer > .buttons > .register_btn");

signBtn.addEventListener("click", function() {
    loginConfirmBtn.style.display = "block";
    registerConfirmBtn.style.display = "none";
    document.forms["loginForm"].reset();
    showModal("modal-login");
})

loginBtn.addEventListener("click", function() {
    loginContainer.innerHTML = `
    <tr>
        <td class="width1-4"><label for="login-email" class="login-label">Введіть email:</label></td>
        <td colspan="3" class="width3-4"><input type="email" name="login-email" id="login-email" class="input_text login-input" placeholder="example@gmail.com"></td>
    </tr>
    <tr>
        <td class="width1-4"><label for="login-password" class="login-label">Введіть пароль:</label></td>
        <td colspan="3" class="width3-4"><input type="password" name="login-password" id="login-password" class="input_text login-input" placeholder=""></td>
    </tr>
    `;
    document.querySelector("#modal-login .modal_footer > .buttons > .login_btn").style.display = "block";
    document.querySelector("#modal-login .modal_footer > .buttons > .register_btn").style.display = "none";
})

registerBtn.addEventListener("click", function() {
    loginContainer.innerHTML = `
    <tr>
        <td class="width1-4"><label for="register-nickname" class="login-label">Введіть псевдонім:</label></td>
        <td colspan="3" class="width3-4"><input type="text" name="register-nickname" id="register-nickname" class="input_text login-input" placeholder="DrJunior"></td>
    </tr>
    <tr>
        <td class="width1-4"><label for="register-email" class="login-label">Введіть email:</label></td>
        <td colspan="3" class="width3-4"><input type="email" name="register-email" id="register-email" class="input_text login-input" placeholder="example@gmail.com"></td>
    </tr>
    <tr>
        <td class="width1-4"><label for="register-password" class="login-label">Введіть пароль:</label></td>
        <td colspan="3" class="width3-4"><input type="password" name="register-password" id="register-password" class="input_text login-input" placeholder=""></td>
    </tr>
    <tr>
        <td class="width1-4"><label for="register-password-confirm" class="login-label">Підтвердіть пароль:</label></td>
        <td colspan="3" class="width3-4"><input type="password" name="register-password-confirm" id="register-password-confirm" class="input_text login-input" placeholder=""></td>
    </tr>
    `;
    document.querySelector("#modal-login .modal_footer > .buttons > .login_btn").style.display = "none";
    document.querySelector("#modal-login .modal_footer > .buttons > .register_btn").style.display = "block";
})

const emailPattern = new RegExp("^[a-z_0-9]+@[a-z]+\\.[a-z]+$");
const passwordPattern = new RegExp("^[A-Za-z0-9-]+$");
const nicknamePattern = new RegExp("^[A-Za-z_0-9]+$")

function isValidLogin(formData){
    const email = formData.get("login-email");
    const password = formData.get("login-password");
    if (email === '' || password === '')
        return false;
    return emailPattern.test(email) && passwordPattern.test(password);
}

function isValidRegister(formData){
    const nickname = formData.get("register-nickname");
    const email = formData.get("register-email");
    const password1 = formData.get("register-password");
    const password2 = formData.get("register-password-confirm");
    if (nickname === '' || email === '' || password1 === '' || password2 === '')
        return false;
    return nicknamePattern.test(nickname) && emailPattern.test(email) && passwordPattern.test(password1) && password1 === password2;
}

loginConfirmBtn.addEventListener("click", async () => {
    const formData = new FormData(document.querySelector("#login-form"));
    /* console.log(...formData); */
    if (!isValidLogin(formData))
        alert("Некоректні дані. Заповніть всі поля та перевірте їх значення")
    else {
        let loginData = {
            "email": formData.get("login-email"),
            "password": formData.get("login-password")
        }
        const result = await fetch("/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*'
            },
            body: JSON.stringify(loginData)
        });
        if (result.ok) {
            console.log("it works");
            window.location.href = '/';
            hideModal();
        } else {
            console.log("something went wrong while trying to login");
        }
    }
})

registerConfirmBtn.addEventListener("click", async () => {
    const formData = new FormData(document.querySelector("#login-form"));
    /* console.log(...formData); */
    if (!isValidRegister(formData))
        alert("Некоректні дані. Заповніть всі поля та перевірте їх значення")
    else {
        let registerData = {
            "nickname": formData.get("register-nickname"),
            "email": formData.get("register-email"),
            "password": formData.get("register-password")
        }
        const result = await fetch("/auth/signup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*'
            },
            body: JSON.stringify(registerData)
        });
        if (result.ok) {
            console.log("it works");
            window.location.href = '/';
            hideModal();
        } else {
            console.log("something went wrong while trying to register");
        }
    }
})