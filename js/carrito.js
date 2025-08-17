import { loadBuyCarrito } from "./conectors/product-conect.js";
const API_BASE = window.location.hostname.includes('localhost') 
    ? 'http://localhost:3000' 
    : 'https://esencianativah.com/wp/wp-json/esencia_public/v1';

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
        clone.querySelector('.product-name').textContent = item.product_name;
        clone.querySelector('.product-price').textContent = `Precio: $${item.price} MXN`;
        clone.querySelector('.count-product').textContent = item.quantity;

        clone.querySelector('.delete-product img').addEventListener('click', function() {
            removeItemCarrito(item.product_name);
            this.closest('.product-on-list').remove();
        });

        clone.querySelector(".plus-product").addEventListener('click', function() {
            addItemOnCarrito(this, item.product_name);
        });

        clone.querySelector(".minus-product").addEventListener('click', function() {
            lessItemOnCarrito(this, item.product_name);
        });

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

    document.getElementById("subtotal").textContent = `Subtotal: $${subtotal.toFixed(2)} MXN`;
    document.getElementById("total").textContent = `Total: $${subtotal.toFixed(2)} MXN`;
}

function addItemOnCarrito(button, element) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let count_product = button.closest('.product-on-list').querySelector(".count-product");
    let item = carrito.find(item => item.product_name === element);

    if(item){
        item.quantity = item.quantity + 1;
        count_product.textContent = item.quantity;   
        localStorage.setItem("carrito", JSON.stringify(carrito));
        calcularTotalCarrito();
    }
}

function lessItemOnCarrito(button, element) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let count_product = button.closest('.product-on-list').querySelector(".count-product");
    let item = carrito.find(item => item.product_name === element);

    if(item){
        if(item.quantity > 1) {
            item.quantity = item.quantity -1;
            count_product.textContent = item.quantity;
            localStorage.setItem("carrito", JSON.stringify(carrito));
            calcularTotalCarrito();
        }else{
            removeItemCarrito(element)
            button.closest('.product-on-list').remove();
        }
    }
}

function removeItemCarrito(product_name){
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(item => item.product_name !== product_name);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    calcularTotalCarrito()
    loadItemsOnCarrito()
}


export async function buyShopCarItems() {
    /*let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
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
    if(!response || !response.ok || (response.count ?? 0) < 1 ) {
        console.error('Error al realizar la compra:', response);
        return false;
    }
  */
    const items = [{ product_id: 302, qty: 2 }]; // lo que tengas en tu carrito local
    const payload = btoa(JSON.stringify(items));
    const bridge = `https://esencianativah.com/wp/?esync=${encodeURIComponent(payload)}`;
    window.location.href = bridge;  // el servidor agrega y te manda a /checkout

    //window.location.href ='https://esencianativah.com/wp/checkout/';
    return true;
}