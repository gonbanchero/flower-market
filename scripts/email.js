const formSubmit = document.querySelector('#submit-form');

formSubmit.addEventListener('click', (e) => {
	const formName = document.querySelector('#nombre');
	const formEmail = document.querySelector('#email-form');
	const formConsulta = document.querySelector('#consulta-form');
	const small = document.querySelector('#small');

	e.preventDefault();

	let isRequired = checkRequired([formName, formEmail, formConsulta]),
		isEmail = checkEmail(formEmail);

	let isFormValid = isRequired && isEmail;

	if (isFormValid) {
		sendEmail(formName.value, formEmail.value, formConsulta.value);
	}

	function sendEmail(name, email, message) {
		emailjs
			.send('service_55y83p8', 'template_gefl8h8', {
				from_name: name,
				to_name: email,
				message: message,
			})
			.then(
				() => {
					small.style.visibility = 'visible';
					formName.value = '';
					formEmail.value = '';
					formConsulta.value = '';
					formControl.className = 'contact-form';
				},
				(err) => {
					alert(JSON.stringify(err));
				}
			);
	}
});

const showError = (input, mensaje) => {
	const formControl = input.parentElement;

	formControl.classList.add('error');

	const small = formControl.querySelector('small');
	small.innerText = mensaje;
};

const showSuccess = (input) => {
	const formControl = input.parentElement;
	formControl.className = 'contact-form success';
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
