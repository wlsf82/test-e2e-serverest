/// <reference types = "Cypress" />

describe('Relatório', () => {
  beforeEach(() => {
    cy.bypassAdminLogin()
    cy.visit('/admin/relatorios')
  })

  it('Exibe página em construção', () => {
    cy.contains('h1', 'Em construção aguarde').should('be.visible')
  })
})
