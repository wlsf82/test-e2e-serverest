/// <reference types = "Cypress" />

const baseUrl = Cypress.config('baseUrl')
const menuHomeSelector = '[data-testid=home]'

describe('Homepage - Admin', () => {
  beforeEach(() => {
    cy.bypassAdminLogin()
    cy.visit('/admin/home')
  })

  it('URL é "/admin/home", logo está visível e parágrapho está correto', () => {
    cy.url().should('be.equal', `${baseUrl}/admin/home`)
    cy.contains('.lead', 'Este é seu sistema para administrar seu ecommerce.')
      .should('be.visible')
    cy.get('.imagem').should('be.visible')
  })

  context('Cadastrar Usuários', () => {
    const createUsersUrl = `${baseUrl}/admin/cadastrarusuarios`

    it('Clique no botão "Cadastrar" da seção "Cadastrar Usuários" leva à página "/admin/cadastrarusuarios"', () => {
      cy.get('[data-testid=cadastrarUsuarios]').click()
      cy.url().should('be.equal', createUsersUrl)
    })

    it('Clique no botão "Cadastrar Usuários" do menu leva à página "/admin/cadastrarusuarios"', () => {
      cy.get('[data-testid=cadastrar-usuarios]').click()
      cy.url().should('be.equal', createUsersUrl)
    })
  })

  context('Listar Usuários', () => {
    const listUsersUrl = `${baseUrl}/admin/listarusuarios`

    it('Clique no botão "Listar" da seção "Listar Usuários" leva à página "/admin/listarusuarios"', () => {
      cy.get('[data-testid=listarUsuarios]').click()
      cy.url().should('be.equal', listUsersUrl)
    })

    it('Clique no botão "Listar Usuários" do menu leva à página "/admin/listarusuarios"', () => {
      cy.get('[data-testid=listar-usuarios]').click()
      cy.url().should('be.equal', listUsersUrl)
    })
  })

  context('Cadastrar Produtos', () => {
    const createProductsUrl = `${baseUrl}/admin/cadastrarprodutos`

    it('Clique no botão "Cadastrar" da seção "Cadastrar Produtos" leva à página "/admin/cadastrarprodutos"', () => {
      cy.get('[data-testid=cadastrarProdutos]').click()
      cy.url().should('be.equal', createProductsUrl)
    })

    it('Clique no botão "Cadastrar Produtos" do menu leva à página "/admin/cadastrarprodutos"', () => {
      cy.get('[data-testid=cadastrar-produtos]').click()
      cy.url().should('be.equal', createProductsUrl)
    })
  })

  context('Listar Produtos', () => {
    const listProductsUrl = `${baseUrl}/admin/listarprodutos`

    it('Clique no botão "Listar" da seção "Listar Produtos" leva à página "/admin/listarprodutos"', () => {
      cy.get('[data-testid=listarProdutos]',).click()
      cy.url().should('be.equal', listProductsUrl)
    })

    it('Clique no botão "Listar Produtos" do menu" leva à página "/admin/listarprodutos"', () => {
      cy.get('[data-testid=listar-produtos]').click()
      cy.url().should('be.equal', listProductsUrl)
    })
  })

  context('Relatórios', () => {
    const reportsUrl = `${baseUrl}/admin/relatorios`

    it('Clique no botão "Ver" da seção "Relatórios" leva à página "/admin/relatorios"', () => {
      cy.get('[data-testid=relatorios]').click()
      cy.url().should('be.equal', reportsUrl)
    })

    it('Clique no botão "Relatórios" do menu leva à página "/admin/relatorios"', () => {
      cy.get('[data-testid=link-relatorios]').click()
      cy.url().should('be.equal', reportsUrl)
    })
  })

  it('Estando em outra página, clique no menu "Home" leva à página home', () => {
    cy.get('[data-testid=link-relatorios]').click()
    cy.get(menuHomeSelector).click()
    cy.url().should('be.equal', `${baseUrl}/admin/home`)
  })

  it('Faz logout com sucesso', () => {
    cy.get('[data-testid=logout]').click()
    cy.url().should('be.equal', `${baseUrl}/login`)
  })
})

describe('Homepage - User', () => {
  const cartSelector = '[data-testid=carrinho]'
  const homeUrl = `${baseUrl}/home`

  beforeEach(() => {
    cy.bypassUserLogin()
    cy.visit('/home')
  })

  it('URL é "/home" e logo está visível', () => {
    cy.url().should('be.equal', homeUrl)
    cy.get('#navbarTogglerDemo01 .imagem').should('be.visible')
  })

  it('Clique no menu "Carrinho" leva à página "/carrinho"', () => {
    cy.get(cartSelector).click()
    cy.url().should('be.equal', `${baseUrl}/carrinho`)
  })

  it('Estando em outra página, clique no menu "Home" leva à página home', () => {
    cy.get(cartSelector).click()
    cy.get(menuHomeSelector).click()
    cy.url().should('be.equal', homeUrl)
  })

  it('Clique no menu "Lista de Compras" leva à página "/minhaListaDeProdutos"', () => {
    cy.get('[data-testid=lista-de-compras]').click()
    cy.url().should('be.equal', `${baseUrl}/minhaListaDeProdutos`)
  })

  context('Produtos', () => {
    it('Encontra produto ao pesquisar por produtos existente', () => {
      const product = 'Teste Zael Uai'

      cy.createProductViaApi()

      cy.get('[data-testid=pesquisar]').type(product)
      cy.get('[data-testid=botaoPesquisar]').click()
      cy.contains('.card', product).should('be.visible')
    })

    it('Não encontra produto ao pesquisar por produto não existente', () => {
      cy.get('[data-testid=pesquisar]').type('kkkkkkkkkkkkkkk')
      cy.get('[data-testid=botaoPesquisar]').click()
      cy.contains('p', 'Nenhum produto foi encontrado').should('be.visible')
    })
  })
})
