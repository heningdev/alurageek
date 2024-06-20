import { fetchProducts, addProductToApi, deleteProduct } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const products = await fetchProducts();
    products.forEach(appendProduct);
});

// Função para adicionar um novo produto ao DOM
function appendProduct(product) {
    const productContainer = document.getElementById('lista-produtos');

    const productCard = document.createElement('div');
    productCard.className = 'card-produto';
    productCard.id = `product-${product.id}`;
    productCard.innerHTML = `
        <img src="${product.imageUrl}" alt="Imagem do Produto">
        <div class="descricao-produto">
            <h3 class="nome-produto">${product.name}</h3>
            <div class="card-footer">
                <p class="preco-produto">R$${product.price}</p>
                <i class="fa-solid fa-trash-can" data-product-id="${product.id}"></i>
            </div>
        </div>
    `;

    productContainer.appendChild(productCard);
}

// Event listener utilizando delegação de eventos para deletar produto
document.addEventListener('click', async (event) => {
    if (event.target && event.target.classList.contains('fa-trash-can')) {
        const productId = event.target.getAttribute('data-product-id');
        const deleted = await deleteProduct(productId);
        if (deleted) {
            const productElement = document.getElementById(`product-${productId}`);
            if (productElement) {
                productElement.remove();
                showSnackbar('Produto removido com sucesso', 'sucess');
            } else {
                console.warn(`Produto com ID ${productId} não encontrado no DOM.`);
            }
        } else {
            console.error(`Erro ao tentar excluir o produto com ID ${productId}.`);
            showSnackbar('Erro ao excluir o produto', 'error');
        }
    }
});

// Função para mostrar o snackbar
function showSnackbar(message, colorClass) {
    const snackbar = document.getElementById('snackbar');
    snackbar.textContent = message;
    snackbar.style.backgroundColor = colorClass;
    snackbar.style.visibility = 'visible';

    setTimeout(() => {
        snackbar.style.visibility = 'hidden';
    }, 300000); // Tempo de exibição do snackbar (3 segundos neste exemplo)
}

// Função para limpar os campos do formulário
window.clearFields = function () {
    document.getElementById('nome-produto').value = '';
    document.getElementById('valor-produto').value = '';
    document.getElementById('url-imagem-produto').value = '';
};

// Função para adicionar um produto através do formulário
window.addProduct = async function () {

    const nomeProduto = document.getElementById('nome-produto').value;
    const valorProduto = document.getElementById('valor-produto').value;
    const urlImagemProduto = document.getElementById('url-imagem-produto').value;

    const newProduct = {
        name: nomeProduto,
        price: valorProduto,
        imageUrl: urlImagemProduto
    };

    const createdProduct = await addProductToApi(newProduct);
    if (createdProduct) {
        appendProduct(createdProduct);
        clearFields();
        showSnackbar('Produto adicionado com sucesso', '--color-green');
    } else {
        console.error('Erro ao adicionar o produto.');
        showSnackbar('Erro ao adicionar o produto', '--color-red');
    }
};
