import { fetchProductsbyCategory } from './conectors/product-conect.js';

document.addEventListener("DOMContentLoaded", function(){

    /////////////////// SECCION FILTROS DE PRODUCTOS ////////////////////////////
    let isModalActivate = false;
    let modal=document.querySelector(".filtro-products")
    let btnFiltro=document.querySelector("#btn-filters")

    btnFiltro.addEventListener("click", ()=>{
        openModal(modal);
        isModalActivate= true;
    })
    
    document.addEventListener("click", function(event){
        if(!modal.contains(event.target) 
                && isModalActivate 
                && !btnFiltro.contains(event.target)) {
            closeModal(modal);
            isModalActivate = false;
        }
    })


    /////////////////// SECCION PRODUCTOS ////////////////////////////
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get("category");
    loadCategoria(categoria)
})


function loadCategoria(categoria){
    fetchProductsbyCategory(encodeURIComponent(categoria))
    .then(products =>{
        cargarProductosCategoria(products)
    }).catch(erro=>{
        console.error("Error al cargar los productos:",erro)
    })
}


function cargarProductosCategoria(products){
    const container = document.querySelector('#container-items');
    const template = document.getElementById('.product-card');

    products.forEach(product => {

        const clone = template.content.cloneNode(true);

        clone.querySelector('img').src = product.images[0].url || 'assets/placeholder.jpg';
        clone.getElementById('name-product').textContent = product.name;
        clone.getElementById('descrip-product').textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, blanditiis?";
        clone.getElementById('price-product').textContent = `$${product.price} MXN`;

        clone.querySelector('.boton-comprar').href = `/pages/producto.html?id=${product.id}`;
        container.appendChild(clone);
    })
}


function openModal(modal) {
    modal.style.right = '0';
}

function closeModal(modal) {
    modal.style.right = '-100%';
}