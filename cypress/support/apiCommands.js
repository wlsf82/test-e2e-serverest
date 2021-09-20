const apiUrl = 'https://serverest.dev'
const usersUrl = `${apiUrl}/usuarios`
const loginUrl = `${apiUrl}/login`

Cypress.Commands.add('createUsersViaApi', () => {
  cy.request({
    method: 'POST',
    failOnStatusCode: false,
    headers: { accept: '/' },
    url: usersUrl,
    body: {
      nome: 'Misael Adm',
      email: Cypress.env('USER'),
      password: Cypress.env('PASSOWRD'),
      administrador: 'true'
    }
  })

  cy.request({
    method: 'POST',
    failOnStatusCode: false,
    headers:{ accept: '/' },
    url: usersUrl,
    body: {
      nome: 'Misael Usuario',
      email: 'misael@gmail.com',
      password: Cypress.env('PASSOWRD'),
      administrador: 'false'
    }
  })
})

Cypress.Commands.add('bypassAdminLogin', () => {
  cy.createUsersViaApi()
  cy.request({
    method: 'POST',
    headers: { accept: '/' },
    url: loginUrl,
    body: {
      email: Cypress.env('USER'),
      password: Cypress.env('PASSOWRD')
    }
  }).then(({body}) => {
    window.localStorage.setItem('serverest/userNome', 'Misael Adm')
    window.localStorage.setItem('serverest/userEmail', Cypress.env('USER'))
    window.localStorage.setItem('serverest/userToken', body.authorization)
  })
})

Cypress.Commands.add('bypassUserLogin', () => {
  cy.createUsersViaApi()
  cy.request({
    method: 'POST',
    headers:{ accept : '/' },
    url: loginUrl,
    body: {
      email: 'misael@gmail.com',
      password: Cypress.env('PASSOWRD')
    }
  }).then(({body}) => {
    window.localStorage.setItem('serverest/userNome', 'Misael Usuario')
    window.localStorage.setItem('serverest/userEmail', 'misael@gmail.com')
    window.localStorage.setItem('serverest/userToken', body.authorization)
  })
})

Cypress.Commands.add('createProductViaApi', () => {
  cy.createUsersViaApi()
  cy.request({
    method: 'POST',
    headers:{ accept: '/' },
    url: loginUrl,
    body: {
      email: Cypress.env('USER'),
      password: Cypress.env('PASSOWRD')
    }
  }).then(({body}) => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      headers: { Authorization: body.authorization },
      url: `${apiUrl}/produtos`,
      body: {
        nome: 'Teste Zael Uai',
        preco: 470,
        descricao: 'Mouse',
        quantidade: 381
      }
    })
  })
})
