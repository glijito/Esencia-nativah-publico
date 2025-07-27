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

   
});



