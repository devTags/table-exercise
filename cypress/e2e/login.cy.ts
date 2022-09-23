describe('Login', () => {
  // it('should not login if the form is invalid', () => {
  //   cy.visit('/');
  //   cy.url().should('includes','login');
  //   cy.get('[formControlName="email"]').type('Nelson89@example.net');
  //   cy.get('button').click();
  //   cy.url().should('not.include', 'table');
  // })


  it('should not login if the form is invalid', () => {
    // cy.login('Nelson89@example.net','QvqCu0NfbH4DzLX');
    cy.visit('/');
    cy.url().should('includes','login');
    cy.get('[formControlName="email"]').type('Nelson89@example.net');
    cy.get('[formControlName="password"]').type('QvqCu0NfbH4DzLX');
    cy.get('button').click();
    cy.url().should('include', 'table');
  })
})
