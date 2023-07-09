/* console.log("script.js"); */

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
                <div class="image_container">
                    <img src="${product.cloudinaryPublicUrl}" class="card-img-top p-4" alt="...">
                    <div class="details">
                        <span class="m-0 product_id text-secondary">${product._id}</span>
                        <span class="old_price"></span>
                        <span class="current_price"></span>
                        <span class="availability">${product.availability}</span>
                    </div>
                </div>
                <div class="card-body p-0">
                    <div class="product-title p-2">
                        <h6 class="card-title fw-bold">Блок живлення для ПК</h6>
                        <h6 class="card-brand fw-bold m-0" style="font-size: 14px;">${product.producer} ${product.model}</h6>
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

        if (typeof isAdministrator === 'function') {
            isAdministrator(newProduct, product);
        }
        else if (typeof isUser === 'function'){
            isUser(newProduct, product);
        }
        
        document.querySelector(".itembar").appendChild(newProduct);
    })
}

let modalOverlay = document.querySelector("#modal-overlay");
let modalWindows = document.querySelectorAll(".modal_window");

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
    document.forms["productForm"].reset();
    document.forms["loginForm"].reset();
    setTimeout(function() {
        modalOverlay.style.display = "none";
        modalWindows.forEach(function(modalWindow) {
            modalWindow.style.display = "none";
        });
        document.body.style.overflow = "auto";
    }, 100);
}