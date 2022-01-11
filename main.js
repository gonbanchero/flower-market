// Imports
import productList from './products.js';

//Declaración de variables y objetos
let cartList = JSON.parse(localStorage.getItem('data')) || [];

let cartProduct = {
	name: '',
	category: '',
	price: 0,
	quantity: 0,
	img: '',
	key: 0,
};

// Elementos del Dom
const productsArea = document.getElementById('products-area');
const filterArea = document.querySelectorAll('#filter-item');
const filterButton = document.getElementsByClassName('filter-button');
const filterButtonContainer = document.getElementById('product-filter');
const addToCartButtons = document.getElementsByClassName('products-btn');
const notificationBubble = document.getElementById('bubble');
const cartButton = document.getElementById('cart-button');
const modal = document.getElementById('offcanvas');
const offCanvasBody = document.getElementById('offcanvas-body');
const cartListHeaders = document.getElementById('cart-list-headers');
const cartModalProducts = document.getElementById('cart-modal-products');
const noProductsNotification = document.getElementById(
	'noproducts-notification'
);
const totalCart = document.getElementById('total-cart');
const closeModal = document.getElementById('close-modal');
const body = document.getElementById('body-container');
const shippingRate = document.getElementById('shipping-rate');
const takeAway = document.getElementById('takeaway');
const tarjetaTakeAway = document.getElementById('tarjeta-takeaway');
const takeAwayCheckbox = document.getElementById('check-takeaway');
const totalFinalNum = document.getElementById('total-final-num');
const totalFinal = document.getElementById('total-final');
const iniciarCompra = document.getElementById('iniciar-compra');
const seguirViendo = document.getElementById('seguir-viendo');
const postalCode = document.querySelector('#search');
const calculateShipping = document.querySelector('#calcular');
const shippingText = document.querySelector('#shipping-text');
const iniciarCompraBtn = document.querySelector('#iniciar-compra');

// Función para el Local Storage
const saveInLocalStorage = (data) => {
	localStorage.setItem('data', JSON.stringify(data));
};

// ========== FUNCIONES DEL RENDER DE PRODUCTOS ==========

// Agarramos el objeto de productos y lo imprimos en la página
function showProducts(array) {
	productsArea.innerHTML = `${array
		.map(
			(products, index) =>
				` <div class="products-card" data-key="${products.key}">
                <h3 class="products-card-title" id="product-title">${products.name}</h3>
                <h4 class="products-category">${products.category}</h4>
                <img class="products-card-img" src="assets/ramo.png" alt="product">
                <h3 class="products-card-price">$${products.price}</h3>
                <div class="products-input-container">
                    <h3>Cantidad: </h3>
                    <input type="number" min="1" value="1" class="products-inputBox">
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

// crea un array de categorias dinámicamente para no agregar a mano nuevas categorias

const categorias = () => {
	const categories = [];
	productList.forEach((prod) => {
		!categories.some((cat) => cat === prod.category)
			? categories.push(prod.category)
			: ' ';
	});
	return categories;
};

// Crea la botonera con el array de categorias

const botoneraFiltro = () => {
	filterButtonContainer.insertAdjacentHTML(
		'beforeend',
		`${categorias()
			.map(
				(cat) => `
	<div class="filter-item">
	<img src="/assets/menu-icon.png" alt="${cat}" class="filter-button">
	<p>${cat.charAt(0).toUpperCase() + cat.slice(1)}</p>
</div>`
			)
			.join(' ')}`
	);
};

// funcion para filtrar el listado de productos

function filterProducts(e) {
	for (let i = 0; i < filterButton.length; i++) {
		let clickFilterButton = filterButton[i];
		clickFilterButton.addEventListener('click', (e) => {
			let buttonAlt = e.path[0].alt;

			buttonAlt === 'todos'
				? showProducts(productList)
				: filterCategory(buttonAlt);
		});
	}
}

//Funciones del filtro -> Recibe la categoria, hace el filtro y lo imprime en la web

const filterCategory = (category) => {
	let categoryArray = productList.filter(
		(valor) => valor.category === category
	);
	showProducts(categoryArray);
};

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
	let keyItem = cartItem.attributes[1].value;

	cartProduct = {
		name: titleItem,
		category: categoryItem,
		price: priceItem,
		quantity: quantityItem,
		img: imageItem,
		key: keyItem,
	};

	cartList.push(cartProduct);

	cartNotificationBubble(parseInt(quantityBubble()));
	totalCartResult();
	saveInLocalStorage(cartList);
	feedCartModal(cartList);
}

