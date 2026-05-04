import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import { AuthProvider } from '../../context/AuthContext';

// Helper to render with required providers
const renderNavbar = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Navbar', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the logo and brand name', () => {
    renderNavbar();
    expect(screen.getByText('Carlo')).toBeInTheDocument();
  });

  it('renders Browse Cars link', () => {
    renderNavbar();
    // There may be both desktop and mobile links
    const links = screen.getAllByText('Browse Cars');
    expect(links.length).toBeGreaterThanOrEqual(1);
  });

  it('shows Login and Sign Up when user is not logged in', () => {
    renderNavbar();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('shows user name and Logout when user is logged in', () => {
    // Simulate a logged-in user by setting localStorage before render
    localStorage.setItem(
      'user',
      JSON.stringify({ _id: '1', name: 'Test User', email: 'test@example.com', token: 'abc123' })
    );

    renderNavbar();
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('shows Dashboard and List Your Car links when logged in', () => {
    localStorage.setItem(
      'user',
      JSON.stringify({ _id: '1', name: 'Test User', email: 'test@example.com', token: 'abc123' })
    );

    renderNavbar();
    const dashboardLinks = screen.getAllByText('Dashboard');
    expect(dashboardLinks.length).toBeGreaterThanOrEqual(1);

    const listLinks = screen.getAllByText('List Your Car');
    expect(listLinks.length).toBeGreaterThanOrEqual(1);
  });
});
