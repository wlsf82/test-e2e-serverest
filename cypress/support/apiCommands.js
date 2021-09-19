Cypress.Commands.add('createUsersViaApi', () => {
  cy.request({
    method: 'POST',
    failOnStatusCode: false,
    headers:{ accept: '/' },
    url: 'https://serverest.dev/usuarios',
    body: {
      nome: 'Misael Adm',
      email: 'misael@gmail.com.br',
      password: 'teste',
      administrador: 'true'
    }
  })

  cy.request({
    method: 'POST',
    failOnStatusCode: false,
    headers:{ accept: '/' },
    url: 'https://serverest.dev/usuarios',
    body: {
      nome: 'Misael Usuario',
      email: 'misael@gmail.com',
      password: 'teste',
      administrador: 'false'
    }
  })
})

Cypress.Commands.add('bypassAdminLogin', () => {
  cy.createUsersViaApi()
  cy.request({
    method: 'POST',
    headers:{ accept: '/' },
    url: 'https://serverest.dev/login',
    body: {
      email: 'misael@gmail.com.br',
      password: 'teste'
    }
  }).then(({body}) => {
    window.localStorage.setItem('serverest/userNome', 'Misael Adm')
    window.localStorage.setItem('serverest/userEmail','misael@gmail.com.br')
    window.localStorage.setItem('serverest/userToken', body.authorization)
  })
})

Cypress.Commands.add('bypassUserLogin', () => {
  cy.createUsersViaApi()
  cy.request({
    method: 'POST',
    headers:{ accept : '/' },
    url: 'https://serverest.dev/login',
    body: {
      email: 'misael@gmail.com',
      password: 'teste'
    }
  }).then(({body}) => {
    window.localStorage.setItem('serverest/userNome', 'Misael Usuario')
    window.localStorage.setItem('serverest/userEmail','misael@gmail.com')
    window.localStorage.setItem('serverest/userToken', body.authorization)
  })
})

Cypress.Commands.add('createProductViaApi', () => {
  cy.createUsersViaApi()
  cy.request({
    method: 'POST',
    headers:{ accept: '/' },
    url: 'https://serverest.dev/login',
    body: {
      email: 'misael@gmail.com.br',
      password: 'teste'
    }
  }).then(({body}) => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      headers: { Authorization: body.authorization },
      url: 'https://serverest.dev/produtos',
      body: {
        nome: 'Teste Zael Uai',
        preco: 470,
        descricao: 'Mouse',
        quantidade: 381
      }
    })
  })
})
