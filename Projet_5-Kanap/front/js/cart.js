const cartItems = document.querySelector('#cart__items');
const totalQuantityContainer = document.querySelector('#totalQuantity');
const totalPriceContainer = document.querySelector('#totalPrice');
const inputNumber = document.getElementsByClassName('itemQuantity');

// Get basket from local storage
let getBasket = JSON.parse(localStorage.getItem('basket')) || [];

function renderBasket(data, product) {
	const html = `
	<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
    <div class="cart__item__img">
        <img src="${data.imageUrl}" alt="${data.altTxt}" />
    </div>
    <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${data.name}</h2>
            <p>${product.color}</p>
            <p>${data.price} €</p>
        </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Qté :</p>
                <input
                    type="number"
                    class="itemQuantity"
                    name="itemQuantity"
                    min="1"
                    max="100"
                    value="${product.quantity}"
                />
            </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
            </div>
        </div>
    </div>
</article>
	`;

	cartItems.insertAdjacentHTML('beforeend', html);
}

//Call Api to get product details
async function getData(product) {
	try {
		const response = await fetch(
			`http://localhost:3000/api/products/${product.id}`
		);
		const data = await response.json();
		renderBasket(data, product);
		deleteItemFromBasket();
		changeQuantityFromBasket();
		getTotalQuantity();
		getTotalPrice();
	} catch {
		err => alert(`Une erreur s'est produite: ${err}`);
	}
}

// Render each item from storage on the page

getBasket.forEach(basket => {
	getData(basket);
});

// Delete items from the basket
function deleteItemFromBasket() {
	const deleteButton = document.getElementsByClassName('deleteItem');

	for (let i = 0; i < deleteButton.length; i++) {
		const article = deleteButton[i].closest('article');
		const deleteID = article.getAttribute('data-id');
		const deleteColor = article.getAttribute('data-color');

		deleteButton[i].addEventListener('click', function (e) {
			e.preventDefault();
			getBasket = getBasket.filter(
				element => element.id !== deleteID || element.color !== deleteColor
			);
			localStorage.setItem('basket', JSON.stringify(getBasket));
			if (getBasket.length == 0) {
				localStorage.removeItem('basket');
				const emptyBasket = document.createElement('p');
				emptyBasket.textContent = 'Votre panier est vide';
				document.getElementById('cart__items').appendChild(emptyBasket);
				totalQuantityContainer.innerText = 0;
			}

			article.remove();
			getTotalQuantity();
			getTotalPrice();
		});
	}
}

// Change items quantity from basket
function changeQuantityFromBasket() {
	for (let i = 0; i < inputNumber.length; i++) {
		const article = inputNumber[i].closest('article');
		const dataId = article.getAttribute('data-id');
		const dataColor = article.getAttribute('data-color');

		inputNumber[i].addEventListener('change', e => {
			e.preventDefault();
			getBasket.forEach(basket => {
				if (basket.id === dataId && basket.color === dataColor) {
					basket.quantity = Number(inputNumber[i].value);
				}
			});
			localStorage.setItem('basket', JSON.stringify(getBasket));

			getTotalQuantity();
			getTotalPrice();
		});
	}
}

// Get total quantity and show it on the page
function getTotalQuantity() {
	let total = [];
	for (i = 0; i < inputNumber.length; i++) {
		total.push(Number(inputNumber[i].value));
		const totalQuantity = total.reduce(sum);

		function sum(a, b) {
			return a + b;
		}
		totalQuantityContainer.innerText = totalQuantity;
	}
}

// Get total price and show it on the page
function getTotalPrice() {
	let totalPrice = 0;
	totalPriceContainer.innerText = 0;

	getBasket.forEach(basket => {
		fetch(`http://localhost:3000/api/products/${basket.id}`)
			.then(res => res.json())
			.then(data => {
				totalPrice += data.price * basket.quantity;
				totalPriceContainer.innerText = totalPrice;
			});
	});
}
//////////////////////////////////////////////////////////////////////////////////////////////

const inputs = document.querySelectorAll('.cart__order__form__question input');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');

// Regex pour chaque elements du formulaire
const patterns = {
	firstName: /^[A-Za-zéèêï\s'-]+$/,
	lastName: /^[A-Za-zéèêï\s'-]+$/,
	address: /^[A-Za-zéèêïà\d\s'-]+$/,
	city: /^[A-Za-zzéèêïà\s'-]+$/,
	email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
};

// Message d'erreur pour chaque elements du formulaire
const errMsg = {
	firstName: 'Veuillez renseigner votre prenom.',
	lastName: 'Veuillez renseigner votre nom.',
	address: 'Veuillez renseigner votre adresse',
	city: 'Veuillez renseigner votre ville.',
	email: "Veuillez respecter le format de l'email (exemple@domaine.fr)",
};

// Remove the required attribute to add customs error messages
inputs.forEach(input => {
	input.removeAttribute('required');
});

// Validation function
function validate() {
	if (!patterns.firstName.test(firstName.value)) {
		firstName.nextElementSibling.innerText = errMsg.firstName;
		return false;
	} else {
		firstName.nextElementSibling.innerText = '';
	}

	if (!patterns.lastName.test(lastName.value)) {
		lastName.nextElementSibling.innerText = errMsg.lastName;
		return false;
	} else {
		lastName.nextElementSibling.innerText = '';
	}

	if (!patterns.address.test(address.value)) {
		address.nextElementSibling.innerText = errMsg.address;
		return false;
	} else {
		address.nextElementSibling.innerText = '';
	}

	if (!patterns.city.test(city.value)) {
		city.nextElementSibling.innerText = errMsg.city;
		return false;
	} else {
		city.nextElementSibling.innerText = '';
	}

	if (!patterns.email.test(email.value)) {
		email.nextElementSibling.innerText = errMsg.email;
		return false;
	} else {
		email.nextElementSibling.innerText = '';
	}
	return true;
}

// Create customer object to send with POST request
const contact = {};

// Create array with product id to send with POST request
let products = [];
getBasket.forEach(item => {
	products.push(item.id);
});

const order = { contact, products };

// Function to send POST request
async function sendData() {
	try {
		const res = await fetch(`http://localhost:3000/api/products/order`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(order),
		});
		const data = await res.json();
		window.location.replace(
			`../html/confirmation.html?orderId=${data.orderId}`
		);
	} catch {
		alert("Une erreur s'est produite.");
	}
}

// Form submit
const form = document.querySelector('.cart__order__form');

form.addEventListener('submit', e => {
	e.preventDefault();
	if (validate()) {
		contact.firstName = firstName.value;
		contact.lastName = lastName.value;
		contact.address = address.value;
		contact.city = city.value;
		contact.email = email.value;

		sendData();
	}
});
