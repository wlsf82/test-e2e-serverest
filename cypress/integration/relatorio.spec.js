/// <reference types = "Cypress" />

import product from '../page/product.page'

const { validaTexto, validaUrl } = require('../actions/principal.action')

describe('Relatório', () => {
  beforeEach(() => {
    cy.bypassAdminLogin()
    cy.visit('admin/relatorios')
  })

  it('valida página de cadastro', () => {
    validaUrl('https://front.serverest.dev/admin/relatorios')
    validaTexto(product.textProduto, 'Em construção aguarde')
  })
})