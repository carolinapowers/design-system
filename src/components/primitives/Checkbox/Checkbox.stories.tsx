import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Checkbox } from './Checkbox'

const meta = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A checkbox component built on Radix UI primitives with support for indeterminate state and custom styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the checkbox',
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is checked',
    },
    indeterminate: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is indeterminate',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is disabled',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is required',
    },
    error: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox has an error state',
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithLabel: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
}

export const WithDescription: Story = {
  args: {
    label: 'Marketing emails',
    description: 'Receive occasional emails about new features and updates',
  },
}

export const Required: Story = {
  args: {
    label: 'I agree to the terms',
    required: true,
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox size="sm" label="Small checkbox" />
      <Checkbox size="md" label="Medium checkbox" />
      <Checkbox size="lg" label="Large checkbox" />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  ),
}

export const ErrorState: Story = {
  args: {
    label: 'Accept terms',
    error: true,
    errorText: 'You must accept the terms to continue',
  },
}

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false)
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Checkbox
          label="Controlled checkbox"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <p style={{ fontSize: '0.875rem', color: '#666' }}>
          Checked: {checked ? 'Yes' : 'No'}
        </p>
      </div>
    )
  },
}

export const Complex: Story = {
  args: {
    label: 'Subscribe to newsletter',
    description: 'Get weekly updates about new features, tips, and exclusive content delivered to your inbox.',
    required: true,
  },
}