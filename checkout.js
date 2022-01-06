// ========== CHECKOUT ==========

const tBodyItems = document.querySelector('#tbody-items');
const tFootSubTotal = document.querySelector('#tfoot-subtotal');
const orderTotal = document.querySelector('#order-total');

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

	tFootSubTotal.innerHTML = ` 
    <td>subtotal:</td>
    <td>$${totalCheckout}</td>
    `;

	// Imprimimos el total (dsp sería + el envio)

	orderTotal.innerHTML = `<th>total:</th>
    <th>$${totalCheckout}</th>`;

	console.log(totalCheckout);
}

feedCheckoutItems(JSON.parse(localStorage.getItem('data')));

console.log('pepe');
