import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Modal } from './Modal'
import { Button } from '@/components/primitives/Button'

const meta: Meta<typeof Modal> = {
  title: 'Components/Composite/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A modal dialog component built on Radix UI Dialog primitive with customizable actions and sizes.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    primaryActionVariant: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Modal>

// Controlled Modal Template
const ControlledTemplate = (args: any) => {
  const [open, setOpen] = useState(false)
  
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        {...args}
        open={open}
        onOpenChange={setOpen}
        onSecondaryAction={() => setOpen(false)}
      />
    </div>
  )
}

export const Default: Story = {
  render: ControlledTemplate,
  args: {
    title: 'Modal Title',
    description: 'This is a description of what this modal is for.',
    primaryAction: 'Confirm',
    secondaryAction: 'Cancel',
    children: (
      <div>
        <p>This is the modal content. You can put any React elements here.</p>
        <p>The modal is fully accessible and supports keyboard navigation.</p>
      </div>
    ),
  },
}

export const Small: Story = {
  render: ControlledTemplate,
  args: {
    ...Default.args,
    size: 'sm',
    title: 'Small Modal',
  },
}

export const Large: Story = {
  render: ControlledTemplate,
  args: {
    ...Default.args,
    size: 'lg',
    title: 'Large Modal',
    children: (
      <div>
        <p>This is a larger modal with more content space.</p>
        <p>Perfect for forms or detailed information.</p>
        <p>The content area will scroll if needed.</p>
      </div>
    ),
  },
}

export const DestructiveAction: Story = {
  render: ControlledTemplate,
  args: {
    title: 'Delete Account',
    description: 'This action cannot be undone.',
    primaryAction: 'Delete Account',
    primaryActionVariant: 'destructive',
    secondaryAction: 'Cancel',
    children: (
      <div>
        <p>Are you sure you want to delete your account?</p>
        <p>All your data will be permanently removed from our servers.</p>
      </div>
    ),
  },
}

export const WithoutCloseButton: Story = {
  render: ControlledTemplate,
  args: {
    ...Default.args,
    showCloseButton: false,
    title: 'Modal without close button',
    description: 'You must use the action buttons to close this modal.',
  },
}

export const LoadingAction: Story = {
  render: (args: any) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const handlePrimaryAction = () => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        setOpen(false)
      }, 2000)
    }
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          {...args}
          open={open}
          onOpenChange={setOpen}
          primaryActionLoading={loading}
          onPrimaryAction={handlePrimaryAction}
          onSecondaryAction={() => setOpen(false)}
        />
      </div>
    )
  },
  args: {
    title: 'Processing...',
    description: 'This modal shows a loading state on the primary action.',
    primaryAction: 'Save Changes',
    secondaryAction: 'Cancel',
    children: (
      <div>
        <p>Click "Save Changes" to see the loading state.</p>
        <p>The action will complete after 2 seconds.</p>
      </div>
    ),
  },
}

export const ContentOnly: Story = {
  render: ControlledTemplate,
  args: {
    children: (
      <div style={{ padding: '20px' }}>
        <h2 style={{ margin: '0 0 16px 0' }}>Custom Content</h2>
        <p>This modal doesn't use the built-in title/description props.</p>
        <p>Instead, it uses custom content in the children.</p>
        <div style={{ marginTop: '20px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </div>
      </div>
    ),
  },
}

// Uncontrolled Modal with Trigger
export const WithTrigger: Story = {
  args: {
    title: 'Uncontrolled Modal',
    description: 'This modal is triggered by a button element.',
    primaryAction: 'Save',
    secondaryAction: 'Cancel',
    trigger: <Button>Open Modal</Button>,
    children: (
      <div>
        <p>This modal uses the trigger prop for uncontrolled usage.</p>
        <p>Perfect for simple use cases where you don't need to manage state.</p>
      </div>
    ),
  },
}

export const FullScreen: Story = {
  render: ControlledTemplate,
  args: {
    size: 'full',
    title: 'Full Screen Modal',
    description: 'This modal takes up most of the screen space.',
    primaryAction: 'Save',
    secondaryAction: 'Cancel',
    children: (
      <div>
        <p>This is a full-screen modal perfect for complex forms or detailed views.</p>
        <div style={{ height: '400px', backgroundColor: '#f5f5f5', borderRadius: '4px', padding: '20px', margin: '20px 0' }}>
          <p>This content area is scrollable when needed.</p>
          <p>Perfect for long forms or detailed information.</p>
        </div>
      </div>
    ),
  },
}