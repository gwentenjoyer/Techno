console.log("filter.js");

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

const efficiencies = [
    {id:"less25Perc", title:"Менше 25 %", 'data-min-eff':0, 'data-max-eff':25},
    {id:"between25n35Perc", title:"25 % - 35 %", 'data-min-eff':25, 'data-max-eff':35},
    {id:"between35n45Perc", title:"35 % - 45 %", 'data-min-eff':35, 'data-max-eff':45},
    {id:"between45n55Perc", title:"45 % - 55 %", 'data-min-eff':45, 'data-max-eff':55},
    {id:"between55n65Perc", title:"55 % - 65 %", 'data-min-eff':55, 'data-max-eff':65},
    {id:"between65n75Perc", title:"65 % - 75 %", 'data-min-eff':65, 'data-max-eff':75},
    {id:"between75n85Perc", title:"75 % - 85 %", 'data-min-eff':75, 'data-max-eff':85},
    {id:"between85n95Perc", title:"85 % - 95 %", 'data-min-eff':85, 'data-max-eff':95},
    {id:"more95Perc", title:"Більше 95 %", 'data-min-eff':95, 'data-max-eff':100},
];

const availabilities = [
    {id:"available", title:"Є в наявності", 'data-availability': "Є в наявності"},
    {id:"limited", title:"Обмежена кількість", 'data-availability': "Обмежена кількість"},
    {id:"unavailable", title:"Немає в наявності", 'data-availability': "Немає в наявності"},
];

const brandPanelBody = document.querySelector("#panelsStayOpen-collapseOne>.accordion-body");
const powerPanelBody = document.querySelector("#panelsStayOpen-collapseTwo>.accordion-body");
const cablesPanelBody = document.querySelector("#panelsStayOpen-collapseThree>.accordion-body");
const fanPanelBody = document.querySelector("#panelsStayOpen-collapseFour>.accordion-body");
const efficiencyPanelBody = document.querySelector("#panelsStayOpen-collapseFive>.accordion-body");
const availabilityPanelBody = document.querySelector("#panelsStayOpen-collapseSix>.accordion-body");

