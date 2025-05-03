## Academy Control 🏋️ - Sistema desenvolvido por [Pedro Henrique](https://github.com/eupedrobarbosa03). ##

Project Page -> 🔗 [Academy Control](https://eupedrobarbosa03.github.io/academy-control/)

## Features 💻 ##

```
- ✅ Adicionar Treinos, instrutores e alunos.
- ✅ Atualizar instrutores e alunos. 
- ✅ Deletar instrutores e alunos. 
- ✅ Verificação em todos os inputs com validações únicas e precisas.
- ✅ Box-error (caixa com bordas de erro em casos de campos inválidos) interativos.
- ✅ Menu de controle para Treinos, Instrutores e Alunos.
- ✅ Menu de controle para Adicionar, atualizar, remover e mostrar todos as informações dos treinos, instrutores e alunos controlados.
- ✅ Interface simples, sólida e com algumas transações interativas.
- ✅ Interface responsiva, porém mais "ideal" para desktop.
- ✅ Bordas laterais únicas para cada tipo de informação. Exemplo: Informçãoes dos Treinos: Bordas laterais pretas.
```

## Tecnologies 🛠️ ## 
- HTML5
- CSS3
- JAVASCRIPT

## Applied Concepts 📖 ## 
- ✅ ESModules
- ✅ POO
- ✅ DOM
- ✅ Templates

## Validations ✅ ##

```
- ✅ Controle Workouts: É necessário haver instrutores e alunos existentes. O horário precisa conter ":".  O dia precisa estar entre "segunda-feira" até "domingo".
```

---

```
- ✅ Controle Instructor -> add: É necessário colocar o nome do instrutor sem números e não pode estar vazio. Idade (age) precisa ser igual ou maior que 18 anos. Especialidade (Specialty) não pode conter números. Número de telefone (Telephone) não pode conter letras e é livre para colocar qualquer números sem caracteres especiais, como "()".
- ✅ Controle Instructor -> update: Mesmas validações do "add", porém com: O nome do instrutor precisa estar cadastrado para atualizar.
- ✅ Controle Instructor -> delete: É necessário colocar o nome do instrutor sem números e não pode estar vazio. É necessário que o nome do instrutor esteja cadastrado para deletar.
```

---

```
- ✅ Controle Student -> add: É necessário colocar o nome do aluno sem números e não pode estar vazio. Idade (age) precisa ser igual ou maior que 10 anos. Foco (Focus) do aluno não pode conter números e não pode estar vazio. Tipo de benefício (type of benefit) precisa ser "normal" ou "hard". Peso (weight) precisa ser maior 0.
- ✅ Controle Student -> update: Mesmas validações do "add", porém com: O nome do aluno precisa estar cadastrado para atualizar.
- ✅ Controle Student -> delete: É necessário colocar o nome do aluno sem números e não pode estar vazio. É necessário que o nome do aluno esteja cadastro para deletar.
```

---

## How to use 📜 ##

```É recomendável ler as validações!

- Vá para página do sistema, link disponibilizado no começo deste readme.
- Para agendar treinos, é necessário possuir pelo menos 1 instrutor e 1 aluno.
- Para cadastrar um instrutor, clique no botão 'Instructor' e insira as informações requeridas.
- Para cadastrar um aluno, clique no botão 'Student' e insira as informações requeridas.
- Para inserir um treino, clique no botão "Workouts' e insira as informações requeridas.
- Para as funcionalidades: update e delete dos controles 'Instructor e Student', clique na opção desejada e siga as "validations" neste readme.
- Caso queira ver a lista de informações atualizada do controle selecionado, siga o exemplo: 'Selecione o controle "Workouts, Instructor ou Student", clique em "all"' para ver a lista completa.
```
