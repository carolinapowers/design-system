import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Modal } from './Modal'
import { Button } from '@/components/primitives/Button'

describe('Modal', () => {
  it('renders modal when open', () => {
    render(
      <Modal open={true} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    )
    
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Test Modal')).toBeInTheDocument()
    expect(screen.getByText('Modal content')).toBeInTheDocument()
  })

  it('does not render modal when closed', () => {
    render(
      <Modal open={false} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    )
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders title and description', () => {
    render(
      <Modal 
        open={true} 
        title="Modal Title" 
        description="Modal description"
      />
    )
    
    expect(screen.getByText('Modal Title')).toBeInTheDocument()
    expect(screen.getByText('Modal description')).toBeInTheDocument()
  })

  it('renders close button by default', () => {
    render(<Modal open={true} title="Test Modal" />)
    
    const closeButton = screen.getByRole('button', { name: 'Close' })
    expect(closeButton).toBeInTheDocument()
  })

  it('hides close button when showCloseButton is false', () => {
    render(<Modal open={true} title="Test Modal" showCloseButton={false} />)
    
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument()
  })

  it('renders custom close button label', () => {
    render(
      <Modal 
        open={true} 
        title="Test Modal" 
        closeButtonLabel="Dismiss"
      />
    )
    
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument()
  })

  it('renders primary and secondary action buttons', () => {
    render(
      <Modal
        open={true}
        title="Test Modal"
        primaryAction="Save"
        secondaryAction="Cancel"
      />
    )
    
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })

  it('calls onPrimaryAction when primary button clicked', async () => {
    const user = userEvent.setup()
    const handlePrimaryAction = vi.fn()
    
    render(
      <Modal
        open={true}
        title="Test Modal"
        primaryAction="Save"
        onPrimaryAction={handlePrimaryAction}
      />
    )
    
    await user.click(screen.getByRole('button', { name: 'Save' }))
    expect(handlePrimaryAction).toHaveBeenCalledTimes(1)
  })

  it('calls onSecondaryAction when secondary button clicked', async () => {
    const user = userEvent.setup()
    const handleSecondaryAction = vi.fn()
    
    render(
      <Modal
        open={true}
        title="Test Modal"
        secondaryAction="Cancel"
        onSecondaryAction={handleSecondaryAction}
      />
    )
    
    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(handleSecondaryAction).toHaveBeenCalledTimes(1)
  })

  it('shows loading state on primary button', () => {
    render(
      <Modal
        open={true}
        title="Test Modal"
        primaryAction="Save"
        primaryActionLoading={true}
      />
    )
    
    const saveButton = screen.getByRole('button', { name: 'Save' })
    expect(saveButton).toBeDisabled()
  })

  it('applies size classes correctly', () => {
    const { rerender } = render(
      <Modal open={true} title="Test Modal" size="sm" />
    )
    
    expect(screen.getByRole('dialog').className).toMatch(/_sm_/)
    
    rerender(<Modal open={true} title="Test Modal" size="lg" />)
    expect(screen.getByRole('dialog').className).toMatch(/_lg_/)
  })

  it('applies custom className', () => {
    render(
      <Modal 
        open={true} 
        title="Test Modal" 
        className="custom-modal"
      />
    )
    
    expect(screen.getByRole('dialog')).toHaveClass('custom-modal')
  })

  it('calls onOpenChange when close button clicked', async () => {
    const user = userEvent.setup()
    const handleOpenChange = vi.fn()
    
    render(
      <Modal
        open={true}
        title="Test Modal"
        onOpenChange={handleOpenChange}
      />
    )
    
    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(handleOpenChange).toHaveBeenCalledWith(false)
  })

  it('renders with trigger for uncontrolled usage', () => {
    render(
      <Modal
        title="Test Modal"
        trigger={<Button>Open Modal</Button>}
      >
        <p>Modal content</p>
      </Modal>
    )
    
    expect(screen.getByRole('button', { name: 'Open Modal' })).toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('opens modal when trigger clicked', async () => {
    const user = userEvent.setup()
    
    render(
      <Modal
        title="Test Modal"
        trigger={<Button>Open Modal</Button>}
      >
        <p>Modal content</p>
      </Modal>
    )
    
    await user.click(screen.getByRole('button', { name: 'Open Modal' }))
    
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Test Modal')).toBeInTheDocument()
    expect(screen.getByText('Modal content')).toBeInTheDocument()
  })

  it('supports different primary action variants', () => {
    const { rerender } = render(
      <Modal
        open={true}
        title="Test Modal"
        primaryAction="Delete"
        primaryActionVariant="destructive"
      />
    )
    
    expect(screen.getByRole('button', { name: 'Delete' }).className).toMatch(/_destructive_/)
    
    rerender(
      <Modal
        open={true}
        title="Test Modal"
        primaryAction="Save"
        primaryActionVariant="secondary"
      />
    )
    
    expect(screen.getByRole('button', { name: 'Save' }).className).toMatch(/_secondary_/)
  })

  it('has proper accessibility attributes', () => {
    render(
      <Modal
        open={true}
        title="Modal Title"
        description="Modal description"
      />
    )
    
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAccessibleName('Modal Title')
    expect(dialog).toHaveAccessibleDescription('Modal description')
  })

  it('renders without footer when no actions provided', () => {
    render(
      <Modal open={true} title="Test Modal">
        <p>Content only</p>
      </Modal>
    )
    
    // Footer should not exist when no actions
    expect(screen.queryByRole('button', { name: /save|cancel|confirm/i })).not.toBeInTheDocument()
  })

  it('handles modal without title', () => {
    render(
      <Modal open={true}>
        <h2>Custom title in content</h2>
        <p>Modal content</p>
      </Modal>
    )
    
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Custom title in content')).toBeInTheDocument()
  })
})