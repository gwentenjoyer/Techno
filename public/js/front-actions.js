document.addEventListener('DOMContentLoaded', function() {

    /* Theme toggle function */

    let themeToggle = document.querySelector('.theme_toggle');
    let isDarkTheme = true;
    let icons = document.querySelectorAll(".icon");
    let transition = "0.5s all ease";
    
    themeToggle.addEventListener('click', function() {
        let rootElement = document.documentElement;
        if (isDarkTheme) {
            let linkElement = document.querySelector('link[href="css/dark.css"]');
            linkElement.setAttribute('href', 'css/light.css');
            rootElement.classList.remove('dark');
            isDarkTheme = false;
        } else {
            let linkElement = document.querySelector('link[href="css/light.css"]');
            linkElement.setAttribute('href', 'css/dark.css');
            rootElement.classList.add('dark');
            isDarkTheme = true;
        }
        rootElement.style.transition = transition;
        updateIcons();
    });

    function getIconName(iconName, isDarkTheme) {
        if (!isDarkTheme) 
            return iconName.replace("_light.png", ".png");
        else 
            return iconName.replace(".png", "_light.png");
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


    /* Profile Icon toggle function */

    let profile = document.querySelector('.profile');
    let profileImg = document.querySelector('.profile>figure>img');
    let originalSrc = profileImg.getAttribute("src");
    /* let status = document.querySelector(".profile>figure>figcaption"); */

    profile.addEventListener('mouseenter', function() {
        let darkProfileIcon = getIconName(originalSrc, false);
        profileImg.setAttribute("src", darkProfileIcon);
    });

    profile.addEventListener('mouseleave', function() {
        let profileIconName = profileImg.getAttribute("src");
        if (isDarkTheme)
            profileImg.setAttribute("src", originalSrc);
    });

    /* END Profile Icon toggle function */


    /* Menu Icon toggle function */

    let menu = document.querySelector("#menu");
    let lines = document.querySelectorAll(".line");
    let sidebarOverlay = document.querySelector(".sidebar-overlay");
    let sidebar = document.querySelector(".offcanvas");
    /* sidebar.classList.add("sidebar-hidden"); */
    let isMenuClosed = true;

    menu.addEventListener('click', function() {
        lines[1].classList.toggle("line-2");
        lines[2].classList.toggle("line-3");
        changeItemSize();
        changeContainer();
/*         sidebar.classList.toggle("show");
        sidebarOverlay.classList.toggle("sidebar-display"); */
    });

    sidebarOverlay.addEventListener("click", function() {
/*         sidebar.classList.toggle("show");
        sidebarOverlay.classList.toggle("sidebar-display"); */
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
        let mainRow = document.querySelector(".main>.row");
        let itemsContainer = document.querySelector(".items");

        if (isMenuClosed){
            itemsContainer.style.justifyContent = 'center';
            mainRow.style.justifyContent = 'end';
        } else {
            itemsContainer.style.justifyContent = 'center';
            mainRow.style.justifyContent = 'center';
        }
        itemsContainer.style.transition = "0s";
        mainRow.style.transition = "0s";
    }

/*     function changeFontSize() {
        const fontsProduct = [];
        let discountFont = document.querySelectorAll(".card .details > .discount");
        let idFont = document.querySelectorAll(".card .details > .product_id");
        let oldPriceFont = document.querySelectorAll(".card .details > .old_price");
        let currentPriceFont = document.querySelectorAll(".card .details > .current_price");
        let availabilityFont = document.querySelectorAll(".card .details > .availability");
        fontsProduct.push(discountFont, idFont, oldPriceFont, currentPriceFont, availabilityFont);
        if (isMenuClosed) {
            fontsProduct.forEach((font) => {
                font.classList.remove("small_font");
            })
        } else {
            fontsProduct.forEach((font) => {
                font.classList.add("small_font");
            })
        }
    } */

    function changeItemSize() {
        let itemsContainer = document.querySelector(".items");
        let itemCards = document.querySelectorAll(".card");
        let itemProps = document.querySelectorAll(".card .property-list>li>span");
        let itembar = document.querySelector(".itembar");

        /* itemCards.style.transform.scale = "0.9"; */

        if (isMenuClosed) {
            itemsContainer.classList.remove('col-12');
            itemsContainer.classList.add('col-9');
            itembar.classList.add("px-2","ps-3");
            itemProps.forEach(function(prop) {
                prop.style.fontSize = "10.5px";
            });
            itemCards.forEach(function(card) {
                card.style.width = '14.45rem';
                /* card.style.transform = "scale(0.7)"; */
            });
            isMenuClosed = false;
        } else {
            itemsContainer.classList.remove('col-9');
            itemsContainer.classList.add('col-12');
            itembar.classList.remove("px-2","ps-3");
            itemProps.forEach(function(prop) {
                prop.style.fontSize = "12px";
            });
            itemCards.forEach(function(card) {
                card.style.width = '16.55rem';
                /* card.style.transform = "scale(1)"; */
            });
            isMenuClosed = true;
        }
    }


    /* Window Scroll function */

    window.onscroll = function() {myFunction()};

    let header = document.querySelector("header");
    let main = document.querySelector("main");
    main.style.paddingTop = header.offsetHeight+"px";
    /* console.log(header.offsetHeight); */
    let sticky = header.offsetTop;

    function myFunction() {
        if (window.pageYOffset >= sticky) {
            header.classList.add("sticky");
            header.classList.add("header-hidden");
        } else {
            header.classList.remove("sticky");
            header.classList.remove("header-hidden");
        }
    }

    /* END Window Scroll function */


    

});