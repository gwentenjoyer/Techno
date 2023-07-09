console.log("user.js");

let cartBtn = document.querySelector(".cart");

cartBtn.addEventListener("click", function() {
    showModal("modal-cart");
})

const delBtn = document.querySelectorAll(".cart-item > .cart-item-delete > img");
delBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        console.log("clicked");
    })
})

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

const totalPriceElement = document.querySelector("#total-price");
const cartContainer = document.querySelector("#modal-cart > .modal_body > .cart-content");

async function addToCart(id) {
    const selectedProduct = await grabSingleProduct(id);

    if (selectedProduct.availability === "Немає в наявності") {
        alert("На жаль, цього товару немає в наявності")
    } else {
        const currentPrice = Math.ceil(selectedProduct.price-selectedProduct.price*selectedProduct.discount/100);

        const newCartRow = document.createElement("div");
        newCartRow.classList.add("cart-item","bg-light");
        newCartRow.innerHTML = `
            <div class="cart-item-image">
                <img src="${selectedProduct.cloudinaryPublicUrl}" alt="">
            </div>
            <div class="cart-item-product fw-bold">${selectedProduct.product}</div>
            <div class="cart-item-description">
                <table>
                    <tr style="border-bottom: 2px solid black;">
                        <td>Бренд:</td><td>${selectedProduct.producer}</td>
                    </tr>
                    <tr>
                        <td>Модель:</td><td>${selectedProduct.model}</td>
                    </tr>
                </table>
            </div>
            <div class="cart-item-price">
                <table>
                    <tr>
                        <td>Ціна:</td><td>${currentPrice} ₴</td>
                    </tr>
                </table>
            </div>
            <div class="cart-item-delete">
                <img src="img/icons/cross.png" alt="">
            </div>
        `;

        cartContainer.appendChild(newCartRow);

        const deleteButton = newCartRow.querySelector(".cart-item-delete > img");
        deleteButton.addEventListener("click", () => {
            cartContainer.removeChild(newCartRow);
            updateTotalPrice();
        });

        updateTotalPrice();
    }
}

function updateTotalPrice() {
    const cartItems = document.querySelectorAll(".cart-item");
    let totalPrice = 0;

    cartItems.forEach((cartItem) => {
        const priceElement = cartItem.querySelector(".cart-item-price td:last-child");
        const price = parseInt(priceElement.textContent);
        totalPrice += price;
    });

    const totalPriceElement = document.querySelector("#total-price");
    totalPriceElement.innerHTML = totalPrice;
}

const orderBtn = document.querySelector(".order_btn");
const cancelBtn = document.querySelector(".cancel_btn");

orderBtn.addEventListener("click", () => {
    totalPriceElement.innerHTML = "0";
    const isEmpty = cartContainer.innerHTML === "";
    cartContainer.innerHTML = "";
    hideModal();
    if (isEmpty)
        alert("Наразі корзина порожня. Немає чого замовляти.")
    else
        alert("Товар успішно замовлено. Очікуйте повідомлення від найближчого відділення пошти.");
})
cancelBtn.addEventListener("click", () => {
    totalPriceElement.innerHTML = "0";
    cartContainer.innerHTML = "";
    hideModal();
})

function isUser(newProduct, product) {
    const cardsContainer = newProduct.getElementsByClassName("buttons")[0];
    cardsContainer.innerHTML = `
        <button class="addtocart_btn" onclick="addToCart('${product._id}')">Добавити в корзину</button>
    `;
}