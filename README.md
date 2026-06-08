O projeto desenvolvido foi um sistema simples de gerenciamento de uma loja de bicicletas utilizando apenas HTML, CSS, JavaScript e Bootstrap.

Página Inicial

Foi utilizado o template Album do Bootstrap para criar uma página inicial moderna, contendo:

Navbar de navegação.
Apresentação da loja BikeStore.
Cards com categorias de bicicletas (Mountain Bike, Speed e Urbana).
Acesso rápido para cadastros e listagens.
Sistema de Navegação

Foi criada uma navbar padrão presente em todas as páginas do sistema contendo:

Menu Cadastros
Cadastrar Cliente
Cadastrar Produto
Cadastrar Pedido
Menu Listagens
Lista de Clientes
Lista de Produtos
Lista de Pedidos
Cadastro de Clientes

Utilizando o template Checkout do Bootstrap, foi criado um formulário para cadastro de clientes contendo:

Nome
Telefone
E-mail
Cadastro de Produtos

Também utilizando o template Checkout, foi criado o cadastro de bicicletas contendo:

Modelo
Marca
Categoria
Quantidade em estoque
Preço unitário
Valor total do estoque calculado automaticamente

Foi implementado JavaScript para calcular em tempo real:

Valor Total = Estoque × Preço Unitário
Cadastro de Pedidos

Foi desenvolvido um formulário para registrar vendas contendo:

Cliente
Produto
Quantidade
Forma de pagamento
Armazenamento dos Dados

Os dados são armazenados utilizando o LocalStorage do navegador, permitindo salvar informações sem a necessidade de banco de dados.

Páginas de Listagem

Foi utilizado o modelo Grid do Bootstrap para exibir os registros cadastrados.

Lista de Clientes

Exibe:

Nome
Telefone
E-mail
Lista de Produtos

Exibe:

Modelo
Marca
Categoria
Estoque
Preço Unitário
Valor Total
Lista de Pedidos

Exibe:

Cliente
Produto
Quantidade
Forma de Pagamento
Tecnologias Utilizadas
HTML5
CSS3
JavaScript
Bootstrap 5
LocalStorage
Objetivo do Projeto

O objetivo foi desenvolver um sistema web responsivo para gerenciamento de uma loja de bicicletas, aplicando conceitos de navegação entre páginas, formulários, armazenamento local de dados e utilização de templates oficiais do Bootstrap para criação de interfaces modernas e organizadas.
