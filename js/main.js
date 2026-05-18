// Inicialização de dados fictícios
document.addEventListener('DOMContentLoaded', () => {
    initMockData();
    updateDashboard();
});

function initMockData() {
    if (!localStorage.getItem('produtos')) {
        const produtosIniciais = [
            { id: 1, nome: 'Smartphone X', codigo: '1001', categoria: 'Eletrônicos', preco: 2500, estoque: 15 },
            { id: 2, nome: 'Notebook Pro', codigo: '1002', categoria: 'Informática', preco: 5200, estoque: 5 }
        ];
        localStorage.setItem('produtos', JSON.stringify(produtosIniciais));
    }

    if (!localStorage.getItem('clientes')) {
        const clientesIniciais = [
            { id: 1, nome: 'João Silva', cpf: '123.456.789-00', email: 'joao@email.com', fone: '(69) 98888-0000' }
        ];
        localStorage.setItem('clientes', JSON.stringify(clientesIniciais));
    }

    if (!localStorage.getItem('pedidos')) {
        localStorage.setItem('pedidos', JSON.stringify([]));
    }
}

function updateDashboard() {
    const produtos = JSON.parse(localStorage.getItem('produtos') || '[]');
    const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
    const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');

    const totalVendas = pedidos.reduce((acc, p) => acc + parseFloat(p.valorTotal), 0);

    if(document.getElementById('total-produtos')) document.getElementById('total-produtos').innerText = produtos.length;
    if(document.getElementById('total-clientes')) document.getElementById('total-clientes').innerText = clientes.length;
    if(document.getElementById('total-vendas')) document.getElementById('total-vendas').innerText = `R$ ${totalVendas.toFixed(2)}`;
}