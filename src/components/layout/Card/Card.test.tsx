import { render, screen, within } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Card } from './Card'

describe('Card', () => {
  it('renders card with default props', () => {
    render(
      <Card>
        <Card.Content>Test content</Card.Content>
      </Card>
    )
    
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('renders card with header, content, and footer', () => {
    render(
      <Card>
        <Card.Header title="Test Title" subtitle="Test Subtitle" />
        <Card.Content>Test content</Card.Content>
        <Card.Footer>Test footer</Card.Footer>
      </Card>
    )
    
    expect(screen.getByRole('heading', { name: 'Test Title' })).toBeInTheDocument()
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
    expect(screen.getByText('Test footer')).toBeInTheDocument()
  })

  it('renders custom header content', () => {
    render(
      <Card>
        <Card.Header>
          <div>Custom header content</div>
        </Card.Header>
        <Card.Content>Test content</Card.Content>
      </Card>
    )
    
    expect(screen.getByText('Custom header content')).toBeInTheDocument()
  })

  it('applies size classes correctly', () => {
    render(
      <Card size="lg" data-testid="card">
        <Card.Content>Test content</Card.Content>
      </Card>
    )
    
    const card = screen.getByTestId('card')
    expect(card.className).toMatch(/lg/)
  })

  it('applies interactive class when interactive prop is true', () => {
    render(
      <Card interactive data-testid="card">
        <Card.Content>Test content</Card.Content>
      </Card>
    )
    
    const card = screen.getByTestId('card')
    expect(card.className).toMatch(/interactive/)
  })

  it('applies custom className', () => {
    render(
      <Card className="custom-card" data-testid="card">
        <Card.Content>Test content</Card.Content>
      </Card>
    )
    
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('custom-card')
  })

  it('forwards ref to card element', () => {
    const ref = { current: null }
    
    render(
      <Card ref={ref}>
        <Card.Content>Test content</Card.Content>
      </Card>
    )
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('renders header without title and subtitle when custom children provided', () => {
    render(
      <Card>
        <Card.Header title="Should not render" subtitle="Should not render">
          <div>Custom content</div>
        </Card.Header>
        <Card.Content>Test content</Card.Content>
      </Card>
    )
    
    expect(screen.getByText('Custom content')).toBeInTheDocument()
    expect(screen.queryByText('Should not render')).not.toBeInTheDocument()
  })

  it('renders only title when subtitle is not provided', () => {
    render(
      <Card>
        <Card.Header title="Only Title" />
        <Card.Content>Test content</Card.Content>
      </Card>
    )
    
    expect(screen.getByRole('heading', { name: 'Only Title' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
  })

  it('passes through HTML attributes to card components', () => {
    render(
      <Card data-testid="card-test">
        <Card.Header data-testid="header-test" title="Header" />
        <Card.Content data-testid="content-test">Test content</Card.Content>
        <Card.Footer data-testid="footer-test">Footer content</Card.Footer>
      </Card>
    )
    
    expect(screen.getByTestId('card-test')).toBeInTheDocument()
    expect(screen.getByTestId('header-test')).toBeInTheDocument()
    expect(screen.getByTestId('content-test')).toBeInTheDocument()
    expect(screen.getByTestId('footer-test')).toBeInTheDocument()
  })

  it('structures card sections properly', () => {
    render(
      <Card data-testid="card">
        <Card.Header title="Card Header" />
        <Card.Content>Card content here</Card.Content>
        <Card.Footer>Card footer here</Card.Footer>
      </Card>
    )
    
    const card = screen.getByTestId('card')
    const headerSection = within(card).getByRole('heading', { name: 'Card Header' })
    const contentSection = within(card).getByText('Card content here')
    const footerSection = within(card).getByText('Card footer here')
    
    expect(headerSection).toBeInTheDocument()
    expect(contentSection).toBeInTheDocument()
    expect(footerSection).toBeInTheDocument()
  })
})