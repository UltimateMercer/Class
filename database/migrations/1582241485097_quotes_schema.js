'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuotesSchema extends Schema {
  up () {
    this.create('quotes', (table) => {
      table.increments()
      table.string('author').notNullable()
      table.string('phrase').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('quotes')
  }
}

module.exports = QuotesSchema
