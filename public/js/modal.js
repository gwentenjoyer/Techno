/* Front methods of modal window */

let createBtn = document.querySelector(".create_btn");
let modalOverlay = document.querySelector("#modal-overlay");
let modalWindow = document.querySelector("#modal-product");

createBtn.addEventListener("click", function() {
    document.querySelector(".modal_footer>.buttons>.add_btn").style.display = "block";
    document.querySelector(".modal_footer>.buttons>.edit_btn").style.display = "none";
    showModal();
});

modalOverlay.addEventListener("click", handleOverlayClick);
document.querySelector(".modal-cross").addEventListener("click", hideModal);

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


function handleOverlayClick(event) {
    if (event.target.dataset.close) {
        hideModal();
    }
}

function showModal() {
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
        modalWindow.style.display = "none";
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

function modifyModal(id) {
    let selectedProduct = JSON.parse(localStorage.getItem(id));

    document.querySelector("#producer").value = selectedProduct.brand;   
    document.querySelector("#model").value = selectedProduct.model;    
    document.querySelector("#power").value = selectedProduct.power;  
    prodImage.setAttribute("src", `img/${selectedProduct.pictname}`);
    imagePath.value = selectedProduct.pictname;
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
    showModal();

    document.querySelector(".modal_footer>.buttons>.edit_btn").setAttribute("onclick", `editElementInLS(${id})`);
}

let addBtn = document.querySelector(".add_btn");
addBtn.addEventListener("click", function(){
    AddElementToLS();
});

/* END */


/* Put chosen image into input type="image" */

let fileInput = document.querySelector("#file");
let prodImage = document.querySelector("#image");
let imagePath = document.querySelector("#image_path");

function showPrewImg(){
    if (fileInput.files.length > 0){
        let filename = fileInput.value.replace(/C:\\fakepath\\/, ''); // Обрізаємо C:\fakepath\
        prodImage.setAttribute("src", `img/${filename}`);
        imagePath.value = `C:/fakepath/${filename}`;
    } else {
        prodImage.setAttribute("src", "");
        imagePath.value = "Файл не вибрано";
    }
}
fileInput.addEventListener("change", showPrewImg);

/* END */


/* Generates an unique id */

function generateUniqueId() {
    let id;
    do {
        id = Date.now();
    } while (localStorage.getItem(id));
    return id;
}

/* END */


/* Add new product into Local Storage */

/* function AddElementToLS() {
    let filename = fileInput.value.replace(/C:\\fakepath\\/, '');
    const newElement = {};
    newElement.brand =  document.querySelector("#producer").value;   
    newElement.model = document.querySelector("#model").value;    
    newElement.power = document.querySelector("#power").value;  
    newElement.pictname = filename;   
    newElement.cables = document.querySelector("#cables").value;  
    newElement.fan = document.querySelector("#fan").value;  
    newElement.efficiency = document.querySelector("#efficiency").value;  
    newElement.availability = document.querySelector("#availability").value;  
    newElement.price = document.querySelector("#price").value;  
    newElement.discount = document.querySelector("#discount").value;
    let rowSt = JSON.stringify(newElement);
    let id = generateUniqueId();
    localStorage.setItem(id, rowSt);
    hideModal();
    setTimeout(displayProduct(id, newElement), 1000) ;
} */


/* function editElementInLS(id) {
    let product = JSON.parse(localStorage.getItem(id));

    product.brand = document.querySelector("#producer").value;
    product.model = document.querySelector("#model").value;
    product.power = document.querySelector("#power").value;  
    if (fileInput.value)
        product.pictname = fileInput.value.replace(/C:\\fakepath\\/, '');
    product.cables = document.querySelector("#cables").value;  
    product.fan = document.querySelector("#fan").value;  
    product.efficiency = document.querySelector("#efficiency").value;  
    product.availability = document.querySelector("#availability").value;  
    product.price = document.querySelector("#price").value; 
    product.discount = document.querySelector("#discount").value;

    let rowSt = JSON.stringify(product);
    localStorage.setItem(`${id}`, rowSt);
    hideModal();
    setTimeout(refreshProducts(), 1000);
} */


/* function removeElementFromLS(id){
    if (confirm("Ви дійсно хочете видалити цей товар?")) {
        localStorage.removeItem(id);
        setTimeout(refreshProducts(), 1000);
    }
}  */

document.querySelector(".resetLS").addEventListener("click",function(){
    localStorage.clear();
    location.reload();
})

/* END */

function displayProduct(id, product) {
    const newProduct = document.createElement("div");
    newProduct.classList.add("item", "mx-1", "mt-2");
    newProduct.setAttribute("data-id", id);
    newProduct.innerHTML = `
        <div class="card col-1">
            <div class="image_container bg-light">
                <img src="img/${product.pictname}" class="card-img-top p-4" alt="...">
                <div class="details">
                    <span class="m-0 product_id">Product_${id}</span>
                    <span class="old_price"></span>
                    <span class="current_price"></span>
                    <span class="availability">${product.availability}</span>
                </div>
            </div>
            <div class="card-body p-0">
                <div class="product-title p-2">
                    <h6 class="card-title fw-bold">Блок живлення для ПК</h6>
                    <h6 class="fw-bold m-0" style="font-size: 14px;">${product.brand} (${product.model})</h6>
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
                    <button class="edit_btn" onclick="modifyModal(${id})">Редагувати</button>
                    <button class="delete_btn" onclick="removeElementFromLS(${id})">Видалити</button>
                </div> 
            </div>
        </div>
    `;

    const oldPriceElement = newProduct.querySelector(".old_price");
    const currentPriceElement = newProduct.querySelector(".current_price");

    if (product.discount > 0){
        oldPriceElement.innerHTML = `<del>${product.price}</del>`;
        currentPriceElement.style.color = "red";
        currentPriceElement.innerHTML = `${Math.ceil(product.price-product.price*product.discount/100)} ₴`;
        /*  */
        const detailsContainer = newProduct.querySelector(".image_container>.details");
        const newDiscount = document.createElement("span");
        newDiscount.classList.add("discount");
        newDiscount.innerHTML = `-${product.discount}%`;
        detailsContainer.prepend(newDiscount);
    } else {
        currentPriceElement.innerHTML = `${product.price} ₴`;
    }

    const priceElement = newProduct.querySelector(".availability");
    /* console.log(product.availability); */

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
}

refreshProducts();

function refreshProducts() {
    document.querySelector(".itembar").innerHTML = "";
    let keyNumbers = Object.keys(localStorage).length //Визначаємо кількість об'єктів LocalStorage

    for (let k = 0; k < keyNumbers; k++) {
        let id = localStorage.key(k);
        let value = JSON.parse(localStorage.getItem(id));
        displayProduct(id, value);
    }
}