# ⭐ Pokedex WebSite - React

## 📜 Descrição do Projeto
É uma Single Page Application que permite aos usuários buscar informações detalhadas sobre os Pokémons utilizando a API da PokeAPI. A aplicação exibe uma lista de Pokémons paginada, onde cada card é clicável e leva a uma página de perfil com detalhes do Pokémon, como habilidades, movimentos, tipo e imagem.

## 👨‍💻 Funções da aplicação
- Requisição de API com todos os pokemons
- Responsivo para todos os dispositivos
- Função de alterar o tema do site (Dark/Light)
- Função de mostrar mais pokemóns
- Cards interativos com detalhes dos pokemons
- Detalhes dos pokémons: 
- - Imagem do Pokémon
- - Nome
- - Lista de movimentos (moves)
- - Lista de habilidades
- - Tipos do pokémon

## 🛠️ Ferramentas utilizadas
- ReactJS: Criar componentes e gerenciar o estado do app
- - Context API - Para a alternância entre tema claro e escuro
- - Hooks - Gerenciamento do estado
- - React-router-dom - Navegação entre as páginas
- Styled-components: Estilização
- Axios: Requisições HTTP

## 💡 Decisões do projeto
1. Foi escolhido o Axios ao invés do normal fetch
- Tanto pelo transformação automática de dados JSON quanto pela simplicidade
2. Escolha do react e da criação de componentes
- Com o react é possível reutilizar o mesmo código sem alterar a eficácia, o exemplo disso é o componente de PokemonDetails, ele é código inteiro de um cartão pokémon que serve para todos os outros cartões pokémon, facilitando código e flexibilidade.
3. Escolha do Styled-components
- Estilizar com Styled-components é melhor nesse caso, você pode reutilizar a mesma estilização para vários outros elementos e componentes, é bem mais versátil também pelo fato de criar sempre uma classe aleatória única para cada componente estilizado (Evita erros).

## 🌪️ Dificuldades do projeto
- LocalStorage: Como é algo que eu nunca havia feito (guardar informações do site no LocalStorage), não tinha ideia nem de como começar, mas, com a ajuda de monitores do devQuest consegui ter uma ideia. Espero melhorar nessa parte.
- ContextAPI/Troca de temas: Pelo mesmo motivo anterior, eu suponho que é muito sobre experiência e estar acostumado a fazer essas funções.
- Seção "Habilidades" do pokémon: São muitas urls uma dentro da outra para descobrir o título e a descrição de cada habilidade de cada pokémon, foi algo bem demorado que tive dificuldade, mas, consegui.

## 💭 Possíveis atualizações futuras
- Finalizar o readMe corretamente ✅
- Adicionar a função de pesquisar pokémons pelo input

## 🚀 Como rodar o projeto
Siga os passos abaixo para executar o projeto na sua máquina:

### Pré requisitos
- <strong><i>Node.js</i></strong>: Certifique-se de ter a versão LTS ou superior instalada.
- <strong><i>Git</i></strong>: Para clonar o repositório.
1. Abra o git, e execute os seguintes comandos
2. git clone https://github.com/Seila-dev/pokedex-react.git 
3. npm install
4. npm run dev
5. Clique para abrir o servidor local no navegador