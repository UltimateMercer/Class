'use strict'
const { validate } = use('Validator')
const Quote = use('App/Model/Quote')

class QuoteController {
  async index({ response }) {
    response.json(await Quote.all())
  }

  async show({ params, response }) {
    const id = Number(params.id)
    const quote = await Quote.find(id)

    if (!post) {
      response.notFound({
        error: 'Not Found'
      })
      return
    }

    response.json(quote)
  }

  async store({ request, response }) {
    // receber os dados do novo post
    // criar um objeto
    const newQuoteData = request.only(['author', 'phrase'])

    // valida o novo post
    const rules = {
      author: 'required|string',
      phrase: 'required|string'
    }

    const validation = await validate(newQuoteData, rules)

    if (validation.fails()) {
      response.badRequest(validation.messages())
      return
    }

    const quote = new Quote()
    quote.author = newQuoteData.author
    quote.phrase = newQuoteData.phrase

    await quote.save()

    // retornar a nova frase
    response.json(quote)
  }

  async update({ params, request, response }) {
    // pegar o id do url
    const id = Number(params.id)
    // pegar a frase de id tal
    const quote = await Quote.find(id)

    if (!quote) {
      response.notFound({
        error: 'Not Found'
      })
      return
    }

    // pegar os dados novos
    const updates = request.only(['author', 'phrase'])
    // atualizar a frase
    const newQuote = {
      ...quote,
      ...updates
    }

    // valida a frase atualizado
    const rules = {
      author: 'string',
      phrase: 'string'
    }

    const validation = await validate(newQuote, rules)

    if (validation.fails()) {
      response.badRequest(validation.messages())
      return
    }

    quote.merge(updates)
    await quote.save()

    // retornar a frase ja atualizada
    response.json(quote)
  }

  async destroy({ params, response }) {
    // pegar o id do url
    const id = Number(params.id)
    // encontrar a frase
    const quote = await Quote.find(id)

    if (!quote) {
      response.notFound({
        error: 'Not Found'
      })
      return
    }
    // deletar a frase desse id
    await quote.delete()
    // retornar nada com codigo No Content
    response.noContent({})
  }

}

module.exports = QuoteController
