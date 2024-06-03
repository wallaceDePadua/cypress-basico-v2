 //desafio (testando a politica de orivacidade de forma independente)
 it.only('testa a página da politica de privacidade de forma independente',function(){
    cy.visit('./src/privacy.html') 
    cy.contains('Talking About Testing').should('be.visible')
    
 })