import {
  coffeeArray,
  milkteaArray,
  burgerArray,
  pastaArray,
  othersArray,
  pastryArray,
} from "./menu.js";

// SHOW WHEN THE ITEM IN MENU IS CLICK
export function showDisplay() {
  document.querySelectorAll(".item-div").forEach((item) => {
    item.addEventListener("click", () => {
      const productId = item.dataset.productId;
      const array = item.dataset.arrayName;

      defineDisplayContent(array, productId);
      togglePopup(true);
    });
  });
}
export function togglePopup(isShow) {
  const popup = document.querySelector(".item-display-container");
  if (isShow === true) {
    // alert('close');
    popup.style.display = "flex";
    popup.style.opacity = "1";
  } else {
    popup.style.display = "none";
    popup.style.opacity = "0";
  }
}

//DEFINE THE CONTENT OF THE DISPLAy POP UP
export function defineDisplayContent(array, productId) {
  const arrayName = getArrayByName(array);
  let html = "";

  arrayName.forEach((arrays) => {
    if (productId === arrays.id) {
      const textHTML = `
        <div class="item-information-container">
          <button class="item-display-close-button">
            <span class="material-symbols-outlined">close</span>
          </button>
          
          <div class="item-information">
            <div class="item-image-container">
              <div> <img src="${arrays.image}" alt="${arrays.name}"></div>
            </div>
            <div class="item-name-and-info">
              <div>
                <h1>${arrays.name}</h1>
                <p class="item-description">${arrays.description}</p>
              </div>
              <span>
                <div class="item-customize">
                  <span>
                    <h2>Size :</h2>
                    <select id="size-select">
                      <option value="short">Short</option>
                      <option value="tall">Tall</option>
                      <option value="grande">Grande</option>
                      <option value="venti">Venti</option>
                      <option value="trenta">Trenta</option>
                    </select>
                  </span>
                  <span>
                    <h2>Sugar level :</h2>
                    <select id="sugar-select">
                      <option value="25%">25%</option>
                      <option value="50%">50%</option>
                      <option value="75%">75%</option>
                      <option value="100%">100%</option>
                    </select>
                  </span>
                  <span>
                    <h2>Quantity :</h2>
                    <select id="quantity-select">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </span>
                </div>
              </span>
              <span>
                <h2>Total:</h2>
                <p id="total-price">&#8369; ${arrays.price}.00</p>
              </span>
            </div>
          </div>
          <div class="item-buttons">
            <a href="" class="item-add-favorites-button">
              <i class="bx bx-heart heart-icon left-icon" style="color: #84391b"></i>
              <p> Add to favorites</p>
            </a>
            <a class="item-add-orders-button">Add to orders</a>
            <a class="item-checkout-button">CHECKOUT</a>
          </div>
        </div>
      `;
      html += textHTML;

      document.querySelector(".item-display-container").innerHTML = html;

      const productId = arrays.id;
      const itemName = arrays.name;

      const quantitySelect = document.querySelector("#quantity-select");
      let quantity = parseInt(quantitySelect.value);
      const unitPrice = arrays.price;
      let totalPrice = unitPrice;
      quantitySelect.addEventListener("change", (event) => {
        quantity = parseInt(event.target.value);
        totalPrice = quantity * unitPrice;
        document.querySelector(
          "#total-price"
        ).innerHTML = `&#8369; ${totalPrice}.00`;
      });

      // Event listener for size change
      const sizeSelect = document.querySelector("#size-select");
      let size = sizeSelect.value;
      sizeSelect.addEventListener("change", (event) => {
        size = event.target.value;
      });

      // Event listener for sugar level change
      const sugarSelect = document.querySelector("#sugar-select");
      let sugar = sugarSelect.value;
      sugarSelect.addEventListener("change", (event) => {
        sugar = event.target.value;
      });

      // CLOSE THE DISPLAY WHEN THE CLOSE IS CLICKED OR CLICK OUTSIDE
      document
        .querySelector(".item-display-close-button")
        .addEventListener("click", () => {
          togglePopup(false);
        });
      document
        .querySelector(".item-display-container")
        .addEventListener("click", (event) => {
          if (!event.target.closest(".item-information-container")) {
            togglePopup(false);
          }
        });
      document
        .querySelector(".item-add-orders-button")
        .addEventListener("click", () => {
          addOrdersInCart(
            productId,
            itemName,
            quantity,
            size,
            sugar,
            totalPrice
          );
          displayCartItemInMyOrders();
        });
    }
  });
}

// CONVERT THE ARRAY FROM THE DATASET OF ITEM AND USED IT IN DISPLAY POP UP
export function getArrayByName(arrayName) {
  switch (arrayName) {
    case "coffeeArray":
      return coffeeArray;
    case "milkteaArray":
      return milkteaArray;
    case "burgerArray":
      return burgerArray;
    case "pastaArray":
      return pastaArray;
    case "othersArray":
      return othersArray;
    case "pastryArray":
      return pastryArray;
    default:
      return [];
  }
}

// STORE ORDERS IN ARRAY
const cartItem = [];

// ADD ORDERS IN ARRAY WHEN ADD-ORDERS CLICKED
function addOrdersInCart(
  productId,
  itemName,
  quantity,
  size,
  sugar,
  unitPrice
) {
  let found = false;
  cartItem.forEach((cart) => {
    if (
      cart.id === productId &&
      cart.sugarLevel === sugar &&
      cart.size === size
    ) {
      cart.quantity += quantity;
      cart.price += quantity * unitPrice;
      found = true;
    }
  });

  if (!found) {
    let item = {
      id: productId,
      name: itemName,
      quantity: quantity,
      size: size,
      sugarLevel: sugar,
      price: quantity * unitPrice,
    };
    cartItem.push(item);
  }

  console.log(cartItem);
}

// DISPLAY ORDERED ITEM IN SIDEBAR-RIGHT
export function displayCartItemInMyOrders() {
  let itemHTML = "";
  cartItem.forEach((item) => {
    const addItemHTML = `
      <div class="ordered-item-div" data-ordered-item-id="${item.id}">
      
        <div class="ordered-item-description">
          <p class="ordered-name">${item.name}</p>
          <p class="ordered-sugar-level">Sugar level: ${item.sugarLevel}</p>
          <p class="ordered-size">Size: ${item.size}</p>
          <p class="ordered-quantity">Quantity: ${item.quantity}</p>
          <p class="ordered-price">Price: &#8369;${item.price}</p>
        </div>
        <div class="ordered-remove" data-remove-id="${item.id}">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#84391b">
            <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/>
          </svg>
        </div>
      </div>
    `;
    itemHTML += addItemHTML;
  });

  document.querySelector(".orders-div").innerHTML = itemHTML;

  // Add event listeners to remove buttons
  document.querySelectorAll('.ordered-remove').forEach(button => {
    button.addEventListener('click', (event) => {
      const removeId = event.currentTarget.getAttribute('data-remove-id');
      removeItemFromCart(removeId);
    });
  });
}

// Function to remove item from cart
function removeItemFromCart(productId) {
  const index = cartItem.findIndex(item => item.id === productId);
  if (index !== -1) {
    cartItem.splice(index, 1);
    displayCartItemInMyOrders(); 
  }
}

function updateTotalPriceInMyOrders(){

}