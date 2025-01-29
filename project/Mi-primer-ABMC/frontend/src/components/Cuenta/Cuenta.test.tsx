import { render, screen } from '@testing-library/react';
import Cuenta from './Cuenta';
import '@testing-library/jest-dom';

test('renders Cuenta component', () => {
    render(<Cuenta />)
    expect(screen.getByText('Buscar Cuenta')).toBeInTheDocument();
});