function fillOptions(options, accordion_body, nameAttribute) {
    accordion_body.innerHTML = "";
    options.forEach(option => {
        const newOption = document.createElement("div");
        newOption.classList.add("checkbox", "w-100");
        newOption.innerHTML = `
            <input class="form-check-input" type="checkbox" id="${option.id}" name="${nameAttribute}">
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
        else if ('data-min-eff' in option && 'data-max-eff' in option) {
            checkboxInput.setAttribute('data-min-eff', option['data-min-eff']);
            checkboxInput.setAttribute('data-max-eff', option['data-max-eff']);
        }
        else if ('data-availability' in option) {
            checkboxInput.setAttribute('data-availability', option['data-availability']);
        }
        accordion_body.appendChild(newOption);
    });
  }
  

async function getBrandsFromDB() {
    try {
        const response = await fetch('/products/brands', { method: "GET" });
        const brands = await response.json();
        return brands;
    } catch (err) {
        console.error(err);
    }
}

async function displayBrands() {
    const brands = await getBrandsFromDB();
    fillOptions(brands, brandPanelBody, 'brand');
    addBrandCheckboxListeners();
}

displayBrands();
fillOptions(powers, powerPanelBody, 'power');
fillOptions(cablesConnections, cablesPanelBody, 'cable-connection');
fillOptions(fanDiameters, fanPanelBody, 'fan-diameter');
fillOptions(efficiencies, efficiencyPanelBody, 'efficiency');
fillOptions(availabilities, availabilityPanelBody, 'availability');

//Фільтрування брендів

function addBrandCheckboxListeners() {
    const brandCheckboxes = document.querySelectorAll('input[type="checkbox"][name="brand"]');
    brandCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            fetchBrands();
        });
    });
}


function getSelectedBrands(checkboxes) {
    const selectedBrands = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const brand = checkbox.dataset.brand;
            selectedBrands.push(brand);
        }
    });
    return selectedBrands;
}

async function fetchBrands() {
    try {
        const brandCheckboxes = document.querySelectorAll('input[type="checkbox"][name="brand"]');
        const selectedBrands = getSelectedBrands(brandCheckboxes);
        const response = await fetch('/products/filter/brand', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedBrands)
        });
        if (response.ok) {
            const products = await response.json();
            displayProducts(products);
        } else {
            console.log('Something went wrong...');
        }
    } catch (error) {
        console.error(error);
    }
}

//Фільтрування потужностей

const powerCheckboxes = document.querySelectorAll('input[type="checkbox"][name="power"]');
powerCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", async () => {
        const selectedPowers = getSelectedPowers();
        try {
            const result = await fetch("/products/filter/power", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(selectedPowers)
            })
            if (result.ok) {
                const products = await result.json();
                displayProducts(products);
            } else {
                console.log("something went wrong...");
            }
        } catch (err) {
            console.error(err);
        }
    })
})

function getSelectedPowers() {
    const selectedPowers = [];
    powerCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const minPower = parseInt(checkbox.dataset.minPower);
            const maxPower = parseInt(checkbox.dataset.maxPower);
            selectedPowers.push({ minPower, maxPower });
        }
    })
    return selectedPowers;
}

//Фільтрування підключень кабелів

const cableConnectionCheckboxes = document.querySelectorAll('input[type="checkbox"][name="cable-connection"]');
cableConnectionCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", async () => {
        const selectedCableConnections = getSelectedCableConnections();
        try {
            const result = await fetch("/products/filter/cable_connection", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(selectedCableConnections)
            })
            if (result.ok) {
                const products = await result.json();
                displayProducts(products);
            } else {
                console.log("something went wrong...");
            }
        } catch (err) {
            console.error(err);
        }
    })
})

function getSelectedCableConnections() {
    const selectedCableConnections = [];
    cableConnectionCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const cable = checkbox.dataset.cableConnection;
            selectedCableConnections.push(cable);
        }
    })
    return selectedCableConnections;
}

//Фільтрування діаметрів вентилятора

const fanDiametersCheckboxes = document.querySelectorAll('input[type="checkbox"][name="fan-diameter"]');
fanDiametersCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", async () => {
        const selectedFanDiameters = getSelectedFanDiameters();
        try {
            const result = await fetch("/products/filter/fan_diameter", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(selectedFanDiameters)
            })
            if (result.ok) {
                const products = await result.json();
                displayProducts(products);
            } else {
                console.log("something went wrong...");
            }
        } catch (err) {
            console.error(err);
        }
    })
})

function getSelectedFanDiameters() {
    const selectedFanDiameters = [];
    fanDiametersCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const fan = checkbox.dataset.fanDiameter;
            selectedFanDiameters.push(fan);
        }
    })
    return selectedFanDiameters;
}

//Фільтрування ККД

const efficiencyCheckboxes = document.querySelectorAll('input[type="checkbox"][name="efficiency"]');
efficiencyCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", async () => {
        const selectedEfficiencies = getSelectedEfficiencies();
        try {
            const result = await fetch("/products/filter/efficiency", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(selectedEfficiencies)
            })
            if (result.ok) {
                const products = await result.json();
                displayProducts(products);
            } else {
                console.log("something went wrong...");
            }
        } catch (err) {
            console.error(err);
        }
    })
})

function getSelectedEfficiencies() {
    const selectedEfficiencies = [];
    efficiencyCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const minEff = parseFloat(checkbox.dataset.minEff);
            const maxEff = parseFloat(checkbox.dataset.maxEff);
            selectedEfficiencies.push({ minEff, maxEff });
        }
    });
    return selectedEfficiencies;
}

//Фільтрування наявності

const availabilityCheckboxes = document.querySelectorAll('input[type="checkbox"][name="availability"]');
availabilityCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", async () => {
        const selectedAvailabilities = getSelectedAvailabilities();
        try {
            const result = await fetch("/products/filter/availability", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(selectedAvailabilities)
            })
            if (result.ok) {
                const products = await result.json();
                displayProducts(products);
            } else {
                console.log("something went wrong...");
            }
        } catch (err) {
            console.error(err);
        }
    })
})

function getSelectedAvailabilities() {
    const selectedAvailabilities = [];
    availabilityCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const availability = checkbox.dataset.availability;
            selectedAvailabilities.push(availability);
        }
    })
    return selectedAvailabilities;
}

//Фільтрування ціни

const minPriceInput = document.getElementById('min-price');
const maxPriceInput = document.getElementById('max-price');

minPriceInput.addEventListener('input', fetchProductsByPrice);
maxPriceInput.addEventListener('input', fetchProductsByPrice);

function fetchProductsByPrice() {
  const minPrice = parseInt(minPriceInput.value);
  const maxPrice = parseInt(maxPriceInput.value);
  let priceRange = {};
  if (!isNaN(minPrice) && minPrice > 0) {
    priceRange.minPrice = minPrice;
  }
  if (!isNaN(maxPrice) && maxPrice > 0) {
    priceRange.maxPrice = maxPrice;
  }
  sendPriceRangeToServer(priceRange);
}

async function sendPriceRangeToServer(priceRange) {
    try {
        const response = await fetch('/products/filter/price', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(priceRange)
        });
        if (response.ok) {
            const products = await response.json();
            displayProducts(products);
        } else {
            console.log('Something went wrong...');
        }
    } catch (error) {
            console.error(error);
    }
}