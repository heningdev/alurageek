const apiUrl = 'http://localhost:3000/products';

async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        return [];
    }
}

async function addProductToApi(newProduct) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });

        return await response.json();
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        return null;
    }
}

async function deleteProduct(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Não foi possível excluir o produto.');
        }

        return true;
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        return false;
    }
}

export { fetchProducts, addProductToApi, deleteProduct };
