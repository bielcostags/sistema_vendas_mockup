document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('form-produto'); // Se estiver na tela de cadastro
    const tabela = document.getElementById('tabela-produtos');
    const inputBusca = document.getElementById('busca-produto');

    const carregarProdutos = (filtro = '') => {
        if (!tabela) return;
        const produtos = JSON.parse(localStorage.getItem('produtos') || '[]');
        tabela.innerHTML = '';

        produtos.filter(p => p.nome.toLowerCase().includes(filtro.toLowerCase()) || p.codigo.includes(filtro))
        .forEach(p => {
            tabela.innerHTML += `
                <tr>
                    <td>${p.codigo}</td>
                    <td><strong>${p.nome}</strong></td>
                    <td><span class="badge bg-secondary">${p.categoria}</span></td>
                    <td>R$ ${parseFloat(p.preco).toFixed(2)}</td>
                    <td>${p.estoque} un</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline-primary" onclick="abrirEdicao(${p.id})"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-sm btn-outline-danger" onclick="excluirProduto(${p.id})"><i class="bi bi-trash"></i></button>
                    </td>
                </tr>
            `;
        });
    };

    // Cadastro
    if (formCadastro) {
        formCadastro.addEventListener('submit', (e) => {
            e.preventDefault();
            const produtos = JSON.parse(localStorage.getItem('produtos') || '[]');
            const novo = {
                id: Date.now(),
                nome: document.getElementById('nome').value,
                codigo: document.getElementById('codigo').value,
                categoria: document.getElementById('categoria').value,
                preco: parseFloat(document.getElementById('preco').value),
                estoque: parseInt(document.getElementById('estoque').value)
            };
            produtos.push(novo);
            localStorage.setItem('produtos', JSON.stringify(produtos));
            alert('Produto salvo com sucesso!');
            location.href = 'lista-produtos.html';
        });
    }

    if (inputBusca) {
        inputBusca.addEventListener('input', (e) => carregarProdutos(e.target.value));
    }

    carregarProdutos();
});

// Funções globais para botões da tabela
function excluirProduto(id) {
    if (confirm('Deseja realmente excluir este produto?')) {
        let produtos = JSON.parse(localStorage.getItem('produtos'));
        produtos = produtos.filter(p => p.id !== id);
        localStorage.setItem('produtos', JSON.stringify(produtos));
        location.reload();
    }
}

function abrirEdicao(id) {
    const produtos = JSON.parse(localStorage.getItem('produtos'));
    const p = produtos.find(prod => prod.id === id);
    document.getElementById('edit-id').value = p.id;
    document.getElementById('edit-nome').value = p.nome;
    document.getElementById('edit-preco').value = p.preco;
    document.getElementById('edit-estoque').value = p.estoque;
    new bootstrap.Modal(document.getElementById('modalEdicao')).show();
}

// Lógica do Form de Edição
const formEdit = document.getElementById('form-edit-produto');
if(formEdit){
    formEdit.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('edit-id').value;
        let produtos = JSON.parse(localStorage.getItem('produtos'));
        const index = produtos.findIndex(p => p.id == id);
        
        produtos[index].nome = document.getElementById('edit-nome').value;
        produtos[index].preco = parseFloat(document.getElementById('edit-preco').value);
        produtos[index].estoque = parseInt(document.getElementById('edit-estoque').value);

        localStorage.setItem('produtos', JSON.stringify(produtos));
        location.reload();
    });
}