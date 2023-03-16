// Get elements from the html index page
const productContainer = document.querySelector('#items');

// Function to show dynamically the products
const renderProduct = function (data) {
	const html = `
    <a href="./product.html?id=${data._id}">
        <article>
            <img src="${data.imageUrl}" alt="${data.altTxt}, ${data.name}">
            <h3 class="productName">${data.name}</h3>
            <p class="productDescription">${data.description}</p>
        </article>
    </a>
`;
	productContainer.insertAdjacentHTML('beforeend', html);
};

//Call Api
function getProducts() {
	fetch('http://localhost:3000/api/products')
		.then(response => response.json())
		.then(data => {
			for (const item in data) {
				renderProduct(data[item]);
			}
		})
		.catch(err => alert(`Une erreur s'est produite, ${err}`));
}

getProducts();
