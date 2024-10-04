
# Gerenciamento de Despesas - Frontend

Este é o frontend de um aplicativo para gerenciamento de despesas, desenvolvido com **Next.js** e **React**. A aplicação permite visualizar, adicionar, editar e deletar despesas financeiras, além de calcular e exibir as entradas, saídas e o saldo total.

## Funcionalidades

- **Dashboard**: Exibição de entradas, saídas e saldo total das despesas cadastradas.
- **Adição de despesas**: Formulário para inserir novas despesas, com campos para descrição, valor, data e tipo (entrada ou saída).
- **Edição e exclusão**: Funcionalidades para editar e excluir despesas diretamente na lista de histórico.
- **Histórico de despesas**: Tabela exibindo todas as despesas cadastradas com possibilidade de edição e exclusão.

## Tecnologias Utilizadas

- **Next.js**: Framework React para construção da interface do usuário.
- **React**: Biblioteca JavaScript para a criação de interfaces.
- **CSS Modules**: Estilização isolada por componente, garantindo modularidade no CSS.
- **Fetch API**: Utilizado para realizar requisições HTTP para a API backend.

## Estrutura de Pastas

- `/pages`: Contém as páginas da aplicação, como a página principal `Home` e a página de `Histórico`.
- `/components`: Contém componentes reutilizáveis, como o componente `Card` para exibição dos dados de entradas, saídas e saldo.
- `/services`: Contém funções auxiliares, como `calcularEntrada`, `calcularSaida`, `atualizarItem` e `deletarItem`, responsáveis pelas operações de cálculo e manipulação dos dados.

## Instalação

Para rodar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:

   ```bash
   git clone https://github.com/tiagoh671/gerenciar-despesas-front.git
   ```

2. Navegue até a pasta do projeto:

   ```bash
   cd seu-repositorio
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```


## Requisições HTTP

A aplicação faz requisições HTTP para uma API backend no endereço `http://localhost:8080/despesas/` para buscar, adicionar, atualizar e deletar as despesas.

- **GET**: Recupera todas as despesas cadastradas.
- **POST**: Adiciona uma nova despesa ao banco de dados.
- **PATCH**: Atualiza uma despesa existente.
- **DELETE**: Remove uma despesa.
