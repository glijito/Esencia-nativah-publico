import {loadItemsOnCarrito,buyShopCarItems} from "./carrito.js";
import { fetchProducts } from './conectors/product-conect.js';

let isSelectItem = false;

document.addEventListener("DOMContentLoaded", async function(){

    /////////////// CARRITO DE COMPRAS ////////////////////////////
    loadItemsOnCarrito();

    ////////////////VARIABLES GLOBALES///////////////////////////////
    let isModalActivate= false
    const modal= document.querySelector(".modal");


    ////////////// HEADER DINAMICO X PAGES /////////////////////////////
    let isPagePrincipal = true;    

    if(window.location.pathname === "/pages/tienda.html" || window.location.pathname === "/pages/producto.html") {
        isPagePrincipal = false;
        loadHeaderWhite()
    }
    
    if(window.location.pathname === "/") {
        isPagePrincipal = true;
        loadHeaderBlack()
    }


    ////////////////  CARGA DE MODAL PHONE //////////////////////////
    const bntMenuPhone = document.querySelector("#menu-nativa-phone");
    const btnCloseModalPhone = document.querySelector("#button-close-phone");

    function abrirMenuPhone() {
        if (!isModalActivate) {
            loadHeaderWhite()
            modal.style.left = '0';
            isModalActivate = true;
        }
    }

    bntMenuPhone.addEventListener("click", abrirMenuPhone);

    btnCloseModalPhone.addEventListener("click", () => {
        modal.style.left = '-150rem';
        isModalActivate = false;
    })

    //////////////////////////  CARGA DE MODAL  ON OPTIONES  //////////////////////////

    const menuitems= document.querySelector("#select-menu")

    menuitems.addEventListener("click", ()=>{

        if(!isModalActivate){
            modal.style.top = '5em'; 
            document.body.style.overflow = 'hidden';
            menuitems.style.transform = "rotate(180deg)"        
            loadHeaderWhite()
            isModalActivate=true
        }else{
            menuitems.style.transform = "rotate(360deg)"
            modal.style.top = '-30em'; 
            document.body.style.overflow = 'auto';
            if(isPagePrincipal){
                loadHeaderBlack()
            }
            isModalActivate=false
        }
    })


 //////////////////////////  TOOGLE  //////////////////////////

    document.querySelectorAll('.footer-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const list = toggle.nextElementSibling;
            list.classList.toggle('active');
            const arrow = toggle.querySelector('.arrow');
            arrow.style.transform = list.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
        });
    });

 //////////////////////////  CLICK VIEW ICON- CART  //////////////////////////
    let carrito = document.querySelector('#car-products')
    let isCartOpen = false;

    document.querySelector('#bag-icon-header').addEventListener('click', () => {
        carrito.style.right = '0';
        isCartOpen=true
    });

    document.addEventListener("click", function(event){
        if(!carrito.contains(event.target) 
                && isCartOpen 
                && !document.querySelector('#bag-icon-header').contains(event.target)) {
            carrito.style.right = '-55em';
            isCartOpen = false;
        }
    })

    document.querySelector('#close-car').addEventListener('click', () => {
        carrito.style.right = '-55em';
        isCartOpen = false;
    })

    ////////////////  COMPRA DE PRODUCTOS ON SHOP  //////////////////////////
    document.querySelector("#pay-car").addEventListener("click", function() {
        if(!buyShopCarItems()){
            Swal.fire({
                title: "No se pudo realizar la compra",
                text: "Favor de intentar más tarde.",
                icon: "error"
            });
        }
        this.closest('#car-products').style.right = '-55em';
    })

    ////////////////  CARGAR NEW PRODUCTS  //////////////////////////
    try{
        const products = await fetchProducts()
        cargarNewItems(products.slice(0,3))
    }catch(error){
        console.error("Error al cargar los productos", error)
    }

});


function cargarNewItems(relevantsProduct){
    const template = document.getElementById('container-itemspreview');
    renderProductCard(template, "product-principal", relevantsProduct[0]);
    renderProductCard(template, "products-secundary", relevantsProduct[1],0);
    renderProductCard(template, "products-secundary", relevantsProduct[2],1);
}


function renderProductCard(template,containerSelector, product, index=0) {

    const container = template.getElementsByClassName(containerSelector)[index];
    container.style.cursor = "pointer";

    container.addEventListener("click", function() {
        sessionStorage.setItem("products", JSON.stringify([product]));
        window.location.href = `../pages/producto.html?id=${product.id}`;
    })
    const img = container.querySelector("img");
    const info = container.querySelectorAll("p");

    if (product) {
        img.src = product.images[0].url;
        if (info[0]) info[0].innerHTML = `${product.categories[0]} - ${product.meta["coleccion"]}`;
        if (info[1]) info[1].innerHTML = `$${product.meta["precio"]} MXN`;
    } else {
        img.src = 'assets/placeholder.jpg'; 
    }
}


function loadHeaderWhite(){
    document.documentElement.style.setProperty('--color-primario', 'black');
    document.documentElement.style.setProperty('--bg-header', 'white');
    document.documentElement.style.setProperty('--img-flecha', 'url(../assets/img/despliegue_abajo_negro.svg)');
    document.documentElement.style.setProperty('--img-bag', 'url(../assets/img/bolsa_compras_negro.svg)');
    document.documentElement.style.setProperty('--img-search', 'url(../assets/img/buscar_negro.svg)');
    document.documentElement.style.setProperty('--img-nativa', 'url(../assets/img/logoNativah_negro.svg)');
    document.documentElement.style.setProperty('--img-menu-phone', 'url(../assets/img/icono_hamburguesa_negro.svg)');
}


function loadHeaderBlack(){
    document.documentElement.style.setProperty('--color-primario', 'white');
    document.documentElement.style.setProperty('--bg-header', '#1a1a1a00');
    document.documentElement.style.setProperty('--img-flecha', 'url(../assets/img/despliegue_abajo_blanco.svg)');
    document.documentElement.style.setProperty('--img-bag', 'url(../assets/img//bolsa_compras_blanco.svg)');
    document.documentElement.style.setProperty('--img-search', 'url(../assets/img/buscar_blanco.svg)');
    document.documentElement.style.setProperty('--img-nativa', 'url(../assets/img/logoNativah_blanco.svg)');
    document.documentElement.style.setProperty('--img-menu-phone', 'url(../assets/img/icono_hamburguesa_blanco.svg)');
}

function itemActivateMenu(itemSection){
    if(!isSelectItem){
        itemSection.style.height = "10em";
        isSelectItem = true;
    }else{
        itemSection.style.height = "1.5em";
        isSelectItem = false;
    }
}
