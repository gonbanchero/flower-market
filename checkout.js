// ========== CHECKOUT ==========

const tBodyItems = document.querySelector('#tbody-items');
const tFootSubTotal = document.querySelector('#tfoot-subtotal');
const orderTotal = document.querySelector('#order-total');
const tfootShipping = document.querySelector('#tfoot-shipping');

function feedCheckoutItems(product) {
	console.log(product);
	tBodyItems.innerHTML = `${product
		.map(
			(value, index) =>
				`<tr class="cart-item">
                <td class="table-70">${value.name} x ${value.quantity}</td>
                <td class="table-30">${value.price}</td>
            </tr>`
		)
		.join('')}`;

	// Reducimos los totales para imprimir el subtotal
	let totalCheckout = product.reduce(
		(acc, cur) =>
			acc + parseInt(cur.price.slice(1, cur.price.length) * cur.quantity),
		0
	);

	// Imprimimos el subtotal
	tFootSubTotal.innerHTML = ` 
    <td>subtotal:</td>
    <td>$${totalCheckout}</td>
    `;

	// Imprimimos el envio
	tfootShipping.innerHTML = `<td>envio:</td>
    <td>${
		localStorage.getItem('envio') === 'Envio: $240' ? '$240' : 'gratis'
	}</td>
    `;

	// Imprimimos el total (dsp sería + el envio)

	orderTotal.innerHTML = `<th>total:</th>
    <th>$${localStorage.getItem('totalCart')}</th>`;
}

feedCheckoutItems(JSON.parse(localStorage.getItem('data')));

console.log(localStorage.getItem('envio'));

// =======================================================
// =======================================================
// =======================================================
// =======================================================
// =======================================================

//Form Validation elements

const form = document.querySelector('#checkout-form');
const firstName = document.querySelector('#first-name-field');
const lastName = document.querySelector('#last-name-field');
const email = document.querySelector('#email-field');
const adress = document.querySelector('#adress-field');
const phone = document.querySelector('#phone-field');
const city = document.querySelector('#city-field');
const finalizarCompra = document.querySelector('#finalizar-compra');

finalizarCompra.addEventListener('click', (e) => {
	e.preventDefault();

	checkRequired([firstName, lastName, email, adress, phone, city]);
	checkNumber(phone);
	checkEmail(email);
});

const showError = (input, mensaje) => {
	const formControl = input.parentElement;

	formControl.classList.add('error');

	const small = formControl.querySelector('small');
	small.innerText = mensaje;
};

const showSuccess = (input) => {
	const formControl = input.parentElement;
	formControl.className = 'checkout-form success';
};

const checkRequired = (inputArr = []) => {
	if (inputArr.length === 0) {
		return;
	}

	inputArr.forEach((input) => {
		if (input.value.trim() === '') {
			showError(input, 'El campo es obligatorio');
			return;
		}
		showSuccess(input);
	});
};

const checkNumber = (input) => {
	if (isNaN(input.value)) {
		showError(input, 'El campo debe ser numérico');
	} else {
		showSuccess(input);
	}
};

const checkEmail = (input) => {
	const re =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

	if (re.test(input.value.trim())) {
		showSuccess(input);
	} else {
		showError(input, 'El email no es válido');
	}
};
