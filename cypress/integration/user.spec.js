/// <reference types = "Cypress" />

const faker = require('faker')

describe('Cadastro de usuário', () => {
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

  it('valida cadastro usuário adm sucesso', () => {
    user.admin = true

    cy.createUser(user)
    cy.contains(alertSelector, 'Cadastro realizado com sucesso').should('be.visible')
    cy.url().should('be.equal', `${baseUrl}/admin/home`)
  })

  it('valida cadastro usuário sucesso', () => {
    user.admin = false

    cy.createUser(user)
    cy.contains(alertSelector, 'Cadastro realizado com sucesso').should('be.visible')
    cy.url().should('be.equal', `${baseUrl}/home`)
  })

  it('valida email invalido', () => {
    user.email = 'm@m'

    cy.createUser(user)
    cy.contains(alertSelector, 'email deve ser um email válido').should('be.visible')
  })

  it('valida cadastro sem email, senha e nome', () => {
    cy.get('[data-testid=cadastrar]').click()
    cy.contains(alertSelector, 'nome não pode ficar em branco').should('be.visible')
    cy.contains(alertSelector, 'email não pode ficar em branco').should('be.visible')
    cy.contains(alertSelector, 'password não pode ficar em branco').should('be.visible')
  })
})
