"use strict";

const decrement = document.getElementById("decrement");
const increment = document.getElementById("increment");
const quantityDisplay = document.getElementById("quantity-display");
const cartBtn = document.getElementById("cartBtn");
const cartNum = localStorage.getItem("cartQuantity");
const cartQuantity = document.getElementById("cart-quantity");
const cartContainer = document.getElementById("cart-container");
const checkoutModal = document.getElementById("checkout-modal");
const cartContent = document.getElementById("cart-content");
const largeImgContainer = document.getElementById("img-large__container");
const largeImg = document.getElementById("img-large");
const smallImg = document.getElementsByClassName("img-small");
const purchaseContainer = document.getElementById("purchase-container");
const purchaseModal = document.getElementById("purchase-modal");

let quantity = 0;

// IF LS DOESN'T YET HAVE THE hasCodeRunBefore PROPERTY DEFINED, SET cartQuantity PROPERTY in LS TO 0
window.onload = function () {
  if (localStorage.getItem("hasCodeRunBefore") === null) {
    cartQuantity.textContent = "0";
    localStorage.setItem("cartQuantity", 0);
    localStorage.setItem("hasCodeRunBefore", true);
  }
};

// SET THE NUMBER AMOUNT IN CART TO THE SAME NUMBER AS THE cartQuantity PROPERTY IN LS
cartQuantity.textContent = cartNum;

// SUBTRACT QUANTITY BUTTON
decrement.addEventListener("click", function () {
  quantity--;
  if (quantity === 0) {
    decrement.disabled = true;
    cartBtn.disabled = true;
  }
  quantityDisplay.innerText = quantity;
});

// ADD QUANTITTY BUTTON
increment.addEventListener("click", function () {
  quantity++;
  decrement.disabled = false;
  cartBtn.disabled = false;
  quantityDisplay.innerText = quantity;
});

// ADD TO CART BUTTON
cartBtn.addEventListener("click", function () {
  if (quantity > 0) {
    cartQuantity.textContent = parseInt(cartQuantity.textContent) + quantity;
    localStorage.setItem("cartQuantity", parseInt(cartQuantity.textContent));
  }

  cartContent.innerHTML = `
  <div class="cart-content__container-full">
  
  <div class="cart-content">
  <img src="images/banned-default.webp" class="modal-thumbnail" />
  
  <div class="cart-content__text">
  <h3>Air Jordan 1 "Banned"</h3>
  <p>$160 x ${localStorage.cartQuantity} = ${
    "$" + 160 * parseInt(localStorage.cartQuantity)
  }</p>
  </div>
  
  <ion-icon name="trash-outline" id="empty-basket" class="empty-basket"></ion-icon>
  </div>

  <button class="checkout-btn">Checkout</button>
  </div>
  `;
});

// IF LOCALSTORAGE HAS A DEFINED CARTQUANTITY PROPERTY, DISPLAY PRODUCT AND $ AMOUNT IN MODAL
if (
  localStorage.getItem("cartQuantity") !== null &&
  parseInt(localStorage.getItem("cartQuantity")) > 0
) {
  cartContent.innerHTML = `
    <div class="cart-content__container-full">
    
    <div class="cart-content">
    <img src="images/banned-default.webp" class="modal-thumbnail" />
    
    <div class="cart-content__text">
    <h3>Air Jordan 1 "Banned"</h3>
    <p>$160 x ${localStorage.cartQuantity} = ${
    "$" + 160 * parseInt(localStorage.cartQuantity)
  }</p>
    </div>
    
    <ion-icon name="trash-outline" id="empty-basket" class="empty-basket"></ion-icon>
    </div>

    <button class="checkout-btn">Checkout</button>
    </div>
    `;
}

// WHEN CART IS HOVERED DISPLAY MODAL
cartContainer.addEventListener("mouseenter", function () {
  checkoutModal.classList.remove("hidden");
});

cartContainer.addEventListener("mouseleave", function () {
  checkoutModal.classList.add("hidden");
});

// REMOVE ITEMS FROM CART BUTTON(MODAL)
document.querySelector("#cart-container").addEventListener("click", (event) => {
  if (
    event.target.matches(".empty-basket") ||
    event.target.closest(".empty-basket")
  ) {
    cartContent.innerHTML = `<p>Your cart is empty</p>`;
    cartQuantity.textContent = 0;
    localStorage.setItem("cartQuantity", 0);
  }
});

