console.log("admin.js");

const createBtn = document.querySelector(".create_btn");

createBtn.addEventListener("click", function() {
    document.querySelector("#modal-product .modal_footer > .buttons > .add_btn").style.display = "block";
    document.querySelector("#modal-product .modal_footer > .buttons > .edit_btn").style.display = "none";
    showModal("modal-product");
    document.querySelector("#modal-product #modal_title").innerHTML = "Добавити продукт";
});

const logoutBlock = document.querySelector(".logout");
logoutBlock.addEventListener("click", async () => {
    await logout();
})

let addBtn = document.querySelector(".add_btn");
addBtn.addEventListener("click", async function() {
    const formData = new FormData(document.querySelector("#product-form"));
    /* console.log(...formData); */
    if (!isValidProduct(formData) || !isValidImage(formData))
        alert("Дані продукту не є коректними. Заповніть всі поля та перевірте їх значення");
    else {
        const result = await fetch ('/products/add', {
            method: 'POST',
            body: formData
        })
        if (result.ok) {
            /* console.log("Successfully written."); */
            refreshProducts();
            displayBrands();
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
        if (value.trim() === '') {
            return false;
        }
    }

    const producer = formData.get('producer');
    const model = formData.get('model');
    const power = formData.get('power');
    const fan = formData.get('fan');
    const efficiency = formData.get('efficiency');
    const price = formData.get('price');
    let discount = formData.get('discount');

    if (discount === '') {
        discount = 0;
    }

    const brandOptions = document.querySelectorAll('#brand option');
    const validProducers = [...brandOptions].map(option => option.value);
    const isProducerValid = validProducers.includes(producer);

    const modelRegex = /^[a-zA-Z0-9\-]+$/;
    const isModelValid = modelRegex.test(model);

    const isPowerValid = /^\d+$/.test(power) && Number(power) > 0 && Number(power) <= 3000;

    const fanOptions = document.querySelectorAll('#fan-diameters option');
    const validFanDiameters = [...fanOptions].map(option => option.value);
    const isFanValid = /^\d+$/.test(fan.toString()) && Number(fan) > 0 && validFanDiameters.includes(fan.toString());

    const isEfficiencyValid = /^\d+$/.test(efficiency) && Number(efficiency) > 0 && Number(efficiency) <= 100;

    const isPriceValid = /^\d+$/.test(price) && Number(price) > 0;

    const isDiscountValid = /^\d+$/.test(discount) && Number(discount) >= 0 && Number(discount) <= 50;
    
    if (isProducerValid && isModelValid && isPowerValid && isFanValid && isEfficiencyValid && isPriceValid && isDiscountValid)
        return true;
    return false;
}

function isValidImage(formData) {
    const file = formData.get('file');
    const isImageValid = file && file.type.includes('image/');
    if (isImageValid)
        return true;
    return false;
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
        return product;
    } else {
        console.log("Something went wrong while grabbing a single product...");
    }
}

async function updateElementInDB(id) {
    const formData = new FormData(document.querySelector("#product-form"));
    if (!isValidProduct(formData))
        alert("Дані продукту не є коректними. Заповніть всі поля та перевірте їх значення");
    else {
        const result = await fetch(`/products/update/${id}`, {
            method: "PUT",
            body: formData
        })
        if (result.ok) {
            /* console.log("product was successfully updated"); */
            refreshProducts();
            displayBrands();
            hideModal();
        } else {
            console.log("something went wrong while updating the product...");
        }
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
        displayBrands();
    } else 
        console.log("something went wrong while deleting the product...");
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

function isAdministrator(newProduct, products) {
    const cardsContainer = newProduct.getElementsByClassName("buttons")[0];
    console.log("why, ", cardsContainer);
    cardsContainer.innerHTML = `
        <button class="edit_btn" onclick="modifyModal('${product._id}')">Редагувати</button>
        <button class="delete_btn" onclick="removeElementFromDB('${product._id}')">Видалити</button>
    `;
}