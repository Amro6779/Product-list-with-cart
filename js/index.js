const products = [
  {
    image: "../images/image-waffle-desktop.jpg",
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.5,
  },
  {
    image: "../images/image-creme-brulee-desktop.jpg",
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.0,
  },
  {
    image: "../images/image-macaron-desktop.jpg",
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8.0,
  },
  {
    image: "../images/image-tiramisu-desktop.jpg",
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 5.5,
  },
  {
    image: "../images/image-baklava-desktop.jpg",
    name: "Pistachio Baklava",
    category: "Baklava",
    price: 4.0,
  },
  {
    image: "../images/image-meringue-desktop.jpg",
    name: "Lemon Meringue Pie",
    category: "Pie",
    price: 5.0,
  },
  {
    image: "../images/image-cake-desktop.jpg",
    name: "Red Velvet Cake",
    category: "Cake",
    price: 4.5,
  },
  {
    image: "../images/image-brownie-desktop.jpg",
    name: "Salted Caramel Brownie",
    category: "Brownie",
    price: 4.5,
  },
  {
    image: "../images/image-panna-cotta-desktop.jpg",
    name: "Vanilla Panna Cotta",
    category: "Panna Cotta",
    price: 6.5,
  },
];

let itemCount = document.querySelector("#item-count");
let itemPrice = document.querySelector("#item-total-price");
let rowData = document.getElementById("rowData");
let rowData2 = document.getElementById("rowData2");

let cartItems = [];

displayProducts();

let addButton = document.querySelectorAll(".add-to-cart");
let incrementButton = document.querySelectorAll(".increment");
let decrementButton = document.querySelectorAll(".decrement");

function displayProducts() {
  var cartoona = ``;
  for (let i = 0; i < products.length; i++) {
    cartoona += `
        <div class="cart-item d-flex flex-column justify-content-center position-relative col-3" data-index="${i}">
        <img id="img" class="rounded-4 border-danger" src="${products[i].image}" alt="${products[i].category}">
        <button class="add-to-cart btn btn-light rounded-pill border-warning d-flex align-items-center">
                    <img class="w-25" src="./images/icon-add-to-cart.svg" alt="add-to-cart">
                    <p class="mb-0">Add To Cart</p>
                    </button>
                    <button
                    class="inc-dec rounded-pill border-warning bg-danger d-flex align-items-center justify-content-around d-none">
                    <img class="decrement btn text-light border border-light rounded-5 p-1"
                        src="./images/icon-decrement-quantity.svg" alt="decrement">
                    <p class="mb-0 text-light">1</p>
                    <img class="increment btn text-light border border-light rounded-5 p-1"
                        src="./images/icon-increment-quantity.svg" alt="increment">
                </button>
                <div class="item-info mt-5">
                <p class="text-secondary">${products[i].category}</p>
                <p>${products[i].name}</p>
                <p class="price">$${products[i].price}</p>
                </div>
                </div>`;
  }
  rowData.innerHTML = cartoona;
}

addButton.forEach(function (button) {
  button.addEventListener("click", addProduct);
});

incrementButton.forEach(function (button) {
  button.addEventListener("click", increaseItem);
});

decrementButton.forEach(function (button) {
  button.addEventListener("click", decreaseItem);
});

rowData2.addEventListener("click", deleteItem);

function addProduct(event) {
  let card = event.target.closest(".cart-item");
  let index = Number(card.dataset.index);
  let product = products[index];

  document.querySelector(".order").classList.remove("d-none");
  document.querySelector(".empty").classList.add("d-none");
  card.querySelector("#img").classList.add("border");
  card.querySelector(".inc-dec").classList.remove("d-none");
  card.querySelector(".add-to-cart").classList.add("d-none");

  let existingItem = cartItems.find(function (item) {
    return item.id === index;
  });

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({
      id: index,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }

  renderCart();
}

function renderCart() {
  let cartoona = ``;
  let totalQuantity = cartItems.reduce(function(accumulator , item){
    return accumulator + item.quantity;
  } , 0);

  let totalPrice = cartItems.reduce(function(accumulator , item){
    return accumulator + (item.quantity * item.price);
  } , 0);

  itemCount.innerText = totalQuantity;
  itemPrice.innerText = totalPrice;

  cartItems.forEach(function (item) {
    let itemTotal = (item.price * item.quantity).toFixed(2);

    cartoona += `<div class="title d-flex justify-content-between align-items-center" data-index=${item.id}>
                        <p class="m-0">${item.name}</p>
                        <div class="icon align-self-end ">
                            <img class="remove-item btn border border-black rounded-5 p-1" src="./images/icon-remove-item.svg"
                                alt="remove-item">
                        </div>
                    </div>
                    <div class="details d-flex gap-2 border-bottom border-1 border-black">
                        <p class="quantity text-danger fw-bold">${item.quantity}x</p>
                        <p class="item-price">@ $${item.price}</p>
                        <p class="sum-price-one-item">$${itemTotal}</p>
                    </div>
                `;
  });

  rowData2.innerHTML = cartoona;
}

function increaseItem(event) {
  let card = event.target.closest(".cart-item");
  let index = Number(card.dataset.index);

  let existingItem = cartItems.find(function (item) {
    return item.id === index;
  });

  if (existingItem) {
    existingItem.quantity += 1;
    let itemQuantity = card.querySelector(".inc-dec p");
    itemQuantity.textContent = existingItem.quantity;
    renderCart();
  }
}

function decreaseItem(event) {
  let card = event.target.closest(".cart-item");
  let index = Number(card.dataset.index);
  let itemQuantity = card.querySelector(".inc-dec p");

  let existingItem = cartItems.find(function (item) {
    return item.id === index;
  });

  if (existingItem) {
    if (existingItem.quantity == 1) {
    } else {
      existingItem.quantity -= 1;
      itemQuantity.textContent = existingItem.quantity;
      renderCart();
    }
  }
}

function deleteItem(event) {
  let removeButton = event.target.closest(".remove-item");

  if (!removeButton) {
    return;
  }

  let titleDiv = removeButton.closest(".title");
  let index = Number(titleDiv.dataset.index);
  let btnIndex = document.querySelector(`.cart-item[data-index="${index}"]`)

  cartItems = cartItems.filter(function (item) {
    return item.id !== index;
  });

  btnIndex.querySelector(".inc-dec").classList.add("d-none");
  btnIndex.querySelector(".add-to-cart").classList.remove("d-none");
  btnIndex.querySelector('#img').classList.remove("border-danger");
  renderCart();
}

