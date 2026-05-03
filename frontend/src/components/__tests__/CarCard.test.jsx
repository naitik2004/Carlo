import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CarCard from '../CarCard';

const mockCar = {
  _id: '1',
  brand: 'Toyota',
  model: 'Camry',
  year: 2020,
  pricePerDay: 50,
  seats: 5,
  fuelType: 'Gasoline',
  transmission: 'Automatic',
  location: 'New York',
  images: ['https://example.com/car.jpg'],
};

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('CarCard', () => {
  it('renders car details correctly', () => {
    renderWithRouter(<CarCard car={mockCar} />);

    expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(screen.getByText('$50/day')).toBeInTheDocument();
    expect(screen.getByText('5 Seats')).toBeInTheDocument();
    expect(screen.getByText('Gasoline')).toBeInTheDocument();
    expect(screen.getByText('Automatic')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('View Details')).toBeInTheDocument();
  });

  it('displays placeholder image if no images', () => {
    const carWithoutImage = { ...mockCar, images: [] };
    renderWithRouter(<CarCard car={carWithoutImage} />);

    const img = screen.getByAltText('Toyota Camry');
    expect(img).toHaveAttribute('src', 'https://via.placeholder.com/400x300?text=Car');
  });
});