/// <reference types = "Cypress" />

describe('Login', () => {
  const baseUrl = Cypress.config('baseUrl')
  const alertSelector = '.alert'

  beforeEach(() => cy.visit('/'))

  it('Login com sucesso leva à página home e logout leva à página de login', () => {
    cy.login(Cypress.env('USER'), Cypress.env('PASSWORD'))
    cy.url().should('be.equal', `${baseUrl}/admin/home`)
    cy.get('[data-testid=logout]').click()
    cy.url().should('be.equal', `${baseUrl}/login`)
  })

  it('Erro é exibido ao tentar fazer login com email incorreto', () => {
    cy.login('misael@qc.com.br', Cypress.env('PASSWORD'))
    cy.contains(alertSelector, 'Email e/ou senha inválidos').should('be.visible')
  })

  it('Erro é exibido ao tentar fazer login com senha incorreta', () => {
    cy.login(Cypress.env('USER'), 'testing')
    cy.contains(alertSelector, 'Email e/ou senha inválidos').should('be.visible')
  })

  it('Erro é exibido ao tentar fazer login com email invalido', () => {
    cy.login('m@m', Cypress.env('PASSWORD'))
    cy.contains(alertSelector, 'email deve ser um email válido').should('be.visible')
  })

  it('Erro é exibido ao tentar fazer login login sem digitar email e senha', () => {
    cy.get('[data-testid=entrar]').click()
    cy.contains(alertSelector, 'email não pode ficar em branco').should('be.visible')
    cy.contains(alertSelector, 'password não pode ficar em branco').should('be.visible')
  })
})
