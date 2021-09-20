/// <reference types = "Cypress" />

describe('Login', () => {
  const baseUrl = Cypress.config('baseUrl')
  const alertSelector = '.alert'

  beforeEach(() => {
    cy.visit('/')
    cy.url().should('be.equal', `${baseUrl}/login`)
  })

  it('Login com sucesso leva à página home', () => {
    cy.login(Cypress.env('user'), Cypress.env('password'))
    cy.url().should('be.equal', `${baseUrl}/admin/home`)
  })

  it('Erro é exibido ao tentar fazer login com email incorreto', () => {
    cy.login('misael@qc.com.br', Cypress.env('password'))
    cy.contains(alertSelector, 'Email e/ou senha inválidos').should('be.visible')
  })

  it('Erro é exibido ao tentar fazer login com senha incorreta', () => {
    cy.login(Cypress.env('user'), 'testing')
    cy.contains(alertSelector, 'Email e/ou senha inválidos').should('be.visible')
  })

  it('Logout com sucesso leva à página de login', () => {
    cy.login(Cypress.env('user'), Cypress.env('password'))
    cy.url().should('be.equal', `${baseUrl}/admin/home`)
    cy.get('[data-testid=logout]').click()
    cy.url().should('be.equal', `${baseUrl}/login`)
  })

  it('Erro é exibido ao tentar fazer login com email invalido', () => {
    cy.login('m@m', Cypress.env('password'))
    cy.contains(alertSelector, 'email deve ser um email válido').should('be.visible')
  })

  it('Erro é exibido ao tentar fazer login login sem digitar email e senha', () => {
    cy.get('[data-testid=entrar]').click()
    cy.contains(alertSelector, 'email não pode ficar em branco').should('be.visible')
    cy.contains(alertSelector, 'email não pode ficar em branco').should('be.visible')
  })
})
