document.addEventListener('DOMContentLoaded', () => {
    const formCli = document.getElementById('form-cliente');
    const tabelaCli = document.getElementById('tabela-clientes'); // Para lista-clientes.html

    const carregarClientes = () => {
        if (!tabelaCli) return;
        const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
        tabelaCli.innerHTML = '';

        clientes.forEach(c => {
            tabelaCli.innerHTML += `
                <tr>
                    <td><strong>${c.nome}</strong></td>
                    <td>${c.cpf}</td>
                    <td>${c.fone}</td>
                    <td>${c.email}</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline-danger" onclick="excluirCliente(${c.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    };

    if (formCli) {
        formCli.addEventListener('submit', (e) => {
            e.preventDefault();
            const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
            const novo = {
                id: Date.now(),
                nome: document.getElementById('nome-cliente').value,
                cpf: document.getElementById('cpf-cliente').value,
                fone: document.getElementById('fone-cliente').value,
                email: document.getElementById('email-cliente').value,
                endereco: document.getElementById('end-cliente').value
            };
            clientes.push(novo);
            localStorage.setItem('clientes', JSON.stringify(clientes));
            alert('Cliente cadastrado!');
            location.href = 'lista-clientes.html';
        });
    }

    carregarClientes();
});

function excluirCliente(id) {
    if (confirm('Deseja remover este cliente?')) {
        let clientes = JSON.parse(localStorage.getItem('clientes'));
        clientes = clientes.filter(c => c.id !== id);
        localStorage.setItem('clientes', JSON.stringify(clientes));
        location.reload();
    }
}