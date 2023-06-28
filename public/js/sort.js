function getArrayFromLS() {
    let howMuch = Object.keys(localStorage).length; //Визначаємо кількість об'єктів LocalStorage
    // Оголошуємо об'єкт у який будемо збирати дані з LS
    let object = {};
    // Оголошуємо масив у який будемо об'єкти
    let products = [];
    //Вибираємо дані з LS, формуємо об'єкти та передаємо його в масив
    for (let i = 0; i < howMuch; i++) {
        let id = localStorage.key(i);
        let row = JSON.parse(localStorage.getItem(id));
        object = {};                // !!! Очищуємо об'єкт на початку кожної ітерації
        object.id = id;
        object.brand = row.brand;
        object.model = row.model;
        object.power = row.power;
        object.pictname = row.pictname;
        object.cables = row.cables;
        object.fan = row.fan;
        object.efficiency = row.efficiency;
        object.availability = row.availability;
        object.price = row.price;
        object.discount = row.discount;
        products.push(object);
    }
    return products;
}


function sortElements(option){
    /* console.log(option); */

    let products = getArrayFromLS();
    console.log(products);

    function byFieldAsc(field) {
        return (a, b) => +a[field] > +b[field] ? 1 : -1;
    }
    function byFieldDesc(field) {
        return (a, b) => +a[field] < +b[field] ? 1 : -1;
    }

    switch (option) {
        case "new_products":
            products.sort(byFieldDesc("id"));
            break;
        case "expensive_products":
            products.sort(byFieldDesc("price"));
            break;
        case "cheap_products":
            products.sort(byFieldAsc("price"));
            break;
        case "more_powerful":
            products.sort(byFieldDesc("power"));
            break;
        case "less_powerful":
            products.sort(byFieldAsc("power"));
            break;
        case "promotional_products":
            products.sort(byFieldDesc("discount"));
            break;
        default:
            setTimeout(location.reload(), 1000);
            break;
    }

    document.querySelector(".itembar").innerHTML = "";

    for (let i = 0; i < products.length; i++) {
        let tempObj = products[i];
        displayProduct(tempObj.id, tempObj);
        console.log(tempObj);
    }
}

const dropdownItems = document.querySelectorAll(".dropdown-item");
const dropdownButton = document.querySelector("#btnSortDrop");

dropdownItems.forEach(item => {
    item.addEventListener("click", function(){
        const selectedText = item.textContent.trim();
        dropdownButton.textContent = selectedText;
        sortElements(item.getAttribute("id"));
    });
})