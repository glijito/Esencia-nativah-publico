import { fetchProductsbyCategory } from './conectors/product-conect.js';
import { getAnimationApi } from './loaders/loadingAnimation.js';

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

    if(categoria==null){  
        window.history.back();
    }
    
    loadCategoria(categoria)
    document.querySelector("#title-section").textContent = categoria=== "all" ?  "Tienda" : categoria;
})


async function loadCategoria(categoria){
    try{
        await customElements.whenDefined('dotlottie-wc');
        const player = document.getElementById('player-lottie');

        const ensureAPI = () =>
            new Promise(resolve => {
                if (player.dotLottie) return resolve(player.dotLottie);

                const check = setInterval(() => {
                    if (player.dotLottie) { clearInterval(check); resolve(player.dotLottie); }
                }, 20);
            });

        const dot = await ensureAPI();
        const products = await fetchProductsbyCategory(encodeURIComponent(categoria))

        cargarProductosCategoria(products)
        dot.destroy();      
        player.style.display="none"
    }catch(error){
        console.log("Error al cargar los productos:",error )
    }
}


function cargarProductosCategoria(products){
    const container = document.querySelector('#container-items');
    const template = document.querySelector('#template-card');

    sessionStorage.setItem("products", JSON.stringify(products));
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