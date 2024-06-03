/// <reference types="Cypress" />

// Define a resolução móvel manualmente
describe('Testes móveis', () => {
    beforeEach(() => {
      cy.viewport(375, 812) // iPhone X resolution
    })
  

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    

    it('verifica o título da aplicação', function() {
       

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    // caminho feliz
    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText='teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste.'
        cy.get('#firstName').type('Wallace')
        cy.get('#lastName').type('Araujo')
        cy.get('#email').type('wallace@exemplo.com')
        cy.get('#open-text-area').type(longText, { delay: 0} )
        cy.contains('button','Enviar').click()

        cy.get('.success').should('be.visible')
    })

    //cenário com email inválido
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação invalida', function(){
        cy.get('#firstName').type('Wallace')
        cy.get('#lastName').type('Araujo')
        cy.get('#email').type('wallace,')
        cy.get('#open-text-area').type('teste')
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })

    //cenário com telefone com valor invalido
    it('campo telefone continua vazio quando preenchido com valor não numérico', function(){
        cy.get('#phone')
        .type('abcdefghij')
        .should('have.value','')
    })

    //cenário  com telefone se tornando obrigatório
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
        cy.get('#firstName').type('Wallace')
        cy.get('#lastName').type('Araujo')
        cy.get('#email').type('wallace@exemplo.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        cy.contains('button','Enviar').click()
        

        cy.get('.error').should('be.visible')
    
    })

    //cenário  com telefone se tornando obrigatório e corretamnete preenchido
        it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
        cy.get('#firstName').type('Wallace')
        cy.get('#lastName').type('Araujo')
        cy.get('#email').type('wallace@exemplo.com')
        cy.get('#phone-checkbox').check()
        cy.get('#phone').type(1234)
        cy.get('#open-text-area').type('teste')
        cy.contains('button','Enviar').click()
        

        cy.get('.success').should('be.visible')
    
    })

    //cenário que preenche e limpa os campos nome, sobrenome, email e telefone(vai dar erro por nao ter os campos obrigatórios preenchidos)
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
        .type('Wallace')
        .should('have.value', 'Wallace')
        .clear()
        .should('have.value', '')
        cy.get('#lastName')
        .type('Araujo')
        .should('have.value', 'Araujo')
        .clear()
        .should('have.value', '')
        cy.get('#email')
        .type('wallace@exemplo.com')
        .should('have.value', 'wallace@exemplo.com')
        .clear()
        .should('have.value', '')
        cy.get('#phone-checkbox').click()
        cy.get('#phone')
        .type(1234)
        .should('have.value', 1234)
        .clear()
        .should('have.value', '')
        cy.contains('button','Enviar').click()
         

        cy.get('.error').should('be.visible')
    })

    //envia o formulário usando comando customizado
    it('envia o formulário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    //selecionando o produto Youtube por seu texto
    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
        .select('YouTube')
        .should('have.value','youtube')
        
 
    })

    //selecionando o produto Mentoria por seu valor
    it('seleciona um produto (Mentoria) por seu valor (value)',function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value','mentoria')
    })
    
    //seleciona um produto blog pelo seu indice
    it('seleciona um produto (Blog) por seu índice', function(){
        cy. get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    //usando a função radio da aplicação
    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input [type="radio"], [value="feedback"]')
        .check()
        .should('have.value', 'feedback')

    })

    //marca cada tipo de atendimento
    it('Marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]').check().should('be.checked')
    })

    //marcando e desmarcando checkbox
    it('marcando ambos os checkboxes, depois desmarca o ultimo', function() { 
        cy.get('#check > input[type*=checkbox]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    //fazendo upload de arquivo
    it('Seleciona um arquivo da pasta fixtures', function(){
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    //simulando drag-end-drop
    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
  })

  //usando o alias
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
        .selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
            
    //usando links que abrem em outras abas
    it('verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    //clicano no link e removendo a target
    it('acessa a página da politica de privacidade removendo a target e então clicando no link',function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
        cy.contains('Talking About Testing').should('be.visible')
    })

   

})
})
