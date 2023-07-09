console.log("front-actions.js");

document.addEventListener('DOMContentLoaded', function() {

    /* Theme toggle function */

    

    let themeToggle = document.querySelector('.theme_toggle');
    let icons = document.querySelectorAll(".icon");
    let localOldTheme = localStorage.getItem("isDarkTheme");
    let isDarkTheme;
    if(typeof localOldTheme === undefined){
        console.log("adding theme");
        isDarkTheme = true;
        localStorage.setItem("isDarkTheme", isDarkTheme);
    }
    else{
        isDarkTheme = (localOldTheme === 'true');
        console.log(localOldTheme, isDarkTheme)
    }
    setTheme(isDarkTheme);
    let transition = "0.5s all ease";
    
    themeToggle.addEventListener('click', function() {
        setTheme(!isDarkTheme);
        isDarkTheme = !isDarkTheme;
        document.documentElement.style.transition = transition;
        updateIcons();
    });

    function setTheme(isDarkTheme){
        if (isDarkTheme) {
            let linkElement = document.getElementById("themeLink");
            linkElement.setAttribute('href', 'css/dark.css');
            document.documentElement.classList.add('dark');
            localStorage.setItem("isDarkTheme", true);
        } else {
            let linkElement = document.getElementById("themeLink");
            linkElement.setAttribute('href', 'css/light.css');
            document.documentElement.classList.remove('dark');
            localStorage.setItem("isDarkTheme", false);
        }
    }

    function getIconName(iconName, isDarkTheme) {
        if (!isDarkTheme) 
            return iconName.replace("_light.png", "_dark.png");
        else 
            return iconName.replace("_dark.png", "_light.png");
    }

    function updateIcons() {
        icons.forEach(function(icon){
            let iconName = icon.getAttribute("src");
            let updatedIconName = getIconName(iconName, isDarkTheme);
            setTimeout(function() {
                icon.setAttribute("src", updatedIconName);
            }, 250);
        });
    }

    /* END Theme toggle function */


    /* Menu */

    let menu = document.querySelector("#menu");
    let lines = document.querySelectorAll(".line");
    let sidebarOverlay = document.querySelector(".sidebar-overlay");
    let isMenuClosed = true;

    menu.addEventListener('click', function() {
        lines[1].classList.toggle("line-2");
        lines[2].classList.toggle("line-3");
        changeItemSize();
        changeContainer();
    });

    sidebarOverlay.addEventListener("click", function() {
        changeItemSize();
        changeContainer();
        lines[1].classList.toggle("line-2");
        lines[2].classList.toggle("line-3");
    });

    document.querySelector(".btn-close").addEventListener("click", function() {
        changeItemSize();
        changeContainer();
        lines[1].classList.toggle("line-2");
        lines[2].classList.toggle("line-3");
    });

    function changeContainer() {
        let mainRow = document.querySelector(".main > .row");
        let itemsContainer = document.querySelector(".items");
        const sidebar = document.querySelector(".offcanvas");
        const emptyContainer = document.querySelector(".empty");
        if (!isMenuClosed){
            itemsContainer.classList.remove('col-12');
            itemsContainer.classList.add('col-9');
            itemsContainer.style.justifyContent = 'center';
            mainRow.style.justifyContent = 'end';
            emptyContainer.style.width = `${sidebar.clientWidth}px`;          
        } else {
            itemsContainer.classList.remove('col-9');
            itemsContainer.classList.add('col-12');
            itemsContainer.style.justifyContent = 'center';
            mainRow.style.justifyContent = 'center';
            emptyContainer.style.width = `0px`;
        }
    }

    function changeItemSize() {
        let itemCards = document.querySelectorAll(".card");
        let itembar = document.querySelector(".itembar");

        let itemPropsFont = document.querySelectorAll(".card .property-list>li>span");
        let discountFont = document.querySelectorAll(".card .details > .discount");
        let idFont = document.querySelectorAll(".card .details > .product_id");
        let oldPriceFont = document.querySelectorAll(".card .details > .old_price > del");
        let currentPriceFont = document.querySelectorAll(".card .details > .current_price");
        let availabilityFont = document.querySelectorAll(".card .details > .availability");
        let titleFont = document.querySelectorAll(".card .product-title > .card-title");
        let brandFont = document.querySelectorAll(".card .product-title > .card-brand");
        if (isMenuClosed) {
            itembar.classList.add("px-2","ps-3");
            itemCards.forEach(card => {
                card.style.width = '14.45em';
            });

            itemPropsFont.forEach(font => {
                font.style.fontSize = "10.5px";
            });
            discountFont.forEach(font => {
                font.style.fontSize = "12px";
                font.style.padding = "2px 5px";
            });
            idFont.forEach(font => {
                font.style.fontSize = "12px";
            });
            oldPriceFont.forEach(font => {
                font.style.fontSize = "14px";
            });
            currentPriceFont.forEach(font => {
                font.style.fontSize = "16px";
            });
            availabilityFont.forEach(font => {
                font.style.fontSize = "13px";
            });
            titleFont.forEach(font => {
                font.style.fontSize = "14px";
            });
            brandFont.forEach(font => {
                font.style.fontSize = "12px";
            });

            isMenuClosed = false;
        } else {
            itembar.classList.remove("px-2","ps-3");
            itemCards.forEach(card => {
                card.style.width = '16.55em';
            });

            itemPropsFont.forEach(font => {
                font.style.fontSize = "12px";
            });
            discountFont.forEach(font => {
                font.style.fontSize = "14px";
                font.style.padding = "2px 10px";
            });
            idFont.forEach(font => {
                font.style.fontSize = "13px";
            });
            oldPriceFont.forEach(font => {
                font.style.fontSize = "16px";
            });
            currentPriceFont.forEach(font => {
                font.style.fontSize = "19px";
            });
            availabilityFont.forEach(font => {
                font.style.fontSize = "14px";
            });
            titleFont.forEach(font => {
                font.style.fontSize = "16px";
            });
            brandFont.forEach(font => {
                font.style.fontSize = "14px";
            });
            
            isMenuClosed = true;
        }
    }

/* END Menu */

/* Window Scroll function */

let header = document.querySelector("header");
let main = document.querySelector("main");
const sidebar = document.querySelector(".offcanvas");
main.style.paddingTop = header.offsetHeight+"px";
sidebar.style.marginTop = `${header.offsetHeight}px`;

window.addEventListener('resize', function() {
    main.style.paddingTop = header.offsetHeight+"px";
    sidebar.style.marginTop = `${header.offsetHeight+3}px`;
});


/* END Window Scroll function */
});