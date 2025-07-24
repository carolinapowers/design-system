import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('renders with default props', () => {
    render(<Checkbox />)
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
  })

  it('renders with label', () => {
    render(<Checkbox label="Accept terms" />)
    
    const checkbox = screen.getByRole('checkbox')
    const label = screen.getByText('Accept terms')
    
    expect(checkbox).toBeInTheDocument()
    expect(label).toBeInTheDocument()
  })

  it('shows required indicator when required', () => {
    render(<Checkbox label="Terms" required />)
    
    expect(screen.getByText('Terms')).toBeInTheDocument()
    expect(screen.getByText('*')).toBeInTheDocument()
    // Check aria-required instead of required attribute for Radix checkbox
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-required', 'true')
  })

  it('handles checked state', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    
    render(<Checkbox onCheckedChange={handleChange} />)
    
    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)
    
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('handles indeterminate state', () => {
    render(<Checkbox indeterminate />)
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('data-state', 'indeterminate')
  })

  it('displays description', () => {
    render(<Checkbox label="Newsletter" description="Get weekly updates" />)
    
    expect(screen.getByText('Get weekly updates')).toBeInTheDocument()
  })

  it('displays error text', () => {
    render(<Checkbox errorText="This field is required" />)
    
    const errorText = screen.getByText('This field is required')
    expect(errorText).toBeInTheDocument()
    expect(errorText).toHaveAttribute('role', 'alert')
  })

  it('handles disabled state', () => {
    render(<Checkbox disabled />)
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeDisabled()
  })

  it('forwards custom className', () => {
    render(<Checkbox className="custom-class" label="Test checkbox" />)
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.closest('div')).toHaveClass('custom-class')
  })

  it('works with controlled checked state', () => {
    const { rerender } = render(<Checkbox checked={false} />)
    expect(screen.getByRole('checkbox')).not.toBeChecked()
    
    rerender(<Checkbox checked={true} />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })
})