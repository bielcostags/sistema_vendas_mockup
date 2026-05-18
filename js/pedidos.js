document.addEventListener('DOMContentLoaded', () => {
    const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
    const produtos = JSON.parse(localStorage.getItem('produtos') || '[]');
    
    const selectC = document.getElementById('select-cliente');
    const selectP = document.getElementById('select-produto');
    const inputQtd = document.getElementById('qtd-pedido');
    const displayTotal = document.getElementById('display-total');
    const displayEstoque = document.getElementById('estoque-disponivel');

    // Popular Selects com nomes reais
    clientes.forEach(c => selectC.innerHTML += `<option value="${c.id}">${c.nome}</option>`);
    produtos.forEach(p => selectP.innerHTML += `<option value="${p.id}">${p.nome} (Ref: ${p.codigo})</option>`);

    // Função de cálculo e atualização de interface
    const atualizarResumo = () => {
        const prod = produtos.find(p => p.id == selectP.value);
        const qtd = parseInt(inputQtd.value) || 0;

        if(prod) {
            const total = prod.preco * qtd;
            displayTotal.innerText = `R$ ${total.toFixed(2)}`;
            displayEstoque.innerText = `Disponível em estoque: ${prod.estoque} unidades`;
            document.getElementById('resumo-preco').innerText = `R$ ${prod.preco.toFixed(2)}`;
            document.getElementById('resumo-subtotal').innerText = `R$ ${total.toFixed(2)}`;
            
            // Alerta visual de estoque
            if(qtd > prod.estoque) {
                displayEstoque.classList.replace('text-primary', 'text-danger');
                displayEstoque.innerHTML = `<i class="bi bi-exclamation-triangle"></i> Quantidade maior que o estoque!`;
            } else {
                displayEstoque.classList.replace('text-danger', 'text-primary');
            }
        }
    };

    selectP.addEventListener('change', atualizarResumo);
    inputQtd.addEventListener('input', atualizarResumo);

    // Botões de + e -
    window.alterarQtd = (valor) => {
        let atual = parseInt(inputQtd.value);
        if(atual + valor >= 1) {
            inputQtd.value = atual + valor;
            atualizarResumo();
        }
    };

    // Finalizar Venda
    document.getElementById('form-pedido').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const prodId = selectP.value;
        const qtd = parseInt(inputQtd.value);
        const dbProdutos = JSON.parse(localStorage.getItem('produtos'));
        const indexProd = dbProdutos.findIndex(p => p.id == prodId);

        if(dbProdutos[indexProd].estoque < qtd) {
            alert('Erro: Estoque insuficiente para esta venda.');
            return;
        }

        // Atualizar estoque no localStorage
        dbProdutos[indexProd].estoque -= qtd;
        localStorage.setItem('produtos', JSON.stringify(dbProdutos));

        // Salvar Pedido
        const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
        const novoPedido = {
            id: Date.now(),
            cliente: selectC.options[selectC.selectedIndex].text,
            produto: selectP.options[selectP.selectedIndex].text,
            quantidade: qtd,
            valorTotal: (dbProdutos[indexProd].preco * qtd).toFixed(2),
            status: document.getElementById('status-pedido').value,
            data: new Date().toLocaleDateString('pt-BR')
        };

        pedidos.push(novoPedido);
        localStorage.setItem('pedidos', JSON.stringify(pedidos));

        alert('Pedido finalizado com sucesso!');
        location.href = 'lista-pedidos.html';
    });
});