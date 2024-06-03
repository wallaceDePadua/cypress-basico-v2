Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function(){
    cy.get('#firstName').type('Wallace')
    cy.get('#lastName').type('Araujo')
    cy.get('#email').type('wallace@exemplo.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button','Enviar').click()
})