/// <reference types = "Cypress" />

const baseUrl = Cypress.config('baseUrl')

describe('Homepage as admin', () => {
  beforeEach(() => {
    cy.bypassAdminLogin()
    cy.visit('/admin/home')
  })

  it('URL é "/admin/home", logo está visível e parágrapho está correto', () => {
    cy.url()
      .should('be.equal', `${baseUrl}/admin/home`)
    cy.get('.lead')
      .should('have.text', 'Este é seu sistema para administrar seu ecommerce.')
      .and('be.visible')
    cy.get('.imagem').should('be.visible')
  })

  it('Clique no botão "Cadastrar" da seção "Cadastrar Usuários" leva à página "/admin/cadastrarusuarios"', () => {
    cy.get('[data-testid=cadastrarUsuarios]').click()
    cy.url()
      .should('be.equal', `${baseUrl}/admin/cadastrarusuarios`)
  })

  it('Clique no botão "Cadastrar Usuários" do menu leva à página "/admin/cadastrarusuarios"', () => {
    cy.get('[data-testid=cadastrar-usuarios]').click()
    cy.url()
      .should('be.equal', `${baseUrl}/admin/cadastrarusuarios`)
  })

  it('Clique no botão "Listar" da seção "Listar Usuários" leva à página "/admin/listarusuarios"', () => {
    cy.get('[data-testid=listarUsuarios]').click()
    cy.url()
      .should('be.equal', `${baseUrl}/admin/listarusuarios`)
  })

  it('Clique no botão "Listar Usuários" do menu leva à página "/admin/listarusuarios"', () => {
    cy.get('[data-testid=listar-usuarios]').click()
    cy.url()
      .should('be.equal', `${baseUrl}/admin/listarusuarios`)
  })

  it('Clique no botão "Cadastrar" da seção "Cadastrar Produtos" leva à página "/admin/cadastrarprodutos"', () => {
    cy.get('[data-testid=cadastrarProdutos]').click()
    cy.url()
      .should('be.equal', `${baseUrl}/admin/cadastrarprodutos`)
  })

  it('Clique no botão "Cadastrar Produtos" do menu leva à página "/admin/cadastrarprodutos"', () => {
    cy.get('[data-testid=cadastrar-produtos]').click()
    cy.url()
      .should('be.equal', `${baseUrl}/admin/cadastrarprodutos`)
  })


  it('Clique no botão "Listar" da seção "Listar Produtos" leva à página "/admin/listarprodutos"', () => {
    cy.get('[data-testid=listarProdutos]',).click()
    cy.url()
      .should('be.equal', `${baseUrl}/admin/listarprodutos`)
  })

  it('Clique no botão "Listar Produtos" do menu" leva à página "/admin/listarprodutos"', () => {
    cy.get('[data-testid=listar-produtos]').click()
    cy.url()
      .should('be.equal', `${baseUrl}/admin/listarprodutos`)
  })

  it('Clique no botão "Ver" da seção "Relatórios" leva à página "/admin/relatorios"', () => {
    cy.get('[data-testid=relatorios]').click()
    cy.url()
      .should('be.equal', `${baseUrl}/admin/relatorios`)
  })

  it('Clique no botão "Relatórios" do menu leva à página "/admin/relatorios"', () => {
    cy.get('[data-testid=link-relatorios]').click()
    cy.url()
      .should('be.equal', `${baseUrl}/admin/relatorios`)
  })

  it('Estando em outra página, clique no menu "Home" leva à página home', () => {
    cy.get('[data-testid=link-relatorios]').click()
    cy.get('[data-testid=home]').click()
    cy.url()
      .should('be.equal', `${baseUrl}/admin/home`)
  })

  it('Faz logout com sucesso', () => {
    cy.get('[data-testid=logout]').click()
    cy.url()
      .should('be.equal', `${baseUrl}/login`)
  })
})

describe('Home - User', () => {
  beforeEach(() => {
    cy.bypassUserLogin()
    cy.visit('home')
  })

  it('valida home user', () => {
    cy.url()
      .should('be.equal', `${baseUrl}/home`)
    cy.get('#navbarTogglerDemo01 > .imagem').should('be.visible')
  })

  it('Listar carrinho', () => {
    cy.get('[data-testid=carrinho]').click()
    cy.url()
      .should('be.equal', `${baseUrl}/carrinho`)
  })

  it('Home', () => {
    cy.get('[data-testid=carrinho]').should('be.visible')
    cy.get('[data-testid=home]').click()
    cy.url()
      .should('be.equal', `${baseUrl}/home`)
  })

  it('Lista de compra', () => {
    cy.get('[data-testid=lista-de-compras]').click()
    cy.url()
      .should('be.equal', `${baseUrl}/minhaListaDeProdutos`)
  })

  it('Pesquisando produtos', () => {
    cy.createProductViaApi()
    cy.get('[data-testid=pesquisar]').type('Teste Zael Uai')
    cy.get('[data-testid=botaoPesquisar]').click()
    cy.get('.card').should('be.visible')
  })

  it('Pesquisando produto inexistente', () => {
    cy.createProductViaApi()
    cy.get('[data-testid=pesquisar]').type('kkkkkkkkkkkkkkk')
    cy.get('[data-testid=botaoPesquisar]').click()
    cy.get('.espacamento > .col-12 > .row')
      .should('have.text', 'Nenhum produto foi encontrado')
  })
})
