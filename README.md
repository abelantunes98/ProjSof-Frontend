# Projeto-Psoft front-end

### Front-end da aplicação para o projeto da disciplina Projeto de Software 2019.1 by UFCG

#### Equipe
* [Abel Antunes de Lima Neto](https://github.com/abelantunes98)
* [Hércules Rodrigues Anselmo](https://github.com/herculesra)
* [Paulo Mendes da Silva Júnior](https://github.com/paulojuniore)

_Breve resumo da aplicação_

O UFCG Cursos database é uma aplicação para classificação e reviews de disciplinas de cursos da UFCG. Por enquanto, a versão 1 do sistema será alimentada apenas com disciplinas do curso de Ciência da Computação. Os usuários dessa aplicação irão construir conteúdo sobre as disciplinas de forma colaborativa através de comentários e likes nas disciplinas. O sistema deve usar essa informação construída para rankear as disciplinas do curso.

### Casos de uso considerados para a construção da API

- [x] Caso de uso 1: Cadastrar/Autenticar usuários

* Todos os dados devem ser preenchidos corretamente, sendo nome, sobrenome e email não vazios e válidos. Além da senha ter no mínimo 5 caracteres.
* Um usuário só é cadastrado na base de dados se o mesmo clicar no link enviado para o seu email de cadastro.
* A barra superior do site contém dois botões, que na verdade, são checkbox que irão guardar o estado atual da checkbox("checked"ou ""). Quando um item é clicado, o arquivo App.js é chamado e nela é feita a parte de renderização, envio e carregamento do token.

- [x] Caso de uso 2: Pesquisar disciplinas a partir de uma (sub)string

* Na página existe um campo de texto para pesquisar as disciplinas por substring, nele é feito uma requisição com a substring passada como parâmetro e trás a lista de disciplinas que contém aquela substring passada, no front-end, a response é pega e nela é criada uma shadow que irá guardar componentes que foram criados usando web components. Esse tipo de busca pode ser feito por qualquer usuário, seja ele cadastrado ou não.

- [x] Caso de uso 3: Recuperar o perfil de uma disciplina a partir do seu código numérico

* Neste caso, a rota de acesso às páginas possuem acesso restringidos a apenas usuários que encontram-se logados. A API fetch acessa a nossa API na rota de pesquisa por id, e renderiza na tela o id e o nome da disciplina na tela em um web-component. Junto é possível escolher exibir o perfil da disciplina para acessar outros dados referentes a disciplina, com número de likes/deslikes, comentários.

- [x] Caso de uso 4: Adicionar comentários de uma disciplina

* Um usuário autenticado é capaz de adicionar um comentário em uma disciplina. esse comentário é adicionado na shadow e possui um web-component para sua renderização, ao ser postado, o comentário poderá ter uma resposta.

- [x] Caso de uso 5: Apagar comentários de uma disciplina

* Ao clicar no widget "deletar", o usuário que escreveu aquele comentário é capaz de apagá-lo. A API faz a requisição para o servidor, e ele retorna um Ok caso sucesso, ou 200. Depois desse evento o view é novamente  renderizada.

- [x] Caso de uso 6: Dar/retirar like em uma disciplina

* Os eventos de like/deslike na disciplina são independentes entre si, já que os dois não podem ser dados simultaneamente na mesma disciplina. Ambos acessados através das rotas no back-end, a view de um perfil de disciplina possui dois botões, sendo um para like e outro para deslike e nele a lógica do back-end é utilizada, e o like/deslike é registrado na disciplina. 

- [x] Caso de uso 7: Mostrar o ranking das disciplinas

* Segue a mesma ideia do caso de uso 1, exceto pelo fato de trazer todas as disciplina ordenadas segundo algum critério, seja esse critério: número de likes, número de deslikes, número de comentários ou proporção de likes/(likes+deslikes). O usuário cadastrado seleciona o checkbox correspondente e a sua opção de ranking, faz a busca na api e trás a listagem das disciplinas ordenadas seguindo aquele critério.
