import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Select } from './Select'

const sampleOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
]

const sampleGroups = [
  {
    label: 'Fruits',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
    ],
  },
  {
    label: 'Vegetables',
    options: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'broccoli', label: 'Broccoli' },
    ],
  },
]

describe('Select', () => {
  it('renders with default props', () => {
    render(<Select options={sampleOptions} />)
    
    const trigger = screen.getByRole('combobox')
    expect(trigger).toBeInTheDocument()
  })

  it('renders with label', () => {
    render(<Select label="Choose fruit" options={sampleOptions} />)
    
    const label = screen.getByText('Choose fruit')
    const trigger = screen.getByRole('combobox')
    
    expect(label).toBeInTheDocument()
    expect(trigger).toHaveAccessibleName('Choose fruit')
  })

  it('shows required indicator when required', () => {
    render(<Select label="Fruit" required options={sampleOptions} />)
    
    const label = screen.getByText('Fruit')
    expect(label).toBeInTheDocument()
    // Check for required attribute on combobox
    const trigger = screen.getByRole('combobox')
    expect(trigger).toHaveAttribute('aria-required', 'true')
  })

  it('displays placeholder text', () => {
    render(<Select placeholder="Select a fruit..." options={sampleOptions} />)
    
    expect(screen.getByText('Select a fruit...')).toBeInTheDocument()
  })

  it('opens dropdown when clicked', async () => {
    const user = userEvent.setup()
    render(<Select options={sampleOptions} />)
    
    const trigger = screen.getByRole('combobox')
    await user.click(trigger)
    
    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.getByText('Banana')).toBeInTheDocument()
    expect(screen.getByText('Orange')).toBeInTheDocument()
  })

  it('selects option when clicked', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    
    render(<Select options={sampleOptions} onValueChange={handleChange} />)
    
    const trigger = screen.getByRole('combobox')
    await user.click(trigger)
    
    const appleOption = screen.getByText('Apple')
    await user.click(appleOption)
    
    expect(handleChange).toHaveBeenCalledWith('apple')
  })

  it('applies size classes correctly', () => {
    const { rerender } = render(<Select size="sm" options={sampleOptions} />)
    expect(screen.getByRole('combobox')).toHaveClass('_sm_9d12ec')
    
    rerender(<Select size="lg" options={sampleOptions} />)
    expect(screen.getByRole('combobox')).toHaveClass('_lg_9d12ec')
  })

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Select variant="error" options={sampleOptions} />)
    expect(screen.getByRole('combobox')).toHaveClass('_error_9d12ec')
    
    rerender(<Select variant="success" options={sampleOptions} />)
    expect(screen.getByRole('combobox')).toHaveClass('_success_9d12ec')
  })

  it('displays helper text', () => {
    render(<Select helperText="Choose your favorite fruit" options={sampleOptions} />)
    
    expect(screen.getByText('Choose your favorite fruit')).toBeInTheDocument()
  })

  it('displays error text and applies error variant', () => {
    render(<Select errorText="Please select a fruit" options={sampleOptions} />)
    
    const errorText = screen.getByText('Please select a fruit')
    const trigger = screen.getByRole('combobox')
    
    expect(errorText).toBeInTheDocument()
    expect(errorText).toHaveAttribute('role', 'alert')
    expect(trigger).toHaveClass('_error_9d12ec')
    expect(trigger).toHaveAttribute('aria-invalid', 'true')
  })

  it('displays success text and applies success variant', () => {
    render(<Select successText="Good choice!" options={sampleOptions} />)
    
    const successText = screen.getByText('Good choice!')
    const trigger = screen.getByRole('combobox')
    
    expect(successText).toBeInTheDocument()
    expect(trigger).toHaveClass('_success_9d12ec')
  })

  it('prioritizes error text over other text', () => {
    render(
      <Select 
        helperText="Helper text" 
        successText="Success text"
        errorText="Error text" 
        options={sampleOptions}
      />
    )
    
    expect(screen.getByText('Error text')).toBeInTheDocument()
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument()
    expect(screen.queryByText('Success text')).not.toBeInTheDocument()
  })

  it('handles disabled state', () => {
    render(<Select disabled options={sampleOptions} />)
    
    const trigger = screen.getByRole('combobox')
    expect(trigger).toBeDisabled()
  })

  it('handles disabled options', async () => {
    const user = userEvent.setup()
    const optionsWithDisabled = [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana', disabled: true },
      { value: 'orange', label: 'Orange' },
    ]
    
    render(<Select options={optionsWithDisabled} />)
    
    const trigger = screen.getByRole('combobox')
    await user.click(trigger)
    
    const bananaOption = screen.getByText('Banana')
    // Radix UI uses data-disabled attribute on disabled items
    expect(bananaOption.closest('[data-disabled]')).toBeInTheDocument()
  })

  it('renders grouped options', async () => {
    const user = userEvent.setup()
    render(<Select groups={sampleGroups} />)
    
    const trigger = screen.getByRole('combobox')
    await user.click(trigger)
    
    expect(screen.getByText('Fruits')).toBeInTheDocument()
    expect(screen.getByText('Vegetables')).toBeInTheDocument()
    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.getByText('Carrot')).toBeInTheDocument()
  })

  it('works with controlled value', () => {
    const { rerender } = render(
      <Select value="apple" options={sampleOptions} />
    )
    
    expect(screen.getByText('Apple')).toBeInTheDocument()
    
    rerender(<Select value="banana" options={sampleOptions} />)
    expect(screen.getByText('Banana')).toBeInTheDocument()
  })

  it('works with default value', () => {
    render(<Select defaultValue="orange" options={sampleOptions} />)
    
    expect(screen.getByText('Orange')).toBeInTheDocument()
  })

  it('forwards custom className', () => {
    render(<Select className="custom-class" options={sampleOptions} />)
    
    expect(screen.getByRole('combobox')).toHaveClass('custom-class')
  })

  it('forwards aria-label', () => {
    render(<Select aria-label="custom-select" options={sampleOptions} />)
    
    const trigger = screen.getByRole('combobox')
    expect(trigger).toHaveAccessibleName('custom-select')
  })

  it('connects helper text with aria-describedby', () => {
    render(<Select helperText="Helpful information" options={sampleOptions} />)
    
    const trigger = screen.getByRole('combobox')
    const helperText = screen.getByText('Helpful information')
    const triggerId = trigger.getAttribute('id')
    
    expect(trigger).toHaveAttribute('aria-describedby', `${triggerId}-text`)
    expect(helperText).toHaveAttribute('id', `${triggerId}-text`)
  })

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<Select options={sampleOptions} />)
    
    const trigger = screen.getByRole('combobox')
    
    // Focus the trigger
    trigger.focus()
    
    // Open with Space key
    await user.keyboard(' ')
    
    // Verify dropdown opened by checking for options
    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.getByText('Banana')).toBeInTheDocument()
  })
})