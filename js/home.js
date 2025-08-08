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

    ///////////// EVENTOS PARA CARRUSEL PRODUCTOS DESTACADOS ////////////////////
    function cargarProductosHome() {

        fetchProducts().then(products => {
            cargarProductosDestacados(products)
            cargarCategorias(products.slice(0,3))
        }).catch(error => {
            console.error('Error al cargar productos destacados:', error);
        });
    }

    function cargarProductosDestacados(products){
        const container = document.querySelector('.slider-productos');
        const template = document.querySelector('.product-card');

        products.forEach(product => {

            const clone = template.content.cloneNode(true);

            clone.querySelector('img').src = product.images[0].url || 'assets/placeholder.jpg';
            clone.querySelector('img').alt = product.name;
            clone.querySelector('.nombre').textContent = product.name;
            clone.querySelector('.descripcion-item').textContent = "Pieza exclusiva hecha a mano."; // o usa una propiedad si tienes descripción
            clone.querySelector('.precio').textContent = `$${product.price} MXN`;

            clone.querySelector('.boton-comprar').href = `/pages/producto.html?id=${product.id}`;
            container.appendChild(clone);
        })
    }


    function cargarCategorias(relevantsProduct){
        const template = document.getElementById('container-itemspreview');
        console.log(relevantsProduct)
        renderProductCard(template, "product-principal", relevantsProduct[0]);
        renderProductCard(template, "products-secundary", relevantsProduct[1],0);
        renderProductCard(template, "products-secundary", relevantsProduct[2],1);
    }


    function renderProductCard(template,containerSelector, product, index=0) {

        const container = template.getElementsByClassName(containerSelector)[index];
        
        const img = container.querySelector("img");
        const info = container.querySelectorAll("p");

        if (product) {
            img.src = product.images[0].url;
            if (info[0]) info[0].innerHTML = product.name;
            if (info[1]) info[1].innerHTML = `$${product.price} MXN`;
        } else {
            img.src = 'assets/placeholder.jpg'; 
        }
    }

    function main(){
        cargarProductosHome();
    }
    
    main();
});



