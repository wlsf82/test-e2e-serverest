/// <reference types = "Cypress" />

import homePage from '../page/home.page'

const {
  validaTexto,
  validaUrl,
  clicar,
  digitar,
  validaElementoVisivel
} = require('../actions/principal.action')

describe('Home - Adm', () => {
  beforeEach(() => {
    cy.bypassAdminLogin()
    cy.visit('admin/home')
  })

  it('valida home - Adm', () => {
    validaUrl('https://front.serverest.dev/admin/home')
    validaElementoVisivel(homePage.logo)
  })

  it('Cadastrar usuário - btn', () => {
    clicar(homePage.btnCadastrarUsuario)
    validaUrl('https://front.serverest.dev/admin/cadastrarusuarios')
  })

  it('Cadastrar usuário - btn menu', () => {
    clicar(homePage.btnMenuCadastrarUsuario)
    validaUrl('https://front.serverest.dev/admin/cadastrarusuarios')
  })

  it('Listar usuário - btn', () => {
    clicar(homePage.btnListarUsuario)
    validaUrl('https://front.serverest.dev/admin/listarusuarios')
  })

  it('Listar usuário - btn menu', () => {
    clicar(homePage.btnMenuListarUsuario)
    validaUrl('https://front.serverest.dev/admin/listarusuarios')
  })

  it('Cadastrar produto - btn', () => {
    clicar(homePage.btnCadastrarProduto)
    validaUrl('https://front.serverest.dev/admin/cadastrarprodutos')
  })

  it('Cadastrar produto - btn menu', () => {
    clicar(homePage.btnMenuCadastrarProduto)
    validaUrl('https://front.serverest.dev/admin/cadastrarprodutos')
  })


  it('Listar produto - btn', () => {
    clicar(homePage.btnListarProduto)
    validaUrl('https://front.serverest.dev/admin/listarprodutos')
  })

  it('Listar produto - btn menu', () => {
    clicar(homePage.btnMenuListarProduto)
    validaUrl('https://front.serverest.dev/admin/listarprodutos')
  })

  it('Listar relatório - btn', () => {
    clicar(homePage.btnRelatorio)
    validaUrl('https://front.serverest.dev/admin/relatorios')
    })

  it('Listar produto - btn menu', () => {
    clicar(homePage.btnMenuRelatorio)
    validaUrl('https://front.serverest.dev/admin/relatorios')
  })

  it('Valida texto', () => {
    validaTexto(homePage.textAdm, 'Este é seu sistema para administrar seu ecommerce.')
  })

  it('Home', () => {
    clicar(homePage.btnMenuRelatorio)
    clicar(homePage.btnHome)
    validaUrl('https://front.serverest.dev/admin/home')
  })

  it('Logout', () => {
    clicar(homePage.btnlogout)
    validaUrl('https://front.serverest.dev/login')
  })
})

describe('Home - User', () => {
  beforeEach(() => {
    cy.bypassUserLogin()
    cy.visit('home')
  })

  it('valida home user', () => {
    validaUrl('https://front.serverest.dev/home')
    validaElementoVisivel(homePage.logoUser)
  })

  it('Listar carrinho', () => {
    clicar(homePage.btnCarrinho)
    validaUrl('https://front.serverest.dev/carrinho')
  })

  it('Home', () => {
    validaElementoVisivel(homePage.btnCarrinho)
    clicar(homePage.btnHome)
    validaUrl('https://front.serverest.dev/home')
  })

  it('Lista de compra', () => {
    clicar(homePage.btnMenuListaCompra)
    validaUrl('https://front.serverest.dev/minhaListaDeProdutos')
  })

  it('Logout', () => {
    clicar(homePage.btnlogout)
    validaUrl('https://front.serverest.dev/login')
  })

  it('Pesquisando produtos', () => {
    cy.createProduct()
    digitar(homePage.inputPesquisar, 'Teste Zael Uai')
    clicar(homePage.btnPesquisar)
    validaElementoVisivel(homePage.product)
  })

  it('Pesquisando produto inexistente', () => {
    cy.createProduct()
    digitar(homePage.inputPesquisar, 'kkkkkkkkkkkkkkk')
    clicar(homePage.btnPesquisar)
    validaTexto(homePage.textProdutoNaoEncontrado, 'Nenhum produto foi encontrado')
  })
})
