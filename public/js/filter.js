const powers = [
    {id:"less450Vt", title:"Менше 450 Вт", 'data-min-power':0, 'data-max-power':450},
    {id:"between450n550Vt", title:"450 Вт - 550 Вт", 'data-min-power':450, 'data-max-power':550},
    {id:"between550n650Vt", title:"550 Вт - 650 Вт", 'data-min-power':550, 'data-max-power':650},
    {id:"between650n750Vt", title:"650 Вт - 750 Вт", 'data-min-power':650, 'data-max-power':750},
    {id:"between750n850Vt", title:"750 Вт - 850 Вт", 'data-min-power':750, 'data-max-power':850},
    {id:"between850n950Vt", title:"850 Вт - 950 Вт", 'data-min-power':850, 'data-max-power':950},
    {id:"between950n1050Vt", title:"950 Вт - 1050 Вт", 'data-min-power':950, 'data-max-power':1050},
    {id:"between1050n1150Vt", title:"1050 Вт - 1150 Вт", 'data-min-power':1050, 'data-max-power':1150},
    {id:"between1150n1250Vt", title:"1150 Вт - 1250 Вт", 'data-min-power':1150, 'data-max-power':1250},
    {id:"more1250Vt", title:"Більше 1250 Вт", 'data-min-power':1250, 'data-max-power':3000}
];

const cablesConnections = [
    {id:"modular", title:"Модульне", 'data-cable-connection': "Модульне"},
    {id:"partially_modular", title:"Частково модульне", 'data-cable-connection': "Частково модульне"},
    {id:"not_modular", title:"Не модульне", 'data-cable-connection': "Не модульне"}
];

const fanDiameters = [
    {id:"fan_diameter90", title:"90 мм", 'data-fan-diameter':90},
    {id:"fan_diameter100", title:"100 мм", 'data-fan-diameter':100},
    {id:"fan_diameter110", title:"110 мм", 'data-fan-diameter':110},
    {id:"fan_diameter120", title:"120 мм", 'data-fan-diameter':120},
    {id:"fan_diameter130", title:"130 мм", 'data-fan-diameter':130},
    {id:"fan_diameter140", title:"140 мм", 'data-fan-diameter':140}
];

let brandPanelBody = document.querySelector("#panelsStayOpen-collapseOne>.accordion-body");
let powerPanelBody = document.querySelector("#panelsStayOpen-collapseTwo>.accordion-body");
let cablesPanelBody = document.querySelector("#panelsStayOpen-collapseThree>.accordion-body");
let fanPanelBody = document.querySelector("#panelsStayOpen-collapseFour>.accordion-body");

function fillOptions(options, accordion_body) {
    accordion_body.innerHTML = "";
    options.forEach(option => {
        const newOption = document.createElement("div");
        newOption.classList.add("checkbox","w-100");
        newOption.innerHTML = `
            <input class="form-check-input" type="checkbox" id="${option.id}">
            <label class="form-check-label ms-2 text-dark" for="${option.id}">
                ${option.title}
            </label>
        `;

        const checkboxInput = newOption.querySelector('input[type=checkbox]');
        if ('data-brand' in option) {
            checkboxInput.setAttribute('data-brand', option['data-brand']);
        } 
        else if ('data-min-power' in option && 'data-max-power' in option) {
            checkboxInput.setAttribute('data-min-power', option['data-min-power']);
            checkboxInput.setAttribute('data-max-power', option['data-max-power']);
        }
        else if ('data-cable-connection' in option) {
            checkboxInput.setAttribute('data-cable-connection', option['data-cable-connection']);
        }
        else if ('data-fan-diameter' in option) {
            checkboxInput.setAttribute('data-fan-diameter', option['data-fan-diameter']);
        }

        accordion_body.appendChild(newOption);
    })
}

/* function fillOptions(options, accordion_body, idKey, titleKey) {
    accordion_body.innerHTML = "";
    options.forEach(option => {
        const newOption = document.createElement("div");
        newOption.classList.add("checkbox", "w-100");
        newOption.innerHTML = `
            <input class="form-check-input" type="checkbox" value="" id="${option[idKey]}">
            <label class="form-check-label ms-2 text-dark" for="${option[idKey]}">
                ${option[titleKey]}
            </label>
        `;
        accordion_body.appendChild(newOption);
    })
}
 */

