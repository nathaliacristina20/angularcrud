
<h1 align="center">Angular Crud</h1>

<p align="center">
  <a href="#rocket-sobre-o-projeto">Sobre o projeto</a> | <a href="#computer-tecnologias">Tecnologias</a> | <a href="#books-guia-de-instalação-e-execução">Guia de instalação e execução</a> | <a href="#scroll-licença">Licença</a>
</p>

## Layout
<img src="github/preview.gif">

## :rocket: Sobre o projeto

<p>Esta é uma aplicação CRUD desenvolvida com propósitos de aprendizagem do Angular e seu ecossistema.</p>

## :computer: Tecnologias

- Angular
- Angular Material
- Monorepo
- Node.js
- MongoDB

## :books: Guia de instalação e execução

### Pré-requisitos

- Yarn
- MongoDB
- Git

### Como executar

```bash
# Clone este repositório e acesse a pasta
git clone https://github.com/nathaliacristina20/angular-crud.git && cd angular-crud

# Instale as dependencias com yarn
yarn

# Vá para o diretório do server
cd packages/server

# Copie o arquivo .env.example executando cp .env.example .env para linux ou mac e copy .env.example .env para window
# Abra o arquivo .env e preencha com suas variáveis de ambiente

# Rode o server
yarn dev

# Rode a aplicação
cd ..
cd web
yarn start

# Pronto, a aplicação está rodando! Acesse http://localhost:4200 no browser.
```

## :scroll: Licença

Esse projeto está sob a licença MIT. Veja o arquivo <a href="https://github.com/nathaliacristina20/angular-crud/blob/master/LICENSE">LICENSE</a> para mais detalhes.

<hr />
<p>by Nathalia Cristina :wave: <a href="https://linktr.ee/nathaliacristina20">Get in touch!</a></p>
