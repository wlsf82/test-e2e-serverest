/// <reference types = "Cypress" />

describe('Cadastro de usuário', () => {
  const faker = require('faker')

  const baseUrl = Cypress.config('baseUrl')
  const alertSelector = '.alert'

  let user

  beforeEach(() => {
    user = {
      name: faker.name.firstName(),
      email : faker.internet.email(),
      password: Cypress.env('PASSWORD')
    }

    cy.visit('/cadastrarusuarios')
  })

  it('Cadastra usuário admin com sucesso', () => {
    user.admin = true

    cy.createUser(user)
    cy.contains(alertSelector, 'Cadastro realizado com sucesso').should('be.visible')
    cy.url().should('be.equal', `${baseUrl}/admin/home`)
  })

  it('Cadastra usuário não-admin sucesso', () => {
    user.admin = false

    cy.createUser(user)
    cy.contains(alertSelector, 'Cadastro realizado com sucesso').should('be.visible')
    cy.url().should('be.equal', `${baseUrl}/home`)
  })

  it('Erro é exibido ao tentar cadastrar usuário com email inválido', () => {
    user.email = 'm@m'

    cy.createUser(user)
    cy.contains(alertSelector, 'email deve ser um email válido').should('be.visible')
  })

  it('Erros são exibidos ao tentar cadastrar usuário sem preencher os campos obrigatórios', () => {
    cy.get('[data-testid=cadastrar]').click()
    cy.contains(alertSelector, 'nome não pode ficar em branco').should('be.visible')
    cy.contains(alertSelector, 'email não pode ficar em branco').should('be.visible')
    cy.contains(alertSelector, 'password não pode ficar em branco').should('be.visible')
  })
})
