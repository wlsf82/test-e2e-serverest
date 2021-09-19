function visit(){
  cy.visit('')
}

function validaUrl(expectedUrl){
  cy.url().should('be.equal', expectedUrl)
}

function checkPlaceHolder(element, expectedText){
  cy.get(element).should('have.attr', 'placeholder', expectedText)
}

function validaTexto(element, expectedText){
  cy.get(element).should('have.text', expectedText)
}

function validaElementoVisivel(element){
  cy.get(element).should('be.visible')
}

function clicar(element){
  cy.get(element).click()
}

function digitar(element, expectedText){
  cy.get(element).type(expectedText)
}

module.exports = {
  visit,
  validaUrl,
  checkPlaceHolder,
  validaTexto,
  validaElementoVisivel,
  clicar,
  digitar
}
