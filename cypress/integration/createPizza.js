describe('Create a pizza', () => {
  beforeEach(() => {
    const API_URL = Cypress.env('REACT_APP_API_URL');
    const ingredientsUrl = `${API_URL}/ingredients`;
    cy.intercept(ingredientsUrl, {
      fixture: 'ingredients',
    });
    cy.visit('http://localhost:3000/');
    cy.login();
  });
  it('should add selected ingredients to pizza', () => {
    cy.findByText('35 см').click();
    cy.findByText(/пышное/i).click();
    cy.findAllByRole('checkbox').first().click({ force: true }).should('be.checked');
    cy.findAllByRole('button').last().should('not.have.text', 'Заказать за 200 руб');
    cy.findAllByRole('button').last().click();
    cy.findAllByRole('heading').first().contains('Оформление заказа').should('be.visible');
  });
});
