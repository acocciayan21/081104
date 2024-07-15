// import { defineDisplayContent, togglePopup } from './menu-page.js';
import { showDisplay,  displayCartItemInMyOrders } from './orders.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { bestSellingCoffeeArray } from './menu.js';

// GET THE DATE TODAY AND DISPLAY IN PROMO
function dateToday() {
  const today = dayjs();
  const currentDay = today.format('dddd, MMMM DD, YYYY');
  document.querySelector('.promo-date').innerText = `Promo | ${currentDay}`;
}
dateToday();

// CHANGE THE LOGO IN HOME SLIDEBAR
document.querySelector('.home-menu-active').innerHTML =
  `<i class="bx bxs-home menu-icon left-icon" style='color:#36180d'></i><p>Home</p>`;

// BEST SELLING BEVERAGES
function bestSellingBeveragess() {
  let bestsellingitemHtml = "";
  bestSellingCoffeeArray.forEach((coffee) => {
    const html = `
      <div class="item-container">
        <div class="item-div" data-product-id="${coffee.id}" data-array-name="${coffee.array}">
          <div>
            <img src=${coffee.image} alt="">
          </div>
          <div>
            <h1>${coffee.name}</h1>
          </div>
          <div>
            <h2>&#8369 ${coffee.price}.00</h2>
          </div>
        </div>
      </div>
    `;
    bestsellingitemHtml += html;
  });
  document.querySelector(".best-beverages-div").innerHTML = bestsellingitemHtml;

  // Attach event listeners to the dynamically added elements
  showDisplay();
}
bestSellingBeveragess();

// SHOW WHEN THE ITEM IN MENU IS CLICK
showDisplay();

// DISPLAY ORDERED ITEM IN SIDEBAR-RIGHT
displayCartItemInMyOrders();