function getBrands() {
    const brands = [...new Set(Object.values(localStorage).map(item => JSON.parse(item).brand).sort())];
    const uniqueBrands = brands.map(brand => {
        return {
        id: brand.toLowerCase(),
        title: brand,
        'data-brand': brand
        };
    });
    return uniqueBrands;
}

const brands = getBrands();
/* console.log(brands); */
fillOptions(brands, brandPanelBody);

fillOptions(powers, powerPanelBody);
fillOptions(cablesConnections, cablesPanelBody);
fillOptions(fanDiameters, fanPanelBody);

function refreshBrands() {
    const brandPanelBody = document.querySelector("#panelsStayOpen-collapseOne > .accordion-body");
    const brands = getBrands();
    fillOptions(brands, brandPanelBody);
}


addBtn.addEventListener("click", refreshBrands);

let editBtn = document.querySelector(".modal_footer>.buttons>.edit_btn");
editBtn.addEventListener("click",function(){
    const brands = getBrands();
    console.log(brands);
} );

let deleteBtn = document.querySelectorAll(".card .delete_btn");
deleteBtn.forEach(function(btn) {
    btn.addEventListener("click", refreshBrands);
});

let selectedFilters = [];

/* const checkboxes = document.querySelectorAll(".checkbox > .form-check-input");
checkboxes.forEach(item => {
    item.addEventListener("change", event => {
        const dataAttributes = item.getAttributeNames().filter(attr => attr.startsWith('data-'));
        if (event.target.checked) {
            dataAttributes.forEach(attr => {
                const value = item.getAttribute(attr);
                selectedFilters.push({ attribute: attr, value: value });
            });
            console.log(selectedFilters);
        } else {
            dataAttributes.forEach(attr => {
                const value = item.getAttribute(attr);
                const index = selectedFilters.findIndex(filter => filter.attribute === attr && filter.value === value);
                if (index !== -1) {
                    selectedFilters.splice(index, 1);
                }
            });
            console.log(selectedFilters);
        }
        filterAndDisplayProducts();
    });
}); */

/* function filterAndDisplayProducts() {
    const products = Object.values(localStorage).map(item => JSON.parse(item));
    console.log(products);
    document.querySelector(".itembar").innerHTML = "";
    if (selectedFilters.length > 0) {
        const filteredProducts = products.filter(product => {
            return selectedFilters.some(filter => {
              const { attribute, value } = filter;
              console.log(attribute,"-",value);
              if (attribute === 'data-brand' && product.brand === value) {
                return true;
              } else if (attribute === 'data-min-power' && product.power >= value) {
                return true;
              } else if (attribute === 'data-max-power' && product.power < value) {
                return true;
              } else if (attribute === 'data-cable-connection' && product.cables === value) {
                return true;
              } else if (attribute === 'data-fan-diameter' && product.fan === value) {
                return true;
              }
              return false;
            });
          });
          filteredProducts.forEach(product => {
            displayProduct(product.id, product);
          });
      } else {
        document.querySelector(".itembar").innerHTML = "";
        products.forEach(product => {
          displayProduct(product.id, product);
        });
    }
}  */

/* function filterAndDisplayProducts() {
    const products = Object.values(localStorage).map(item => JSON.parse(item));
    console.log(Object.keys(localStorage));
    console.log(products);
    document.querySelector(".itembar").innerHTML = "";
    if (selectedFilters.length > 0) {
        const filteredProducts = products.filter(product => {
            return selectedFilters.some(filter => {
              const { attribute, value } = filter;
              if (attribute === 'data-brand' && product.brand === value) {
                return true;
              } else if (attribute === 'data-min-power' && product.power >= value) {
                return true;
              } else if (attribute === 'data-max-power' && product.power < value) {
                return true;
              } else if (attribute === 'data-cable-connection' && product.cables === value) {
                return true;
              } else if (attribute === 'data-fan-diameter' && product.fan === value) {
                return true;
              }
              return false;
            });
        });
        filteredProducts.forEach((product) => {
            const id = Object.keys(localStorage).indexOf(product);
            console.log(id);
            displayProduct(Object.keys(localStorage)[id], product);
        });
    } else {
        document.querySelector(".itembar").innerHTML = "";
        products.forEach((product, index) => {
            const id = Object.keys(localStorage)[index]; 
            displayProduct(id, product);
        });
    }
} */