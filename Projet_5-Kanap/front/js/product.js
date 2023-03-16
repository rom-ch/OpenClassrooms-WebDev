// Get elements from the html product page
const productImg = document.querySelector('.item__img');
const productName = document.querySelector('#title');
const productPrice = document.querySelector('#price');
const productDescription = document.querySelector('#description');
const productColors = document.querySelector('#colors');

// Function to show dynamically the product
const productDetails = function (data) {
	const imgHtml = `
	<img src="${data.imageUrl}" alt="${data.altTxt}" />
	`;
	productImg.insertAdjacentHTML('beforeend', imgHtml);

	productName.innerText = `${data.name}`;
	productPrice.innerText = `${data.price}`;
	productDescription.innerText = `${data.description}`;
	data.colors.forEach(color => {
		const colorsHtml = `
		<option value="${color}">${color}</option>
		`;
		productColors.insertAdjacentHTML('beforeend', colorsHtml);
	});
};

// Get the Id from the URL
const str = window.location.href;
const url = new URL(str);
const urlId = url.searchParams.get('id');

// Call Api
function loadProduct() {
	fetch(`http://localhost:3000/api/products/${urlId}`)
		.then(response => response.json())
		.then(data => {
			productDetails(data);
		})
		.catch(err => alert(`Une erreur s'est produite, ${err}`));
}

loadProduct();

// Functions for Local Storage
function saveBasket(basket) {
	localStorage.setItem('basket', JSON.stringify(basket));
	alert('Produit(s) ajouté(s) au panier.');
}

function getBasket() {
	let basket = localStorage.getItem('basket');
	if (basket == null) {
		return [];
	} else {
		return JSON.parse(basket);
	}
}

function addBasket(product) {
	let basket = getBasket();
	let existingProduct = basket.find(
		p => p.id == product.id && p.color == product.color
	);
	if (
		existingProduct != undefined &&
		existingProduct.quantity + Number(productQuantity.value) > 100
	) {
		alert(
			`Plus assez de place dans le panier, vous pouvez ajouter seulement ${
				100 - existingProduct.quantity
			} fois ce produit.`
		);
	} else if (existingProduct != undefined) {
		existingProduct.quantity += Number(productQuantity.value);
		saveBasket(basket);
	} else {
		product.quantity = Number(productQuantity.value);
		basket.push(product);
		saveBasket(basket);
	}
}

// Get elements from the html product page
const addProductToCart = document.querySelector('#addToCart');
const productQuantity = document.querySelector('#quantity');

// Event listener to add product to basket
let product = {};
addProductToCart.addEventListener('click', function () {
	if (productQuantity.value === '0' || productColors.value === '') {
		alert('Veuillez renseigner une quantité et une couleur.');
		return;
	} else if (productQuantity.value > 100) {
		alert('Vous ne pouvez pas ajouter plus de 100x ce produit.');
		return;
	} else if (!Number.isInteger(Number(productQuantity.value))) {
		alert('Veuiller indiquer une valeur entière.');
		return;
	} else {
		product.id = urlId;
		product.quantity = Number(productQuantity.value);
		product.color = productColors.value;
	}

	addBasket(product);

	// Reset initial values in the input fields
	productColors.value = '';
	productQuantity.value = 0;
});
