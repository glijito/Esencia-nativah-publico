import {loadItemsOnCarrito} from "./carrito.js";

document.addEventListener("DOMContentLoaded", function(){

    //////////////////////////CARGAR PRODUCTO EN PAGINA /////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    const params = new URLSearchParams(window.location.search);
    const idProduct = params.get("id");

    let products = JSON.parse(sessionStorage.getItem("products")) || [];
    const product = products.find(item => item.id === Number(idProduct));

    if (product) {
        document.getElementById("title-section").textContent = `Tienda > ${product.categories[0]}`
        document.getElementById("title-item").textContent =  `${product.categories[0]} - ${product.meta["coleccion"]}`;
        document.getElementsByClassName("subtitle-item")[1].textContent = `REF: ${product.name}`;
        document.getElementById("description-product").textContent = product.meta["descripcion"];
        document.getElementById("price-item").textContent = `$${product.meta["precio"]} MXN`;
        document.getElementById("detail-product").textContent = product.meta["medida"];

        let imagesGalery =  document.getElementsByClassName("producto-secundary");
        let principalImage =  document.getElementsByClassName("producto-principal");

        principalImage[0].src = product.images[0].url || 'assets/placeholder.jpg';
        for(let i = 0; i < product.images.length-1; i++) {
            imagesGalery[i].src = product.images[i+1].url || 'assets/placeholder.jpg';
        }
    }

    //////////////////////////AGREGAR AL CARRITO DE COMPRAS /////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    const addToCartButton = document.getElementById("add-to-cart");
    addToCartButton.addEventListener("click", function() {
        if(product){
            let carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
            carritoActual.push({product_name:product.name, id_product:product.id, image: product.images[0].url, price: 500, quantity: 1});
            localStorage.setItem('carrito', JSON.stringify(carritoActual));

            Swal.fire({
                title: "Producto agregado",
                text: "El producto ha sido agregado al carrito.",
                icon: "success"
            });

             loadItemsOnCarrito();
        }
    });
})