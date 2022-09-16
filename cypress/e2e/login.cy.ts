describe('Login', () => {
  it('should not login if the form is invalid', () => {
    cy.visit('/');
    cy.url().should('includes','login');
    cy.get('[formControlName="username"]').type('Grant_Collier19@example.com');
    cy.get('button').click();
    cy.url().should('not.include', 'table');
  })


  it('should not login if the form is invalid', () => {
    cy.login('Grant_Collier19@example.com','xgFvR2fIja5BPAP');
    // cy.visit('/');
    // cy.url().should('includes','login');
    // cy.get('[formControlName="username"]').type('Grant_Collier19@example.com');
    // cy.get('[formControlName="password"]').type('xgFvR2fIja5BPAP');
    // cy.get('button').click();
    cy.url().should('include', 'table');
  })
})