// Imprime la burbuja de notificación
function cartNotificationBubble(quantity) {
	notificationBubble.classList.remove('display-none');
	notificationBubble.innerHTML = quantity;
	localStorage.setItem('bubble', JSON.stringify(quantity));
}

// Si el carrito está vacio muestra un mensaje, sino muestra los productos agregados

cartButton.addEventListener('click', () => {
	modal.classList.remove('display-none');
	// body.classList.add('stop-scrolling');

	if (
		cartList.length >= 1 ||
		JSON.parse(localStorage.getItem('totalCart')) !== null
	) {
		feedCartModal(JSON.parse(localStorage.getItem('data')));
		noProductsNotification.classList.add('display-none');
		offCanvasBody.classList.remove('display-none');
		totalCart.classList.remove('display-none');

		totalFinalNum.innerText = `$${JSON.parse(
			localStorage.getItem('totalCart')
		)}`;

		totalCart.innerHTML = `<p class="total-sum"><strong>Subtotal (sin envío): <span>$${JSON.parse(
			localStorage.getItem('totalCart')
		)}</span></p>`;

		shippingText.innerHTML = localStorage.getItem('envio');

		offCanvasBody.classList.remove('display-none');
		totalFinal.classList.remove('display-none');
		takeAway.classList.remove('display-none');
		shippingRate.classList.remove('display-none');
		iniciarCompra.classList.remove('display-none');
	} else {
		noProductsNotification.classList.remove('display-none');
		totalCart.classList.add('display-none');
		offCanvasBody.classList.add('display-none');
		totalFinal.classList.add('display-none');
		takeAway.classList.add('display-none');
		shippingRate.classList.add('display-none');
		iniciarCompra.classList.add('display-none');
	}
});

//Agrega los productos a la ventana del carrito

function feedCartModal(product) {
	cartModalProducts.innerHTML = `${product
		.map(
			(value, index) =>
				`<div class="product" key=${value.key}>
				<div class="cart-title">${value.name}</div>
				<div class="cart-quantity">${value.quantity}</div>
				<div class="cart-price">${value.price}</div>
				<div class="cart-delete" id="delete-cart"> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="18" height="18" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36"><path class="clr-i-outline clr-i-outline-path-1" d="M27.14 34H8.86A2.93 2.93 0 0 1 6 31V11.23h2V31a.93.93 0 0 0 .86 1h18.28a.93.93 0 0 0 .86-1V11.23h2V31a2.93 2.93 0 0 1-2.86 3z" fill="#ea4334"/><path class="clr-i-outline clr-i-outline-path-2" d="M30.78 9H5a1 1 0 0 1 0-2h25.78a1 1 0 0 1 0 2z" fill="#ea4334"/><path class="clr-i-outline clr-i-outline-path-3" d="M21 13h2v15h-2z" fill="#ea4334"/><path class="clr-i-outline clr-i-outline-path-4" d="M13 13h2v15h-2z" fill="#ea4334"/><path class="clr-i-outline clr-i-outline-path-5" d="M23 5.86h-1.9V4h-6.2v1.86H13V4a2 2 0 0 1 1.9-2h6.2A2 2 0 0 1 23 4z" fill="#ea4334"/></svg> </div>
				</div>
    			`
		)
		.join('')}`;

	noProductsNotification.classList.add('display-none');

	const deleteFromCart = document.querySelectorAll('#delete-cart');

	deleteFromCart.forEach((button, index) => {
		button.addEventListener('click', (e) => {
			console.log(e);
			const deleteKeyProduct = e.path[2].attributes[1].value;
			deleteProductsCart(deleteKeyProduct);
		});
	});
}

