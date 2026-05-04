describe('Home Page', () => {
  it('should display the hero section', () => {
    cy.visit('/');

    cy.contains('Find the perfect car for your next journey').should('be.visible');
    cy.contains('Choose from our wide range of premium vehicles').should('be.visible');
  });

  it('should display the search form', () => {
    cy.visit('/');

    cy.get('input[name="location"]').should('exist');
    cy.get('input[name="minPrice"]').should('exist');
    cy.get('input[name="maxPrice"]').should('exist');
    cy.contains('button', 'Search').should('be.visible');
  });

  it('should display the Available Vehicles section', () => {
    cy.visit('/');

    cy.contains('Available Vehicles').should('be.visible');
  });

  it('should navigate to login page', () => {
    cy.visit('/');

    cy.contains('Login').click();
    cy.url().should('include', '/login');
    cy.contains('Welcome Back').should('be.visible');
  });

  it('should navigate to signup page', () => {
    cy.visit('/');

    cy.contains('Sign Up').click();
    cy.url().should('include', '/signup');
    cy.contains('Create Account').should('be.visible');
  });
});
