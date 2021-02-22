describe('Login', () => {
  beforeEach(() => {
    const API_URL = Cypress.env('REACT_APP_API_URL');
    const ingredientsUrl = `${API_URL}/ingredients`;
    cy.intercept(ingredientsUrl, {
      fixture: 'ingredients',
    });
    cy.visit('http://localhost:3000/');
    cy.login();
  });
  it('should login an existing user', () => {
    cy.findByText(/собери свою пиццу/i).should('be.visible');
  });
});
