console.log("search.js");

const searchInput = document.querySelector('.search > #search');
const searchButton = document.querySelector('.icon_search');

searchInput.addEventListener("input", async () => {
    const searchValue = searchInput.value;
    const result = await fetch("/products/search", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ searchQuery: searchValue })
    })
    const products = await result.json();
    displayProducts(products)
})

searchButton.addEventListener("click", async () => {
    const searchValue = searchInput.value;
    const result = await fetch("/products/search", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ searchQuery: searchValue })
    })
    const products = await result.json();
    displayProducts(products)
})