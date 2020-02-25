'use strict'

const posts = [
  {
    id: 1,
    title: 'Owarida',
    content: 'Lorem ipsom owarida'

  },
  {
    id: 2,
    title: 'Jiren',
    content: 'jiren: owarida'
  }
]

class PostController {
  index({ response }) {
    response.json(posts);
  }

  show({ params, response }) {
    const id = Number(params.id);
    const post = posts.find(post => post.id === id);

    if (!post) {
      response.notFound({
        error: "Not Found"
      });
      return;
    }

    response.json(post);
  }

  async store({ request, response }) {
    // receber os dados do novo post
    // criar um objeto
    const newPost = request.only(["title", "content"]);
    const nextId = posts[posts.length - 1].id + 1;
    newPost.id = nextId;

    // valida o novo post
    const rules = {
      title: "required|string",
      content: "string"
    };

    const validation = await validate(newPost, rules);

    if (validation.fails()) {
      response.badRequest(validation.messages());
      return;
    }

    // salvar na lista
    posts.push(newPost);
    // retornar o novo post
    response.json(newPost);
  }

  async update({ params, request, response }) {
    // pegar o id do url
    const id = Number(params.id);
    // pegar a postagem de id tal
    const post = posts.find(post => post.id === id);

    if (!post) {
      response.notFound({
        error: "Not Found"
      });
      return;
    }

    // pegar os dados novos
    const updates = request.only(["title", "content"]);
    // atualizar a postagem
    const newPost = {
      ...post,
      ...updates
    };

    // valida o post atualizado
    const rules = {
      title: "string",
      content: "string"
    };

    const validation = await validate(newPost, rules);

    if (validation.fails()) {
      response.badRequest(validation.messages());
      return;
    }

    const position = posts.findIndex(post => post.id === id);
    posts.splice(position, 1, newPost);
    // retornar a postagem ja atualizada
    response.json(newPost);
  }

  destroy({ params, response }) {
    // pegar o id do url
    const id = Number(params.id);
    // encontrar a postagem
    const post = posts.find(post => post.id === id);

    if (!post) {
      response.notFound({
        error: "Not Found"
      });
      return;
    }
    // deletar a postagem desse id
    const position = posts.findIndex(post => post.id === id);
    posts.splice(position, 1);
    // retornar nada com codigo No Content
    response.noContent({});
  }
}

module.exports = PostController;

module.exports = PostController
