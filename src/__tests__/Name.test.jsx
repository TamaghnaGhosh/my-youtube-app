import { render, screen } from '@testing-library/react';
import Name from '../Name';
import { expect, it} from 'vitest';

it('renders Name element', () => {
  render(<Name />);
  const nameElement = screen.getByText('Name');
  expect(nameElement).toBeInTheDocument();
});