import { fetchProducts } from './conectors/product-conect.js';


document.addEventListener('DOMContentLoaded', function() {

    ////////////// EVENTOS PARA CARRUSEL HERO BANNER /////////////////////////////
    document.getElementById('prev').addEventListener('click', function() {
        console.log('Anterior');
    });
    
    document.getElementById('next').addEventListener('click', function() {
        console.log('Siguiente');
    });


    ///////////// EVENTOS PARA CARRUSEL PRODUCTOS DESTACADOS ////////////////////
    function actualizarFlechas() {
        btnAnterior.disabled = contenedor.scrollLeft <= 0;
        btnSiguiente.disabled = contenedor.scrollLeft + contenedor.offsetWidth >= contenedor.scrollWidth;
    }    

    const contenedor = document.querySelector('.slider-productos');
    const btnAnterior = document.querySelector('.anterior');
    const btnSiguiente = document.querySelector('.siguiente');

    btnAnterior.addEventListener('click', () => {
        contenedor.scrollBy({
            left: -300, // mueve 300px hacia la izquierda
            behavior: 'smooth'
        });
        setTimeout(actualizarFlechas, 100); // Espera a que el scroll termine para actualizar las flechas
    });

    btnSiguiente.addEventListener('click', () => {
        contenedor.scrollBy({
            left: 300, // mueve 300px hacia la derecha
            behavior: 'smooth'
        });
        setTimeout(actualizarFlechas, 100); // Espera a que el scroll termine para actualizar las flechas
    });

    ///////////// CARGA ITEMS PARA CARRUSEL PRODUCTOS DESTACADOS ////////////////////
    async function cargarProductosHome() {
        try{
            const products = await fetchProducts()
            cargarProductosDestacados(products)
        }catch(error){
            console.error("Error al cargar los productos", error)
        }
    }

    function cargarProductosDestacados(products){
        const container = document.querySelector('.slider-productos');
        const template = document.querySelector('#producto-template');

        products.forEach(product => {
            const clone = template.content.cloneNode(true);

            clone.querySelector('img').src = product.images[0].url || 'assets/placeholder.jpg';
            clone.querySelector('img').alt = product.meta["coleccion"];
            clone.querySelector('.nombre').textContent =`${product.categories[0]} - ${product.meta["coleccion"]}`;
            clone.querySelector('.descripcion-item').textContent = "Pieza exclusiva hecha a mano."; 

            clone.querySelector('.boton-explorar').href = `/pages/tienda.html?category=${product.categories[0]}`;
            container.appendChild(clone);
        })
    }

    function main(){
        cargarProductosHome();
    }
    
    main();
});



