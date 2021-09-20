/// <reference types = "Cypress" />

describe('Relatório', () => {
  beforeEach(() => {
    cy.bypassAdminLogin()
    cy.visit('/admin/relatorios')
  })

  it('Exibe página em construção', () => {
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/admin/relatorios`)
    cy.contains('h1', 'Em construção aguarde').should('be.visible')
  })
})
