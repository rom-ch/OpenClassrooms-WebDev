const str = window.location.href;
const url = new URL(str);
const urlId = url.searchParams.get('orderId');

document.getElementById('orderId').innerText = urlId;
