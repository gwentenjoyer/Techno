/* Front methods of modal window */

let createBtn = document.querySelector(".create_btn");
let signBtn = document.querySelector("footer .sign_btn");
let accountBtn = document.querySelector(".profile");
let cartBtn = document.querySelector(".cart");

const loginContainer = document.getElementById("login-table");
const loginBtn = document.querySelector("#modal-login .modal_header #btnradio1");
const registerBtn = document.querySelector("#modal-login .modal_header #btnradio2");

signBtn.addEventListener("click", function() {
    document.querySelector("#modal-login .modal_footer > .buttons > .login_btn").style.display = "block";
    document.querySelector("#modal-login .modal_footer > .buttons > .register_btn").style.display = "none";
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
        <td class="width1-4"><label for="password" class="login-label">Введіть пароль:</label></td>
        <td colspan="3" class="width3-4"><input type="password" name="password" id="password" class="input_text login-input" placeholder=""></td>
    </tr>
    <tr>
        <td class="width1-4"><label for="register-password" class="login-label">Підтвердіть пароль:</label></td>
        <td colspan="3" class="width3-4"><input type="password" name="register-password" id="register-password" class="input_text login-input" placeholder=""></td>
    </tr>
    `;
    document.querySelector("#modal-login .modal_footer > .buttons > .login_btn").style.display = "none";
    document.querySelector("#modal-login .modal_footer > .buttons > .register_btn").style.display = "block";
})

let modalOverlay = document.querySelector("#modal-overlay");
let modalWindows = document.querySelectorAll(".modal_window");

createBtn.addEventListener("click", function() {
    document.querySelector("#modal-product .modal_footer > .buttons > .add_btn").style.display = "block";
    document.querySelector("#modal-product .modal_footer > .buttons > .edit_btn").style.display = "none";
    showModal("modal-product");
    document.querySelector("#modal-product #modal_title").innerHTML = "Добавити продукт";
});

modalOverlay.addEventListener("click", handleOverlayClick);

// Обробка кліку на хрестик у всіх модальних вікнах
document.querySelectorAll(".modal-cross").forEach(function(cross) {
    cross.addEventListener("click", hideModal);
});

function handleOverlayClick(event) {
    if (event.target.dataset.close) {
        hideModal();
    }
}

function showModal(modalId) {
    let modalWindow = document.querySelector(`#${modalId}`);

    setTimeout(function() {
        modalOverlay.style.display = "flex";
        modalWindow.style.display = "block";
        document.body.style.overflow = "hidden";
    }, 100);
}

function hideModal() {
    resetModal();

    setTimeout(function() {
        modalOverlay.style.display = "none";
        modalWindows.forEach(function(modalWindow) {
            modalWindow.style.display = "none";
        });
        document.body.style.overflow = "auto";
    }, 100);
}

function resetModal() {
    document.querySelector("#producer").value = "";
    document.querySelector("#model").value = "";
    document.querySelector("#power").value = "";
    prodImage.setAttribute("src", "");
    imagePath.value = "Файл не вибрано";
    document.querySelector("#cables").selectedIndex = 0;
    document.querySelector("#fan").value = "";
    document.querySelector("#efficiency").value = "";
    document.querySelector("#availability").selectedIndex = 0;
    document.querySelector("#price").value = "";
    document.querySelector("#discount").value = 0;
}

let discountToggle = document.querySelector(".modal_window tr #discount-checkbox-toggle");
let toggles = document.querySelectorAll(".modal_window tr .toggle");
discountToggle.addEventListener("change", function() {
    if (discountToggle.checked) {
        toggles.forEach(function(toggle) {
            toggle.classList.remove("toggle-hide");
            toggle.classList.add("toggle-show");
        });
    } else {
        toggles.forEach(function(toggle) {
            toggle.classList.remove("toggle-show");
            toggle.classList.add("toggle-hide");
        });
    }
})


let addBtn = document.querySelector(".add_btn");
addBtn.addEventListener("click", async function() {
    const formData = new FormData(document.querySelector("#product-form"));
    /* isValidProduct(formData); */
    /* console.log(...formData); */
    if (!isValidProduct(formData))
        alert("Дані продукту не є коректними. Заповніть всі поля та перевірте їх значення");
    else {
        const result = await fetch ('/products/add', {
            method: 'POST',
            body: formData
        })
        if (result.ok) {
            /* console.log("Successfully written."); */
            refreshProducts();
        } else {
            console.log("something went wrong while sending add_new data...");
        }
        hideModal();  
    }
});

function isValidProduct(formData) {
    const requiredFields = ['producer', 'model', 'power', 'fan', 'efficiency', 'price'];
    for (const field of requiredFields) {
        const value = formData.get(field);
        if (value.trim() === '')
            return false;
    }

    const producer = formData.get('producer');
    const model = formData.get('model');
    const power = formData.get('power');
    const fan = formData.get('fan');
    const efficiency = formData.get('efficiency');
    const price = formData.get('price');
    const discount = formData.get('discount');
    const file = formData.get('file');

    const brandOptions = document.querySelectorAll('#brand option');
    const validProducers = [...brandOptions].map(option => option.value);
    const isProducerValid = validProducers.includes(producer);
    /* console.log(isProducerValid); */

    const modelRegex = /^[a-zA-Z0-9\-]+$/;
    const isModelValid = modelRegex.test(model);
    /* console.log(isModelValid); */
    const isPowerValid = /^\d+$/.test(power) && Number(power) > 0 && Number(power) <= 3000;
    const fanDiameters = [90, 100, 110, 120, 130, 140];
    const isFanValid = /^\d+$/.test(fan) && Number(fan) > 0 && fanDiameters.includes(Number(fan));
    const isEfficiencyValid = /^\d+$/.test(efficiency) && Number(efficiency) > 0 && Number(efficiency) <= 100;
    const isPriceValid = /^\d+$/.test(price) && Number(price) > 0;
    const isDiscountValid = /^\d+$/.test(discount) && Number(discount) >= 0 && Number(discount) <= 50;
    /* console.log(isDiscountValid); */
    const isImageValid = file && file.type.includes('image/');
    /* console.log(isSquareImage); */
    if (isProducerValid && isModelValid && isPowerValid && isFanValid && isEfficiencyValid && isPriceValid && isDiscountValid && isImageValid)
        return true;
}

async function refreshProducts() {
    const receivedData = await fetch('/products/list', { method: 'GET' })
    if (receivedData.ok) {
        const jsonData = await receivedData.json();
        displayProducts(jsonData);
    }
    else
        console.log("something went wrong while receiving data from server...");
}
refreshProducts();


const itemContainer = document.querySelector(".itembar");

function displayProducts(products) {
    itemContainer.innerHTML = '';

    products.forEach(product => {
        const newProduct = document.createElement("div");
        newProduct.classList.add("item", "mx-1", "mt-2");
        newProduct.setAttribute("data-id", product._id);
        newProduct.innerHTML = `
            <div class="card col-1">
                <div class="image_container bg-light">
                    <img src="${product.cloudinaryPublicUrl}" class="card-img-top p-4" alt="...">
                    <div class="details">
                        <span class="m-0 product_id">${product._id}</span>
                        <span class="old_price"></span>
                        <span class="current_price"></span>
                        <span class="availability">${product.availability}</span>
                    </div>
                </div>
                <div class="card-body p-0">
                    <div class="product-title p-2">
                        <h6 class="card-title fw-bold">Блок живлення для ПК</h6>
                        <h6 class="fw-bold m-0" style="font-size: 14px;">${product.producer} (${product.model})</h6>
                    </div>
                    <div class="card-content p-0">
                        <ul class="property-list p-2">
                            <li>
                                <span class="property-name">Потужність:</span>
                                <span class="property-value">${product.power} Вт</span>
                            </li>
                            <li>
                                <span class="property-name">Підключення кабелів:</span>
                                <span class="property-value">${product.cables}</span>
                            </li>
                            <li>
                                <span class="property-name">Діаметр вентилятора:</span>
                                <span class="property-value">${product.fan} мм</span>
                            </li>
                            <li>
                                <span class="property-name">Ефективність:</span>
                                <span class="property-value">${product.efficiency} %</span>
                            </li>
                        </ul>
                    </div>
                    <div class="buttons d-flex justify-content-between p-2">
                        <button class="edit_btn" onclick="modifyModal('${product._id}')">Редагувати</button>
                        <button class="delete_btn" onclick="removeElementFromDB('${product._id}')">Видалити</button>
                    </div> 
                </div>
            </div>
        `;

        const oldPriceElement = newProduct.querySelector(".old_price");
        const currentPriceElement = newProduct.querySelector(".current_price");

        if (product.discount !== "" && product.discount > 0){
            oldPriceElement.innerHTML = `<del>${product.price}</del>`;
            currentPriceElement.style.color = "red";
            currentPriceElement.innerHTML = `${Math.ceil(product.price-product.price*product.discount/100)} ₴`;

            const detailsContainer = newProduct.querySelector(".image_container>.details");
            const newDiscount = document.createElement("span");
            newDiscount.classList.add("discount");
            newDiscount.innerHTML = `-${product.discount}%`;
            detailsContainer.prepend(newDiscount);
        } else {
            currentPriceElement.innerHTML = `${product.price} ₴`;
        }

        const priceElement = newProduct.querySelector(".availability");

        switch (product.availability) {
            case "Є в наявності":
                priceElement.classList.add("available");
                break;
            case "Обмежена кількість":
                priceElement.classList.add("limited");
                break;
            case "Немає в наявності":
                priceElement.classList.add("unavailable");
                currentPriceElement.style.color = "gray";
                break;
        }

        document.querySelector(".itembar").appendChild(newProduct);
    })
}

async function modifyModal(id) {
    const selectedProduct = await grabSingleProduct(id);

    document.querySelector("#producer").value = selectedProduct.producer;   
    document.querySelector("#model").value = selectedProduct.model;    
    document.querySelector("#power").value = selectedProduct.power;  
    prodImage.setAttribute("src", `${selectedProduct.cloudinaryPublicUrl}`);
    imagePath.value = selectedProduct.cloudinaryPublicUrl;
    document.querySelector("#cables").value = selectedProduct.cables;  
    document.querySelector("#fan").value = selectedProduct.fan;  
    document.querySelector("#efficiency").value = selectedProduct.efficiency;  
    document.querySelector("#availability").value = selectedProduct.availability;  
    document.querySelector("#price").value = selectedProduct.price; 
    document.querySelector("#discount").value = selectedProduct.discount;

    if (selectedProduct.discount > 0) {
        discountToggle.checked = true;
        toggles.forEach(function(toggle) {
            toggle.classList.remove("toggle-hide");
            toggle.classList.add("toggle-show");
        });
    } else {
        discountToggle.checked = false;
        toggles.forEach(function(toggle) {
            toggle.classList.remove("toggle-show");
            toggle.classList.add("toggle-hide");
        });
    }

    document.querySelector(".modal_footer>.buttons>.add_btn").style.display = "none";
    document.querySelector(".modal_footer>.buttons>.edit_btn").style.display = "block";
    showModal("modal-product");

    document.querySelector(".modal_footer>.buttons>.edit_btn").setAttribute("onclick", `updateElementInDB('${id}')`);
}

async function grabSingleProduct(id) {
    const result = await fetch(`/products/single/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (result) {
        const product = await result.json();
        // Обробка отриманого продукту
        return product;
    } else {
        console.log("Something went wrong while grabbing a single product...");
    }
}

async function updateElementInDB(id) {
    const formData = new FormData(document.querySelector("#product-form"));
    const result = await fetch(`/products/update/${id}`, {
        method: "PUT",
        body: formData
    })
    if (result.ok) {
        /* console.log("product was successfully updated"); */
        refreshProducts();
        hideModal();
    } else {
        console.log("something went wrong while updating the product...");
    }
}
            
async function removeElementFromDB(id) {
    const obj = JSON.stringify({ id: id });
    const result = await fetch("/products/delete", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: obj
    })
    if (result.ok) {
        /* console.log("product was successfully deleted"); */
        refreshProducts();
    } else 
        console.log("something went wrong while deleting the product...");
}


/* END */


/* Put chosen image into input type="image" */

let fileInput = document.querySelector("#file");
let prodImage = document.querySelector("#image");
let imagePath = document.querySelector("#image_path");

fileInput.onchange = evt => {
    const [file] = fileInput.files;
    if (file) {
        prodImage.src = URL.createObjectURL(file);
        const filename = fileInput.value.replace(/C:\\fakepath\\/, '');
        imagePath.value = `C:/fakepath/${filename}`;
    } else {
        prodImage.src = "";
        imagePath.value = "Файл не вибрано";
    }
}


/* END */