// Muestra el total a pagar del carrito
function totalCartResult() {
	let totalCartReduce = cartList.reduce(
		(acc, cur) =>
			acc + parseInt(cur.price.slice(1, cur.price.length) * cur.quantity),
		0
	);

	totalCart.innerHTML = `<p class="total-sum"><strong>Subtotal (sin envío): <span>$${totalCartReduce}</span></p>`;
	totalFinalNum.innerHTML = `$${totalCartReduce}`;
	localStorage.setItem('totalCart', `${totalCartReduce}`);
	localStorage.setItem('subTotalCart', `${totalCartReduce}`);
}

calculateShipping.addEventListener('click', (e) => {
	e.preventDefault();
	let postalCodeValue = postalCode.value;

	let totalCartReduce2 =
		cartList.reduce(
			(acc, cur) =>
				acc +
				parseInt(cur.price.slice(1, cur.price.length) * cur.quantity),
			0
		) ||
		JSON.parse(localStorage.getItem('data')).reduce(
			(acc, cur) =>
				acc +
				parseInt(cur.price.slice(1, cur.price.length) * cur.quantity),
			0
		);
	console.log(totalCartReduce2);

	if (postalCodeValue === '') {
		alert('Ingresá tu código postal para calcular el costo de envío');
	} else {
		totalCartReduce2 > 3000
			? (shippingText.innerHTML = 'tu envío es gratuito')
			: (shippingText.innerHTML = 'Envio: $240');
	}

	let totalPlusShipping =
		totalCartReduce2 > 3000 ? totalCartReduce2 : 240 + totalCartReduce2;
	totalFinalNum.innerHTML = `$${totalPlusShipping}`;
	localStorage.setItem('totalCart', `${totalPlusShipping}`);

	localStorage.setItem('envio', shippingText.innerText);
});

iniciarCompraBtn.addEventListener('click', (e) => {
	takeAwayCheckbox.checked || shippingText.innerText !== ''
		? (location.href = 'checkout.html')
		: alert(
				'Ingresá tu código postal o selecciona retiro en nuestro local'
		  );
});

// Eliminamos artículos del carrito

let deleteArray = [];

// Reducimos las cantidades totales del objeto para imprimir el numero en la burbuja de notificación.
const quantityBubble = () =>
	cartList.reduce((acc, cur) => acc + parseInt(cur.quantity), 0);

function deleteProductsCart(key) {
	cartList = cartList.filter((product) => product.key !== key);
	feedCartModal(cartList);
	totalCartResult();

	if (quantityBubble() === 0) {
		notificationBubble.classList.add('display-none');
		totalCart.classList.add('display-none');
		noProductsNotification.classList.remove('display-none');
		offCanvasBody.classList.add('display-none');
		totalFinal.classList.add('display-none');
		takeAway.classList.add('display-none');
		shippingRate.classList.add('display-none');
		iniciarCompra.classList.add('display-none');
	} else {
		cartNotificationBubble(parseInt(quantityBubble()));
	}
	saveInLocalStorage(cartList);
}

closeModal.addEventListener('click', () => {
	modal.classList.add('display-none');
	// body.classList.remove('stop-scrolling');
});

seguirViendo.addEventListener('click', () => {
	modal.classList.add('display-none');
	// body.classList.remove('stop-scrolling');
});

takeAwayCheckbox.addEventListener('change', (e) => {
	console.log(e);
	if (e.target.checked) {
		tarjetaTakeAway.classList.remove('tarjeta-takeaway');
		tarjetaTakeAway.classList.add('tarjeta-takeaway-check');
	} else {
		tarjetaTakeAway.classList.add('tarjeta-takeaway');
		tarjetaTakeAway.classList.remove('tarjeta-takeaway-check');
	}
});

// ========== FUNCIONES INICIADORAS ==========

// Función iniciadora
function init() {
	JSON.parse(localStorage.getItem('data'));
	JSON.parse(localStorage.getItem('totalCart'));

	showProducts(productList);
	botoneraFiltro();
	filterProducts();

	let bubbleNumber = JSON.parse(localStorage.getItem('bubble'));

	JSON.parse(localStorage.getItem('totalCart')) === 0 || bubbleNumber === null
		? notificationBubble.classList.add('display-none')
		: cartNotificationBubble(JSON.parse(localStorage.getItem('bubble')));
}

// Corremos la función iniciadora
init();

export default cartList;
