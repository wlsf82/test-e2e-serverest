/// <reference types = "Cypress" />

const baseUrl = Cypress.config('baseUrl')
const homePageUrl = `${baseUrl}/home`
const myProductsListUrl = `${baseUrl}/minhaListaDeProdutos`
const cartEmptyMessageSelector = '[data-testid=shopping-cart-empty-message]'
const yourCartIsEmptyText = 'Seu carrinho está vazio'
const headingOneSelector = 'h1'

describe('Acessar lista de compra', () => {
  beforeEach(() => {
    cy.bypassUserLogin()
    cy.visit('/minhaListaDeProdutos')
  })

  it('URL é "/minhaListaDeProdutos" e h1 e parágrafo estão corretos', () => {
    cy.contains(headingOneSelector, 'Lista de Compras').should('be.visible')
    cy.contains(cartEmptyMessageSelector, yourCartIsEmptyText).should('be.visible')
    cy.url().should('be.equal', myProductsListUrl)
  })

  it('Clique no botão "Página inicial" leva à página home', () => {
    cy.get('[data-testid=paginaInicial]').click()
    cy.url().should('be.equal', homePageUrl)
  })
})

describe('Lista de compras com produto', () => {
  const product = 'Teste Zael Uai'

  beforeEach(() => {
    cy.createProductViaApi()
    cy.bypassUserLogin()
    cy.visit('/home')
    cy.get('[data-testid=pesquisar]').type(product)
    cy.get('[data-testid=botaoPesquisar]').click()
  })

  context('Detalhes do produto', () => {
    beforeEach(() => {
      cy.get('.card-link').click()
      cy.contains(headingOneSelector, 'Detalhes do produto').should('be.visible')
      cy.contains('[data-testid=product-detail-name]', product).should('be.visible')
    })

    it('Clique no botão "Voltar" leva à página home', () => {
      cy.get('[data-testid=voltarHome]').click()
      cy.url().should('be.equal', homePageUrl)
    })

    context('Produto adicionado na lista', () => {
      beforeEach(() => {
        cy.get('[data-testid=adicionarNaLista]').click()
        cy.url().should('be.equal', myProductsListUrl)
      })

      it('Clique no botão "Limpar Lista" exibe carrinho vazio', () => {
        cy.get('[data-testid=limparLista]').click()
        cy.contains(cartEmptyMessageSelector, yourCartIsEmptyText).should('be.visible')
      })

      it('Clique no botão "Adicionar no carrinho" leva à página em construção "/carrinho"', () => {
        cy.get('[data-testid="adicionar carrinho"]').click()
        cy.url().should('be.equal', `${baseUrl}/carrinho`)
        cy.contains(headingOneSelector, 'Em construção aguarde').should('be.visible')
      })

      context('Seleciona mais um do mesmo produto', () => {
        const counterSelector = '.row > :nth-child(3)'

        beforeEach(() => cy.get('[data-testid=product-increase-quantity]').click())

        it('Clique no botão + incrementa o número de produtos', () => {
          cy.get(counterSelector).should('have.text', '2')
        })

        it('Clique no botão - decrementa o número de protudos', () => {
          cy.get('[data-testid=product-decrease-quantity]').click()
          cy.get(counterSelector).should('have.text', '1')
          cy.url().should('be.equal', myProductsListUrl)
        })
      })
    })
  })
})
