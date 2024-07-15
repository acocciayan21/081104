import {
  coffeeArray,
  milkteaArray,
  burgerArray,
  pastaArray,
  othersArray,
  pastryArray,
} from "./menu.js";
import { showDisplay, togglePopup, defineDisplayContent} from "./orders.js";

// CHANGE THE LOGO IN MENU SLIDEBAR
document.querySelector(
  ".menu-menu-active"
).innerHTML = `<i class="bx bxs-coffee menu-icon left-icon" style='color:#36180d'></i><p>Menu</p>`;

// CHANGE THE LOGO IN MENU CATEGORY
let activeButton = null;

function changeColor(button) {
  if (activeButton) {
    activeButton.classList.remove("active");
    // Reset color of icon and span tags to default
    const icon = activeButton.querySelector("i");
    const span = activeButton.querySelector("span");
    if (icon) icon.style.color = "#36180d";
    if (span) span.style.color = "#36180d";
  }

  button.classList.add("active");
  activeButton = button;

  const icon = button.querySelector("i");
  const span = button.querySelector("span");
  if (icon) icon.style.color = "#fff";
  if (span) span.style.color = "#fff";
}

// VIEWING DIFFERENT SECTION  WHEN CLICKING BUTTONS
function scrollToSection(index) {
  let width = document.querySelector(".products-container").offsetWidth;
  document.querySelectorAll(".item-products-div").forEach((div) => {
    const container = div;
    container.style.transform = `translateX(${-width * index}px)`;
  });
}


// BUTTON TO CHANGE COLOR OF BUTTON IN MENU
const coffeeButton = document.querySelector(".menu-coffee");
coffeeButton.addEventListener("click", () => {
  changeColor(coffeeButton);
  scrollToSection(0);
});

// CLICK THE COFFEE BUTTON WHEN PAGE OPENS
coffeeButton.click();

document.querySelectorAll(".menu-button").forEach((button) => {
  button.addEventListener("click", () => {
    changeColor(button);
    const param = `${button.dataset.param}`;
    scrollToSection(param);
  });
});

// CONVERT THE ARRAY FROM THE DATASET OF ITEM AND USED IT IN DISPLAY POP UP


// LOADING AND DISPLAYING PRODUCTS IN SECTION
function loadSectionProducts(array, selector, arrayName) {
  let html = "";
  array.forEach((product) => {
    const item = `
      <div class="section item-section-div">
        <div class="item-products-div-container">
          <div class="item-container">
            <div class="item-div" data-product-id="${product.id}" data-array-name="${arrayName}">
              <div>
                <img src="${product.image}" alt="">
              </div>
              <div>
                <h1>${product.name}</h1>
              </div>
              <div>
                <h2>&#8369; ${product.price}.00</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
    html += item;
  });
  document.querySelector(selector).innerHTML = html;
}
loadSectionProducts(coffeeArray, ".item-products-div", "coffeeArray");
loadSectionProducts(milkteaArray, ".js-milktea-item-products-div", "milkteaArray");
loadSectionProducts(burgerArray, ".js-burger-item-products-div", "burgerArray");
loadSectionProducts(pastaArray, ".js-pasta-item-products-div", "pastaArray");
loadSectionProducts(othersArray, ".js-others-item-products-div", "othersArray");
loadSectionProducts(pastryArray, ".js-pastry-item-products-div", "pastryArray");



// SHOW WHEN THE ITEM IN MENU IS CLICK
showDisplay();








