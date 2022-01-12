const menuBurger = document.querySelector('.menu');
const btnBurger = document.querySelector('.btn-burger');
const imgBurger = document.querySelector('.btn-burger img');

btnBurger.addEventListener('click', mostrarOcultarBurger);

function mostrarOcultarBurger() {
	if (menuBurger.classList.contains('hide')) {
		menuBurger.classList.add('active');
		menuBurger.classList.remove('hide');
		imgBurger.src = 'assets/menu-active.svg';
	} else {
		menuBurger.classList.remove('active');
		menuBurger.classList.add('hide');
		imgBurger.src = 'assets/menu-inactive.svg';
	}
}
