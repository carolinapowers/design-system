import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Input } from './Input'
import styles from './Input.module.css'

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input placeholder="Enter text" />)
    
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('placeholder', 'Enter text')
  })

  it('renders with label', () => {
    render(<Input label="Username" placeholder="Enter username" />)
    
    const label = screen.getByText('Username')
    const input = screen.getByRole('textbox')
    
    expect(label).toBeInTheDocument()
    expect(input).toHaveAccessibleName('Username')
  })

  it('shows required indicator when required', () => {
    render(<Input label="Email" required />)
    
    const label = screen.getByText('Email')
    expect(label).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveAttribute('required')
  })

  it('applies size classes correctly', () => {
    const { rerender } = render(<Input size="sm" />)
    expect(screen.getByRole('textbox')).toHaveClass(styles.sm)
    
    rerender(<Input size="lg" />)
    expect(screen.getByRole('textbox')).toHaveClass(styles.lg)
  })

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Input variant="error" />)
    expect(screen.getByRole('textbox')).toHaveClass(styles.error)
    
    rerender(<Input variant="success" />)
    expect(screen.getByRole('textbox')).toHaveClass(styles.success)
  })

  it('displays helper text', () => {
    render(<Input helperText="This is helpful information" />)
    
    expect(screen.getByText('This is helpful information')).toBeInTheDocument()
  })

  it('displays error text and applies error variant', () => {
    render(<Input errorText="This field is required" />)
    
    const errorText = screen.getByText('This field is required')
    const input = screen.getByRole('textbox')
    
    expect(errorText).toBeInTheDocument()
    expect(errorText).toHaveAttribute('role', 'alert')
    expect(input).toHaveClass(styles.error)
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('displays success text and applies success variant', () => {
    render(<Input successText="Looks good!" />)
    
    const successText = screen.getByText('Looks good!')
    const input = screen.getByRole('textbox')
    
    expect(successText).toBeInTheDocument()
    expect(input).toHaveClass(styles.success)
  })

  it('prioritizes error text over other text', () => {
    render(
      <Input 
        helperText="Helper text" 
        successText="Success text"
        errorText="Error text" 
      />
    )
    
    expect(screen.getByText('Error text')).toBeInTheDocument()
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument()
    expect(screen.queryByText('Success text')).not.toBeInTheDocument()
  })

  it('renders with icons', () => {
    const LeftIcon = () => <span data-testid="left-icon">👤</span>
    const RightIcon = () => <span data-testid="right-icon">✓</span>
    
    render(<Input leftIcon={<LeftIcon />} rightIcon={<RightIcon />} />)
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
  })

  it('applies icon padding classes when icons are present', () => {
    const LeftIcon = () => <span>👤</span>
    const RightIcon = () => <span>✓</span>
    
    const { rerender } = render(<Input leftIcon={<LeftIcon />} />)
    expect(screen.getByRole('textbox')).toHaveClass(styles.withLeftIcon)
    
    rerender(<Input rightIcon={<RightIcon />} />)
    expect(screen.getByRole('textbox')).toHaveClass(styles.withRightIcon)
  })

  it('handles disabled state', () => {
    render(<Input disabled placeholder="Disabled input" />)
    
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })

  it('handles input changes', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    
    render(<Input onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    await user.type(input, 'test input')
    
    expect(handleChange).toHaveBeenCalled()
    expect(input).toHaveValue('test input')
  })

  it('forwards custom className', () => {
    render(<Input className="custom-class" />)
    
    expect(screen.getByRole('textbox')).toHaveClass('custom-class')
  })

  it('forwards aria-label', () => {
    render(<Input aria-label="custom-input" />)
    
    expect(screen.getByLabelText('custom-input')).toBeInTheDocument()
  })

  it('connects label to input with proper ID', () => {
    render(<Input label="Email Address" id="email-input" />)
    
    const input = screen.getByRole('textbox')
    const label = screen.getByText('Email Address')
    
    expect(input).toHaveAttribute('id', 'email-input')
    expect(label).toHaveAttribute('for', 'email-input')
  })

  it('generates unique ID when not provided', () => {
    render(<Input label="Test Input" />)
    
    const input = screen.getByRole('textbox')
    const id = input.getAttribute('id')
    
    expect(id).toBeTruthy()
    expect(id).toMatch(/^input-/)
  })

  it('connects helper text with aria-describedby', () => {
    render(<Input helperText="Helpful information" />)
    
    const input = screen.getByRole('textbox')
    const helperText = screen.getByText('Helpful information')
    const inputId = input.getAttribute('id')
    
    expect(input).toHaveAttribute('aria-describedby', `${inputId}-text`)
    expect(helperText).toHaveAttribute('id', `${inputId}-text`)
  })

  it('supports different input types', () => {
    const { rerender } = render(<Input type="email" label="Email" />)
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email')
    
    rerender(<Input type="password" label="Password" />)
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password')
  })
})