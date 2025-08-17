export async function fetchProducts() {
    try {
        const response = await fetch('https://esencianativah.com/wp/wp-json/esencia_public/v1/products');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}


export async function fetchProductsbyCategory(category) {
    try {
        let URL_PRODUCTS='https://esencianativah.com/wp/wp-json/esencia_public/v1/products'

        if(category!="all"){
            URL_PRODUCTS+="?category="+category
        }

        const response = await fetch(URL_PRODUCTS);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}


export async function loadBuyCarrito(products) {
    
    if (!Array.isArray(products) || products.length === 0 ) {
        console.error('Los productos no son válidos o están vacíos.');
        return ;
    }

    try{
        const response = await fetch("https://esencianativah.com/wp/wp-json/esencia_public/v1/cart/sync", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({items: products}) 
        });

        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        return data;
    }catch(error){
        console.error('Error al cargar el carrito:', error);
        return ;
    }        
}