// CHECKOUT BUTTON
document.querySelector("#cart-container").addEventListener("click", (event) => {
  if (
    event.target.matches(".checkout-btn") ||
    event.target.closest(".checkout-btn")
  ) {
    checkoutModal.classList.add("hidden");
    purchaseContainer.style.display = "flex";
    purchaseModal.style.display = "flex";
    purchaseModal.innerHTML = `
    <h2>Cart Items</h2>
    <div class="cart-content__container-full">
    
    <div class="purchase-content">
    <img src="images/banned-default.webp" class="modal-thumbnail" />
    
    <div class="purchase-content__text">
    <h3>Air Jordan 1 "Banned"</h3>
    <p>$160 x ${localStorage.cartQuantity} = ${
      "$" + 160 * parseInt(localStorage.cartQuantity)
    }</p>
    <p><strong>Tax:</strong> ${
      "$" + 160 * parseInt(localStorage.cartQuantity) * 0.0625 + ".00"
    }</p>
    <p><strong>Total:</strong> ${
      "$" +
      (160 * parseInt(localStorage.cartQuantity) +
        160 * parseInt(localStorage.cartQuantity) * 0.0625) +
      ".00"
    }</p>
    </div>
    </div>
    
    <button class="checkout-btn" id="place-order">Place Order</button>
    `;
  }
});

// PLACE ORDER BUTTON(PURCHASE MODAL)
document.querySelector("#purchase-modal").addEventListener("click", (event) => {
  if (
    event.target.matches(".checkout-btn") ||
    event.target.closest(".checkout-btn")
  ) {
    purchaseModal.innerHTML = `<div class="loading"></div>`;
    setTimeout(function () {
      purchaseModal.innerHTML = `
      <div class="thankyou-text">
      <h1>Thank You For Your Purchase</h1>
      <p class="continue-shopping">← Continue Shopping</p>
      </div>
      `;
    }, 2500);

    quantityDisplay.textContent = "0";
    cartQuantity.textContent = "0";
    cartContent.innerHTML = `
    <p>Your cart is empty</p>
    `;
    localStorage.setItem("cartQuantity", 0);
    quantity = 0;
  }
});

// WHEN PURCHASE MODAL IS DISPLAYED, CLOSE MODAL WHEN CLICKED OFF
purchaseContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("purchase-container")) {
    purchaseContainer.style.display = "none";
    purchaseModal.style.display = "none";
  }
});

// CONTINUE SHOPPING BUTTON(PURCHASE MODAL)
document.querySelector("#purchase-modal").addEventListener("click", (event) => {
  if (
    event.target.matches(".continue-shopping") ||
    event.target.closest(".continue-shopping")
  ) {
    purchaseContainer.style.display = "none";
    purchaseModal.style.display = "none";
  }
});

// CHANGE LARGE IMG WHEN A THUMBNAIL IS CLICKED
smallImg[0].onclick = function () {
  largeImg.src = smallImg[0].src;
};
smallImg[1].onclick = function () {
  largeImg.src = smallImg[1].src;
};
smallImg[2].onclick = function () {
  largeImg.src = smallImg[2].src;
};
smallImg[3].onclick = function () {
  largeImg.src = smallImg[3].src;
};

// APPLY OPACITY AND RED OUTLINE TO THUMNBNAIL WHEN CLICKED
for (let thumbnail of smallImg) {
  thumbnail.addEventListener("click", function () {
    for (let thumbnail of smallImg) {
      thumbnail.classList.remove("active");
    }
    this.classList.add("active");
  });
}

// ZOOM IN ON LARGE IMG WHEN HOVERED
largeImgContainer.addEventListener("mousemove", onZoom);
largeImgContainer.addEventListener("mouseover", onZoom);
largeImgContainer.addEventListener("mouseleave", offZoom);

function onZoom(e) {
  const x = e.clientX - e.target.offsetLeft;
  const y = e.clientY - e.target.offsetTop;
  largeImg.style.transformOrigin = `${x}px ${y}px`;
  largeImg.style.transform = "scale(2)";
}

function offZoom(e) {
  largeImg.style.transformOrigin = `center center`;
  largeImg.style.transform = "scale(1)";
}
