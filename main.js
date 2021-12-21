// Imports
import productList from './products.js';

//Declaración de variables y objetos
let cartList = [];

let cartProduct = {
  name: '',
  category: '',
  price: 0,
  quantity: 1,
  img: '',
};

// Elementos del Dom
const productsArea = document.getElementById('products-area');
const filterButton = document.querySelectorAll('#filter-button');
const addToCartButtons = document.getElementsByClassName('products-btn');
const notificationBubble = document.getElementById('bubble');
const cartButton = document.getElementById('cart-button');
const cartModal = document.getElementById('cart-modal');
const cartModalProducts = document.getElementById('cart-modal-products');
const cartCloseButton = document.getElementById('close-button');
const noProductsNotification = document.getElementById(
  'noproducts-notification'
);
const cartListHeaders = document.getElementById('cart-list-headers');

// ========== FUNCIONES DEL RENDER DE PRODUCTOS ==========

// Agarramos el objeto de productos y lo imprimos en la página
function showProducts(array) {
  productsArea.innerHTML = `${array
    .map(
      (products, index) =>
        `<div class="products-card">
                <h3 class="products-card-title" id="product-title">${products.name}</h3>
                <h4 class="products-category">${products.category}</h4>
                <img class="products-card-img" src="assets/ramo.png" alt="product">
                <h3 class="products-card-price">$${products.price}</h3>
                <div class="products-input-container">
                    <h3>Quantity: </h3>
                    <input type="number" min="1" value="1" class="products-inputBox">
                    <h3> /kg</h3>
                </div>
                <button class="products-btn" id="products-btn" type="submit">Add to cart</button>
    </div>`
    )
    .join(' ')}`;

  for (let i = 0; i < addToCartButtons.length; i++) {
    let addButton = addToCartButtons[i];
    addButton.addEventListener('click', addToCart);
  }
}

// ========== FUNCIONES DEL FILTRO ==========

//Funciones del filtro -> Recibe la categoria, hace el filtro y lo imprime en la web

const filterCategory = (category) => {
  let categoryArray = productList.filter(
    (valor) => valor.category === category
  );
  showProducts(categoryArray);
};

// funcion para filtrar el listado de productos

function filterProducts(e) {
  filterButton.forEach((button) => {
    button.addEventListener('click', (e) => {
      let buttonAlt = e.path[0].alt;
      console.log(buttonAlt);

      if (buttonAlt === 'Todos') {
        showProducts(productList);
      }

      if (buttonAlt === 'Flores') {
        filterCategory('flores');
      }

      if (buttonAlt === 'Secos') {
        filterCategory('secos');
      }

      if (buttonAlt === 'Eventos') {
        filterCategory('eventos');
      }

      if (buttonAlt === 'Estacionales') {
        filterCategory('estacionales');
      }
    });
  });
}

// ========== FUNCIONES DEL CARRITO ==========

// Agregar al carrito

function addToCart(e) {
  e.preventDefault();

  let cartItem = e.target.parentElement;
  let titleItem = cartItem.getElementsByClassName('products-card-title')[0]
    .innerText;
  let categoryItem =
    cartItem.getElementsByClassName('products-category')[0].innerText;
  let priceItem = cartItem.getElementsByClassName('products-card-price')[0]
    .innerText;
  let quantityItem =
    cartItem.getElementsByClassName('products-inputBox')[0].value;
  let imageItem = cartItem.getElementsByClassName('products-card-img')[0].src;

  cartProduct = {
    name: titleItem,
    category: categoryItem,
    price: priceItem,
    quantity: quantityItem,
    img: imageItem,
  };

  cartList.push(cartProduct);
  console.log(cartList);

  // Reducimos las cantidades totales del objeto para imprimir el numero en la burbuja de notificación.
  const quantityBubble = cartList.reduce(
    (acc, cur) => acc + parseInt(cur.quantity),
    0
  );

  cartNotificationBubble(parseInt(quantityBubble));
  feedCartModal(cartList);
}

// Imprime la burbuja de notificación
function cartNotificationBubble(quantity) {
  notificationBubble.classList.remove('display-none');
  notificationBubble.innerHTML = quantity;
}

//Agrega los productos a la ventana del carrito

function feedCartModal(product) {
  cartModalProducts.innerHTML = `${product
    .map(
      (value, index) =>
        `<div class="product" key=${index + 1}>
        <div class="cart-title">${value.name}</div>
    <div class="cart-quantity">${value.quantity}</div>
    <div class="cart-price">${value.price}</div>
    <div class="cart-delete" id="delete-cart">borrar</div>
    </div>
    `
    )
    .join('')}`;

  noProductsNotification.classList.add('display-none');

  const deleteFromCart = document.querySelectorAll('#delete-cart');

  deleteFromCart.forEach((button) => {
    button.addEventListener('click', (e) => {
      const deleteKeyProduct = e.target.parentElement.attributes.key.value;
      deleteProductsCart(deleteKeyProduct);
    });
  });
}

// Si el carrito está vacio muestra un mensaje, sino muestra los productos agregados

cartButton.addEventListener('click', () => {
  if (cartList.length >= 1) {
    cartModal.classList.remove('display-none');
    noProductsNotification.classList.add('display-none');
  } else {
    cartModal.classList.remove('display-none');
    noProductsNotification.classList.remove('display-none');
  }
});

// Cierra el modal del carrito

cartCloseButton.addEventListener('click', () => {
  cartModal.classList.add('display-none');
});

// Eliminamos artículos del carrito

// deleteFromCart.addEventListener('click', deleteProductCart);

function deleteProductsCart(key) {
  cartList.splice(key, 1);
  feedCartModal(cartList);
  console.log(cartList);
}

// ========== FUNCIONES INICIADORAS ==========

// Función iniciadora
function init() {
  showProducts(productList);
  filterProducts();
  notificationBubble.classList.add('display-none');
  deleteProductsCart();
}

// Corremos la función iniciadora
init();
