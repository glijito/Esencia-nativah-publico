import { loadBuyCarrito } from "./conectors/product-conect.js";

const API_BASE = window.location.hostname.includes('localhost') 
    ? 'http://localhost:3000' 
    : 'https://esencianativah.com/wp/wp-json/esencia_public/v1';

const ENVIO_COST = 200; // Costo de envío fijo  

export function loadItemsOnCarrito(){

    let carrito = JSON.parse(localStorage.getItem("carrito"));
    const subtotalInfo = document.getElementById("subtotal-information");
    const loadEmpty = document.getElementById("product-empty-load");

    if (!Array.isArray(carrito) || carrito.length === 0) {
        localStorage.setItem('carrito', JSON.stringify([]));
        if (subtotalInfo) subtotalInfo.style.display = "none";
        if (loadEmpty) loadEmpty.style.display = "block";
        return;
    } else {
        if (subtotalInfo) subtotalInfo.style.display = "block";
        if (loadEmpty) loadEmpty.style.display = "none";
    }

    let containerCart = document.querySelector("#container-products");
    const template = document.querySelector('.producto-template');
    containerCart.innerHTML = "";

    carrito.forEach(item => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.img-product img').src = item.image || 'assets/placeholder.jpg';
        clone.querySelector('.product-name').textContent =  item.product_name;
        clone.querySelector('.product-price').textContent = `$${item.price} MXN`;

        clone.querySelector('.delete-product img').addEventListener('click', function() {
            removeItemCarrito(item.id_product);
            this.closest('.product-on-list').remove();
        });

        for(let i = 0; i < item.stock; i++) {
            const countItem = document.createElement('option');
            countItem.className = 'count-product';
            countItem.textContent = i+1;
            clone.querySelector('.select-quanty-items').appendChild(countItem);
        }

        clone.querySelector('.select-quanty-items').addEventListener('change', function() {
            const selectedQuantity = parseInt(this.value, 10);
            item.quantity = selectedQuantity;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            calcularTotalCarrito();
        })

         containerCart.appendChild(clone);
    });

    calcularTotalCarrito();
}

function calcularTotalCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let subtotal = 0;

    carrito.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    subtotal+= ENVIO_COST
    document.getElementById("price-subtotal").textContent = `$${subtotal.toFixed(2)} MXN`;
    document.getElementById("total-price").textContent = `$${subtotal.toFixed(2)} MXN`;
}

function removeItemCarrito(id_product){
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(item => item.id_product !== id_product);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    calcularTotalCarrito()
    loadItemsOnCarrito()
}


export async function buyShopCarItems() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) {
        console.error('El carrito está vacío.');
        return false;
    }

    let pasarelaCarrito=[]
    Array.from(carrito).forEach(item => {
       pasarelaCarrito.push({
            product_id: Number(item.id_product),
            qty: Number(item.quantity),
        });
    })

    const response = await loadBuyCarrito(pasarelaCarrito)
    console.log('Respuesta de la compra:', response);
    if(!response || !response.ok || (response.count ?? 0) < 1 ) {
        console.error('Error al realizar la compra:', response);
        return false;
    }
   /*
    const items = [
        { product_id: 302, qty: 2 },
        { product_id: 311, qty: 1 }
    ]
    const json = JSON.stringify(items);
    const b64  = btoa(unescape(encodeURIComponent(json))); // base64 seguro
    const url  = `https://esencianativah.com/wp/?esync=${b64}`;*/
    window.location.href ='https://esencianativah.com/wp/checkout/';
    window.location.href = url;
    return true;
}