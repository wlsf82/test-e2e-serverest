/// <reference types = "Cypress" />

const faker = require('faker')

describe('Cadastro de produtos', () => {
  const baseUrl = Cypress.config('baseUrl')
  const alertSelector = '.alert'
  const priceMustBeANumberText = 'preco deve ser um número'

  const product = {
    nome: faker.lorem.word(),
    preco: Cypress._.random(10),
    descricao : faker.lorem.words(3),
    quantidade: Cypress._.random(10),
  }
  
  beforeEach(() => {
    cy.bypassAdminLogin()
    cy.visit('/admin/cadastrarprodutos')
    cy.url().should('be.equal', `${baseUrl}/admin/cadastrarprodutos`)
    cy.get('h1').should('have.text', 'Cadastro de Produtos')
  })

  it('Criação de produto leva à listagem de produtos com o produto recém criado', () => {
    cy.fillProductFormAndSubmit(product)
    cy.url().should('be.equal', `${baseUrl}/admin/listarprodutos`)
    cy.get('tbody').should('contain', product.nome)
  })

  it('Erro é exibido ao tentar criar produto com preço inválido', () => {
    product.preco = 'a'

    cy.fillProductFormAndSubmit(product)
    cy.contains(alertSelector, priceMustBeANumberText).should('be.visible')
  })

  it('Erros são exibidos ao tentar criar produto sem preencher os campos obrigatórios', () => {
    cy.get('[data-testid=cadastarProdutos]').click()
    cy.contains(alertSelector, 'nome não pode ficar em branco').should('be.visible')
    cy.contains(alertSelector, 'descricao não pode ficar em branco').should('be.visible')
    cy.contains(alertSelector, priceMustBeANumberText).should('be.visible')
    cy.contains(alertSelector, 'quantidade deve ser um número').should('be.visible')
  })
})

