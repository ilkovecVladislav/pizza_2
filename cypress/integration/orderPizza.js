describe('Order a pizza', () => {
  beforeEach(() => {
    const API_URL = Cypress.env('REACT_APP_API_URL');
    const ingredientsUrl = `${API_URL}/ingredients`;
    const postOrderUrl = `${API_URL}/orders`;
    cy.intercept(ingredientsUrl, {
      fixture: 'ingredients',
    });
    cy.intercept('POST', postOrderUrl, {
      statusCode: 200,
    });
    cy.intercept('GET', postOrderUrl, {
      fixture: 'orders',
    });
    cy.visit('http://localhost:3000/');
    cy.login();
  });
  it('should order a pizza', () => {
    cy.findAllByRole('button').last().click();
    cy.findByPlaceholderText('Введите адрес').focus().type('Sample street, 44');
    cy.findByPlaceholderText('Номер карты').type('4444 1111 2222 3333');
    cy.findByPlaceholderText('Номер телефона').type('77441122');
    cy.findByPlaceholderText('Имя как на карте').type('Simple Name');
    cy.findAllByRole('button').last().click();
    cy.findByText(/спасибо за заказ/i).should('be.visible');
  });
});
