import {loadItemsOnCarrito} from "./carrito.js";
import {fetchProductsbyCategory} from "./conectors/product-conect.js";


document.addEventListener("DOMContentLoaded", async function(){

    const containerItemsCategory = document.querySelectorAll(".container-product-list")[0]
    const containerItemVistos = document.querySelectorAll(".container-product-list")[1]

    //////////////////////////CARGAR PRODUCTO EN PAGINA /////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    const params = new URLSearchParams(window.location.search);
    const idProduct = params.get("id");

    let products = JSON.parse(sessionStorage.getItem("products")) || [];
    const product = products.find(item => item.id === Number(idProduct));

    if (product) {
        let  section_title= document.getElementById("title-section")
        section_title.textContent = `Tienda > ${product.categories[0]}`
        section_title.style.cursor = "pointer";
        section_title.addEventListener("click", function() {
            window.location.href = "../pages/tienda.html?category=" + product.categories[0];
        })

        document.getElementById("title-item").textContent =  `${product.categories[0]} - ${product.meta["coleccion"]}`;
        document.getElementsByClassName("subtitle-item")[1].textContent = `REF: ${product.name}`;
        document.getElementById("description-product").textContent = product.meta["descripcion"];
        document.getElementById("price-item").textContent = `$${product.meta["precio"]} MXN`;
        document.getElementById("detail-product").textContent = product.meta["medida"];

        let imagesGalery =  document.getElementsByClassName("producto-secundary");
        let principalImage =  document.getElementsByClassName("producto-principal");

        const containerDesktop = document.querySelector("#container-images-product-desktop");
        const isDesktopVisible = window.getComputedStyle(containerDesktop).display !== "none";
        const principalIdx = isDesktopVisible ? 0 : 1;
        const galeryOffset = isDesktopVisible ? 0 : 3;

        principalImage[principalIdx].src = product.images[0].url || 'assets/placeholder.jpg';
        for (let i = 0; i < product.images.length - 1; i++) {
            imagesGalery[i + galeryOffset].src = product.images[i + 1].url || '';
        }
    }   

    //////////////////////////AGREGAR AL CARRITO DE COMPRAS /////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    const addToCartButton = document.querySelectorAll(".add-to-cart");
    addToCartButton.forEach(addtocart =>{
        addtocart.addEventListener("click", function() {
            if(product){
                console.log('Producto agregado al carrito:', product);
                let carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
                carritoActual.push({
                    product_name: `${product.categories[0]} - ${product.meta["coleccion"]}`,
                    id_product:product.id, 
                    image: product.images[0].url, 
                    price: product.meta["precio"], 
                    porcentage: product.meta["precioPromocion"],
                    isPromocion: product.meta["activaPromocion"],
                    stock: product.meta["stockProduct"],
                    quantity: 1
                });
                
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


    //////////////////////////CARGAR PRODUCTOS PARECIDOS/////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    try{
        const productCategory=  await fetchProductsbyCategory(product.categories[0])
        const template = document.querySelector('#template-product');

        Array.from(productCategory).forEach(item => {
            if(item.id !== product.id){
                const clone = template.content.cloneNode(true);
                clone.querySelector('img').src = item.images[0].url || 'assets/placeholder.jpg';
                clone.getElementById('product-name').textContent = `${item.categories[0]} - ${item.meta["coleccion"]}`;
                clone.getElementById('product-descrip').textContent = item.meta["descripcion"];
                clone.getElementById('product-price').textContent = `$${item.meta["precio"]} MXN`;
                
                clone.getElementById('boton-comprar').href = `../pages/producto.html?id=${item.id}`;
                containerItemsCategory.appendChild(clone);
            }
        })
    }catch(error){
        console.error('Error al cargar los productos', error);
        return;
    }

    //////////////////////////CARGAR PRODUCTOS RECIEN VISTOS/////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    let recentlyProducts = JSON.parse(sessionStorage.getItem("recentlyViewProducts")) || [];

    if (!recentlyProducts.some(item => item.id === product.id)) {
        if (recentlyProducts.length >= 3) {
            recentlyProducts.shift(); 
        }
        recentlyProducts.push(product);
        sessionStorage.setItem("recentlyViewProducts", JSON.stringify(recentlyProducts));
    }
    if (recentlyProducts.length > 0) {
        const template = document.querySelector('#template-product');
        recentlyProducts
            .filter(item => item.id !== product.id)
            .forEach(item => {
                const clone = template.content.cloneNode(true);
                clone.querySelector('img').src = item.images[0].url || 'assets/placeholder.jpg';
                clone.getElementById('product-name').textContent = `${item.categories[0]} - ${item.meta["coleccion"]}`;
                clone.getElementById('product-descrip').textContent = item.meta["descripcion"];
                clone.getElementById('product-price').textContent = `$${item.meta["precio"]} MXN`;
                clone.getElementById('boton-comprar').href = `../pages/producto.html?id=${item.id}`;
                containerItemVistos.appendChild(clone);
            });
    } else {
        // Si solo hay uno, oculta la sección
        document.querySelectorAll(".container-products-section")[1].style.display = "none";
    }

})