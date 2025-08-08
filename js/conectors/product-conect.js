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
        let URL_PRODUCTS="'https://esencianativah.com/wp/wp-json/esencia_public/v1/products"

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
