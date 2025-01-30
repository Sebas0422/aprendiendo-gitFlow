import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

test('renders Cuenta component', () => {
    render(<h1>Hola mundo</h1>)
    expect(screen.getByText('Hola mundo')).toBeInTheDocument();
});