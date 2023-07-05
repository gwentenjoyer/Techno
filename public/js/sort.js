const dropdownItems = document.querySelectorAll(".dropdown-item");
const dropdownButton = document.querySelector("#btnSortDrop");

dropdownItems.forEach(item => {
    item.addEventListener("click", async (event) => {
        const selectedText = item.textContent.trim();
        dropdownButton.textContent = selectedText;
        const sortId = event.target.id;
        const result = await fetch(`/products/sort/${sortId}`, { method: "GET" })
        if (result) {
            const products = await result.json();
            displayProducts(products);
        } else {
            console.log("something went wrong while sorting...");
        }
    });
})