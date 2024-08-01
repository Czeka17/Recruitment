import 'cypress-real-events/support';

describe('Todo Actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
      });

      it('should add new ToDo by clicking button', () => {
        cy.get('[data-cy=todo-input]').type('Write test in cypress')
        cy.get('[data-cy=add-todo-svg]').click()
        cy.get('[data-cy=todo-input]').should('have.value', '') 
        cy.contains('Write test in cypress')
      })

      it('should add new ToDo by clicking enter', () => {
        cy.get('[data-cy=todo-input]')
    .type('Write test in cypress with enter key{enter}')
  
        cy.get('[data-cy=todo-input]').should('have.value', '') 
        cy.contains('Write test in cypress with enter key')
      })

      it('should add completed ToDo', () => {
        cy.get('[data-cy=todo-input]').type('Write test in cypress')
        cy.get('[data-cy=set-complete-svg]')
        cy.get('[data-cy=add-todo-svg]').click()
        cy.get('[data-cy=todo-input]').should('have.value', '') 
        cy.contains('Write test in cypress')
      })

      it('should add new ToDo and check if it is completed', () => {
        cy.get('[data-cy=set-complete-svg]').click()
        cy.get('[data-cy=todo-input]').type('Complete test item{enter}')
        cy.wait(300)
      
        const completedClass = 'todo_completed__pT-Xd'
        cy.get('[data-cy=todo-input]').should('have.value', '')

        cy.get('[data-cy=todo-p]')
        .should('have.class', completedClass)
      })

      it('should add a new ToDo, hover to show delete button, and then remove it', () => {
        cy.get('[data-cy=todo-input]').type('Task to be deleted{enter}')
        cy.get('[data-cy=todo-input]').should('have.value', '')
        cy.get('[data-cy=todo-item]').contains('Task to be deleted')
          .trigger('mouseover', { force: true }) 
          .get('[data-cy=delete-todo-svg]')
          .click()
        cy.contains('You dont have any todos!')
      })
})