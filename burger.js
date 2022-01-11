const menuBurger = document.querySelector('.menu');
console.log(menuBurger);
const btnBurger = document.querySelector('.btn-burger');
console.log(btnBurger);
const imgBurger = document.querySelector('.btn-burger img');
console.log(imgBurger);

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
