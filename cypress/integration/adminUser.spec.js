/// <reference types = "Cypress" />

describe('Cadastro de usuários - Admin', () => {
  const faker = require('faker')

  const baseUrl = Cypress.config('baseUrl')
  const adminUsersListUrl = `${baseUrl}/admin/listarusuarios`
  const alertSelector = '.alert'

  let user

  beforeEach(() => {
    user = {
      name: faker.name.firstName(),
      email : faker.internet.email(),
      password: faker.datatype.uuid(),
      admin: true
    }

    cy.bypassAdminLogin()
    cy.visit('/admin/cadastrarusuarios')
  })
  
  it('Cadastro de usuário admin leva à página "/admin/listarusuarios" com novo usuário criado', () => {
    user.email = faker.internet.email()

    cy.createUser(user)
    cy.url().should('be.equal', adminUsersListUrl)
    cy.contains('tbody', user.name).should('be.visible')
  })

  it('Cadastro de usuário não-admin leva à página "/admin/listarusuarios" com novo usuário criado', () => {
    user.admin = false

    cy.createUser(user)
    cy.url().should('be.equal', adminUsersListUrl)
    cy.contains('tbody', user.name).should('be.visible')
  })

  it('Erro é exibido ao tentar criar usuário com email inválido', () => {
    user.email = "m@m"

    cy.createUser(user)
    cy.contains(alertSelector, 'email deve ser um email válido').should('be.visible')
  })

  it('Erros são exibidos ao tentar cadastrar usuário sem preenchimentos dos campos obrigatórios', () => {
    cy.get('[data-testid=cadastrarUsuario]').click()
    cy.contains(alertSelector, 'nome não pode ficar em branco').should('be.visible')
    cy.contains(alertSelector, 'email não pode ficar em branco').should('be.visible')
    cy.contains(alertSelector, 'password não pode ficar em branco').should('be.visible')
  })
})
