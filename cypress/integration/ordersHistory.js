describe('Orders history', () => {
  beforeEach(() => {
    const API_URL = Cypress.env('REACT_APP_API_URL');
    const ingredientsUrl = `${API_URL}/ingredients`;
    const postOrderUrl = `${API_URL}/orders`;
    cy.intercept(ingredientsUrl, {
      fixture: 'ingredients',
    });
    cy.intercept('GET', postOrderUrl, {
      fixture: 'orders',
    });
    cy.visit('http://localhost:3000/');
    cy.login();
  });
  it('should show orders history list', () => {
    cy.findAllByRole('button').first().click();
    cy.findByText(/история заказов/i).click();
    cy.findByRole('button').should('have.text', 'Авторизоваться');
  });
});
