/// <reference types="Cypress" />

import login from '../page/login.page'
import createUser from '../page/user.page'
import 'cypress-file-upload'

Cypress.Commands.add('login', (user, password) => {
  cy.createUsersViaApi()
  cy.get(login.imputEmail).type(user)
  cy.get(login.imputSenha).type(password)
  cy.get(login.btnEntrar).click()
})

Cypress.Commands.add('createUserAdm', (name, email, password) => {
  cy.get(createUser.imputNome).type(name)
  cy.get(createUser.imputEmail).type(email)
  cy.get(createUser.imputSenha).type(password)
  cy.get(createUser.btnCadastrarAdm).click()
  cy.get(createUser.btnCadastrar).click()
})

Cypress.Commands.add('createUser', (name, email, password) => {
  cy.get(createUser.imputNome).type(name)
  cy.get(createUser.imputEmail).type(email)
  cy.get(createUser.imputSenha).type(password)
  cy.get(createUser.btnCadastrar).click()
})

Cypress.Commands.add('createUserAdminAdm', (name, email, password) => {
  cy.get(createUser.imputNome).type(name)
  cy.get(createUser.imputEmail).type(email)
  cy.get(createUser.imputSenha).type(password)
  cy.get(createUser.btnCadastrarAdm).click()
  cy.get(createUser.btnCadastrarAdmin).click()
})

Cypress.Commands.add('createAdminUser', (name, email, password) => {
  cy.get(createUser.imputNome).type(name)
  cy.get(createUser.imputEmail).type(email)
  cy.get(createUser.imputSenha).type(password)
  cy.get(createUser.btnCadastrarAdmin).click()
})

Cypress.Commands.add('fillProductFormAndSubmit', product => {
  cy.get('[data-testid=nome]').type(product.nome)
  cy.get('[data-testid=preco]').type(product.preco)
  cy.get('[data-testid=descricao]').type(product.descricao)
  cy.get('[data-testid=quantidade]').type(product.quantidade)
  cy.get('[data-testid=imagem]').as('fileInput').attachFile('cy.png')
  cy.get('[data-testid=cadastarProdutos]').click()
})
