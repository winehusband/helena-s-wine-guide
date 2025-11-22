import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BackButton } from './BackButton';

describe('BackButton', () => {
  it('should render back button', () => {
    render(<BackButton onClick={vi.fn()} />);
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('should call onClick when clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();

    render(<BackButton onClick={mockOnClick} />);

    await user.click(screen.getByText('Back'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should apply custom className', () => {
    const { container } = render(<BackButton onClick={vi.fn()} className="custom-class" />);
    const button = container.querySelector('button');
    expect(button?.className).toContain('custom-class');
  });
});
