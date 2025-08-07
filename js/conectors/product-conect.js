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
        const response = await fetch('https://esencianativah.com/wp/wp-json/esencia_public/v1/products?category=' + category);
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
