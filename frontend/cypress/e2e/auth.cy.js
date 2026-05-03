describe('User Authentication Flow', () => {
  it('should allow user to login and view dashboard', () => {
    // Visit the login page
    cy.visit('http://localhost:5173/login');

    // Fill in login form
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Should redirect to dashboard or home
    cy.url().should('not.include', '/login');

    // Check if user is logged in (e.g., check for logout button or user name)
    cy.contains('Dashboard').should('be.visible');
  });

  it('should show error for invalid credentials', () => {
    cy.visit('http://localhost:5173/login');

    cy.get('input[name="email"]').type('invalid@example.com');
    cy.get('input[name="password"]').type('wrongpassword');

    cy.get('button[type="submit"]').click();

    // Should show error message
    cy.contains('Invalid credentials').should('be.visible');
  });
});