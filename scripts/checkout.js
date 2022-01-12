// ========== CHECKOUT ==========

const tBodyItems = document.querySelector('#tbody-items');
const tFootSubTotal = document.querySelector('#tfoot-subtotal');
const orderTotal = document.querySelector('#order-total');
const tfootShipping = document.querySelector('#tfoot-shipping');
const mercadoPago = document.querySelector('#mercado-pago');
const efectivo = document.querySelector('#efecivo');

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
const additionalInfo = document.querySelector('#additional-info');

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
	let valid = false;

	if (inputArr.length === 0) {
		return;
	}

	inputArr.forEach((input) => {
		if (input.value.trim() === '') {
			showError(input, 'El campo es obligatorio');
			return;
		}
		showSuccess(input);
		valid = true;
	});
	return valid;
};

const checkNumber = (input) => {
	let valid = false;

	if (isNaN(input.value) || input.value === '') {
		showError(input, 'El campo debe ser numérico');
	} else {
		showSuccess(input);
		valid = true;
	}
	return valid;
};

const checkEmail = (input) => {
	let valid = false;
	const re =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

	if (re.test(input.value.trim())) {
		showSuccess(input);
		valid = true;
	} else {
		showError(input, 'El email no es válido');
	}
	return valid;
};

// Función iniciadora del checkout

finalizarCompra.addEventListener('click', (e) => {
	e.preventDefault();

	let isRequired = checkRequired([
			firstName,
			lastName,
			email,
			adress,
			phone,
			city,
		]),
		isNumber = checkNumber(phone),
		isEmail = checkEmail(email);

	// console.log(isRequired, isNumber, isEmail);

	let isFormValid = isRequired && isNumber && isEmail;

	if (isFormValid) {
		window.open(
			`https://api.whatsapp.com/send/?phone=5491173660749&text=PEDIDO%3A+%2A${Math.floor(
				Math.random() * 100 + 1
			)}%2A%0A%0A+${JSON.parse(localStorage.getItem('data'))
				.map(
					(products) =>
						`%E2%80%94 ${products.name} > %2A${products.price}%2A%0A`
				)
				.join(' ')}%0A%2ATotal%3A+%24${JSON.parse(
				localStorage.getItem('totalCart')
			)}%2A%0A%0ANombre%3A+%2A${firstName.value}%2A%0ATeléfono%3A+%2A${
				phone.value
			}%2A%0AEmail%3A+%2A${
				email.value
			}%2A%0AInformación adicional%3A+%2A${
				additionalInfo.value
			}%2A%0A&app_absent=0`,
			'_blank'
		);

		// location.href = `https://api.whatsapp.com/send/?phone=5491173660749&text=PEDIDO%3A+%2A${Math.floor(
		// 	Math.random() * 100 + 1
		// )}%2A%0A%0A+${JSON.parse(localStorage.getItem('data'))
		// 	.map(
		// 		(products) =>
		// 			`%E2%80%94 ${products.name} > %2A${products.price}%2A%0A`
		// 	)
		// 	.join(' ')}%0A%2ATotal%3A+%24${JSON.parse(
		// 	localStorage.getItem('totalCart')
		// )}%2A%0A%0ANombre%3A+%2A${firstName.value}%2A%0ATeléfono%3A+%2A${
		// 	phone.value
		// }%2A%0AEmail%3A+%2A${email.value}%2A%0AInformación adicional%3A+%2A${
		// 	additionalInfo.value
		// }%2A%0A&app_absent=0`;
	}
});
