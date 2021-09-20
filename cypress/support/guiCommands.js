/// <reference types="Cypress" />

import 'cypress-file-upload'

const emailSelector = '[data-testid=email]'
const nameSelector = '[data-testid=nome]'
const passwordSelector = '[data-testid=senha]'

Cypress.Commands.add('login', (user, password) => {
  cy.createUsersViaApi()
  cy.get(emailSelector).type(user)
  cy.get(passwordSelector).type(password)
  cy.get('[data-testid=entrar]').click()
})

Cypress.Commands.add('createUser', user => {
  cy.get(nameSelector).type(user.name)
  cy.get(emailSelector).type(user.email)
  cy.get(passwordSelector).type(user.password)

  if (user.admin) {
    cy.get('[data-testid=checkbox]').check()
  }

  cy.contains('button', 'Cadastrar').click()
})

Cypress.Commands.add('fillProductFormAndSubmit', product => {
  cy.get(nameSelector).type(product.nome)
  cy.get('[data-testid=preco]').type(product.preco)
  cy.get('[data-testid=descricao]').type(product.descricao)
  cy.get('[data-testid=quantidade]').type(product.quantidade)
  cy.get('[data-testid=imagem]').attachFile('cy.png')
  cy.get('[data-testid=cadastarProdutos]').click()
})
