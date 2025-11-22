import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuestionView } from './QuestionView';

describe('QuestionView', () => {
  it('should render question text', () => {
    const mockOptions = [
      { label: 'Option 1', onClick: vi.fn() },
      { label: 'Option 2', onClick: vi.fn() },
    ];

    render(<QuestionView question="What wine do you prefer?" options={mockOptions} />);

    expect(screen.getByText('What wine do you prefer?')).toBeInTheDocument();
  });

  it('should render all option buttons', () => {
    const mockOptions = [
      { label: 'Red Wine', onClick: vi.fn() },
      { label: 'White Wine', onClick: vi.fn() },
      { label: 'Sparkling', onClick: vi.fn() },
    ];

    render(<QuestionView question="Choose wine type" options={mockOptions} />);

    expect(screen.getByText('Red Wine')).toBeInTheDocument();
    expect(screen.getByText('White Wine')).toBeInTheDocument();
    expect(screen.getByText('Sparkling')).toBeInTheDocument();
  });

  it('should call onClick when option is clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();
    const mockOptions = [
      { label: 'Option 1', onClick: mockOnClick },
    ];

    render(<QuestionView question="Test question" options={mockOptions} />);

    await user.click(screen.getByText('Option 1'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should render back button when onBack is provided', () => {
    const mockOnBack = vi.fn();
    const mockOptions = [{ label: 'Option 1', onClick: vi.fn() }];

    render(<QuestionView question="Test" options={mockOptions} onBack={mockOnBack} />);

    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('should not render back button when onBack is not provided', () => {
    const mockOptions = [{ label: 'Option 1', onClick: vi.fn() }];

    render(<QuestionView question="Test" options={mockOptions} />);

    expect(screen.queryByText('Back')).not.toBeInTheDocument();
  });

  it('should call onBack when back button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnBack = vi.fn();
    const mockOptions = [{ label: 'Option 1', onClick: vi.fn() }];

    render(<QuestionView question="Test" options={mockOptions} onBack={mockOnBack} />);

    await user.click(screen.getByText('Back'));
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });
});
