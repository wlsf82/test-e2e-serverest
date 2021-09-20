/// <reference types = "Cypress" />

const faker = require('faker')

const baseUrl = Cypress.config('baseUrl')
const adminUsersListUrl = `${baseUrl}/admin/listarusuarios`
const alertSelector = '.alert'

describe('Cadastro de usuário Adm', () => {
  let user

  beforeEach(() => {
    user = {
      name: faker.name.firstName(),
      email : faker.internet.email(),
      password: 'teste',
      admin: true
    }

    cy.bypassAdminLogin()
  })

  context('Cadastro de usuário', () => {
    beforeEach(() => cy.visit('/admin/cadastrarusuarios'))

    it('Cadastro de usuário admin leva à página "/admin/listarusuarios" com novo usuário criado', () => {
      user.email = faker.internet.email()

      cy.createUser(user)
      cy.url().should('be.equal', adminUsersListUrl)
      cy.contains('tbody', user.name).should('be.visible')
    })

    it('Cadastro de usuário leva à página "/admin/listarusuarios" com novo usuário criado', () => {
      user.admin = false

      cy.createUser(user)
      cy.url().should('be.equal', adminUsersListUrl)
      cy.contains('tbody', user.name).should('be.visible')
    })

    it('Erro é exibido ao tentar criar usuário com email inválido', () => {
      user.email = "m@m"

      cy.createUser(user)
      cy.contains(alertSelector, 'email deve ser um email válido').should('be.visible')
    })

    it('Erros são exibidos ao tentar cadastrar usuário sem preenchimentos dos campos obrigatórios', () => {
      cy.get('[data-testid=cadastrarUsuario]').click()
      cy.contains(alertSelector, 'nome não pode ficar em branco').should('be.visible')
      cy.contains(alertSelector, 'email não pode ficar em branco').should('be.visible')
      cy.contains(alertSelector, 'password não pode ficar em branco').should('be.visible')
    })
  })

  context('Listagem de usuários', () => {
    beforeEach(() => cy.visit('admin/listarusuarios'))

    it('Exibe os principais elementos', () => {
      const tableHeadSelector = 'thead'

      cy.contains('h1', 'Lista dos usuários').should('be.visible')
      cy.contains(tableHeadSelector, 'Nome').should('be.visible')
      cy.contains(tableHeadSelector, 'Email').should('be.visible')
      cy.contains(tableHeadSelector, 'Senha').should('be.visible')
      cy.contains(tableHeadSelector, 'Administrador').should('be.visible')
      cy.contains(tableHeadSelector, 'Ações').should('be.visible')
      cy.contains('.btn-info', 'Editar').should('be.visible')
      cy.contains('.btn-danger', 'Excluir').should('be.visible')
    })

    it.skip('Usuário excluído não é exibido na lista', () => {
      const tableBodySelector = 'tbody'
      const tableBodyRowSelector = `${tableBodySelector} tr`

      cy.get(tableBodyRowSelector)
        .first()
        .find('td')
        .first()
        .then(name => {
          const userName = name[0].innerHTML

          cy.contains('.btn-danger', 'Excluir').click()
          cy.url().should('be.equal', adminUsersListUrl)
          cy.get(tableBodySelector).should('be.visible')
          cy.contains(tableBodyRowSelector, userName).should('not.exist')
        })
    })
  })
})
