import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'
import styles from './Button.module.css'

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Click me')
    expect(button).toHaveClass(styles.button, styles.primary, styles.md)
  })

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Button variant="secondary">Test</Button>)
    expect(screen.getByRole('button')).toHaveClass(styles.secondary)
    
    rerender(<Button variant="ghost">Test</Button>)
    expect(screen.getByRole('button')).toHaveClass(styles.ghost)
    
    rerender(<Button variant="destructive">Test</Button>)
    expect(screen.getByRole('button')).toHaveClass(styles.destructive)
  })

  it('applies size classes correctly', () => {
    const { rerender } = render(<Button size="sm">Test</Button>)
    expect(screen.getByRole('button')).toHaveClass(styles.sm)
    
    rerender(<Button size="lg">Test</Button>)
    expect(screen.getByRole('button')).toHaveClass(styles.lg)
    
    rerender(<Button size="xl">Test</Button>)
    expect(screen.getByRole('button')).toHaveClass(styles.xl)
  })

  it('handles loading state', () => {
    render(<Button loading>Loading</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass(styles.loading)
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button).toBeDisabled()
  })

  it('handles disabled state', () => {
    render(<Button disabled>Disabled</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-disabled', 'true')
  })

  it('renders with icons', () => {
    const LeftIcon = () => <span data-testid="left-icon">←</span>
    const RightIcon = () => <span data-testid="right-icon">→</span>
    
    render(
      <Button iconLeft={<LeftIcon />} iconRight={<RightIcon />}>
        With Icons
      </Button>
    )
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
    expect(screen.getByText('With Icons')).toBeInTheDocument()
  })

  it('renders as icon-only button', () => {
    const Icon = () => <span data-testid="icon">★</span>
    
    render(<Button iconOnly iconLeft={<Icon />} aria-label="Star" />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass(styles.iconOnly)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not trigger click when disabled', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    
    render(<Button onClick={handleClick} disabled>Disabled</Button>)
    
    await user.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('does not trigger click when loading', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    
    render(<Button onClick={handleClick} loading>Loading</Button>)
    
    await user.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('forwards custom className', () => {
    render(<Button className="custom-class">Test</Button>)
    
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('forwards aria-label', () => {
    render(<Button aria-label="custom-button">Test</Button>)
    
    expect(screen.getByLabelText('custom-button')).toBeInTheDocument()
  })

  it('renders as child component when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )
    
    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
    expect(link).toHaveTextContent('Link Button')
    // asChild renders the child element, so we just check it exists and has correct content
  })

  it('has proper accessibility attributes', () => {
    render(<Button>Accessible Button</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveAttribute('aria-disabled', 'false')
    expect(button).toHaveAttribute('aria-busy', 'false')
  })
})