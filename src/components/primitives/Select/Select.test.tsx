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
    
    const label = screen.getByText(/Fruit/)
    expect(label).toHaveTextContent('Fruit *')
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
    expect(screen.getByRole('combobox')).toHaveClass('sm')
    
    rerender(<Select size="lg" options={sampleOptions} />)
    expect(screen.getByRole('combobox')).toHaveClass('lg')
  })

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Select variant="error" options={sampleOptions} />)
    expect(screen.getByRole('combobox')).toHaveClass('error')
    
    rerender(<Select variant="success" options={sampleOptions} />)
    expect(screen.getByRole('combobox')).toHaveClass('success')
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
    expect(trigger).toHaveClass('error')
    expect(trigger).toHaveAttribute('aria-invalid', 'true')
  })

  it('displays success text and applies success variant', () => {
    render(<Select successText="Good choice!" options={sampleOptions} />)
    
    const successText = screen.getByText('Good choice!')
    const trigger = screen.getByRole('combobox')
    
    expect(successText).toBeInTheDocument()
    expect(trigger).toHaveClass('success')
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
    expect(bananaOption).toHaveAttribute('data-disabled')
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
    
    expect(screen.getByDisplayValue('Apple')).toBeInTheDocument()
    
    rerender(<Select value="banana" options={sampleOptions} />)
    expect(screen.getByDisplayValue('Banana')).toBeInTheDocument()
  })

  it('works with default value', () => {
    render(<Select defaultValue="orange" options={sampleOptions} />)
    
    expect(screen.getByDisplayValue('Orange')).toBeInTheDocument()
  })

  it('forwards custom className', () => {
    render(<Select className="custom-class" options={sampleOptions} />)
    
    expect(screen.getByRole('combobox')).toHaveClass('custom-class')
  })

  it('forwards data-testid to wrapper', () => {
    render(<Select data-testid="custom-select" options={sampleOptions} />)
    
    expect(screen.getByTestId('custom-select')).toBeInTheDocument()
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
    
    // Open with Enter
    await user.click(trigger)
    await user.keyboard('{Enter}')
    
    // Navigate with arrows
    await user.keyboard('{ArrowDown}')
    await user.keyboard('{ArrowDown}')
    
    // Select with Enter
    await user.keyboard('{Enter}')
    
    expect(screen.getByDisplayValue('Banana')).toBeInTheDocument()
  })
})