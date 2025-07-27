document.addEventListener("DOMContentLoaded", function(){

    ///////// SECCION FILTROS DE PRODUCTOS /////////
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
})

function openModal(modal) {
    modal.style.right = '0';
}

function closeModal(modal) {
    modal.style.right = '-100%';
}