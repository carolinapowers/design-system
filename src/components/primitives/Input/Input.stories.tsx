import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta = {
  title: 'Primitives/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component with multiple variants, sizes, and states for form data entry.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'error', 'success'],
      description: 'Visual variant of the input',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text for the input',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the field is required',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled',
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text to display below input',
    },
    errorText: {
      control: { type: 'text' },
      description: 'Error message to display',
    },
    successText: {
      control: { type: 'text' },
      description: 'Success message to display',
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
  },
}

export const Required: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Choose a username',
    helperText: 'Must be at least 3 characters long',
  },
}

export const ErrorState: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    errorText: 'Please enter a valid email address',
    defaultValue: 'invalid-email',
  },
}

export const SuccessState: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    successText: 'Strong password!',
    defaultValue: 'SecurePassword123!',
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Input size="sm" placeholder="Small input" label="Small" />
      <Input size="md" placeholder="Medium input" label="Medium" />
      <Input size="lg" placeholder="Large input" label="Large" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Inputs come in three sizes: sm, md, and lg.',
      },
    },
  },
}

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Input
        label="Search"
        placeholder="Search..."
        leftIcon={<span>🔍</span>}
      />
      <Input
        label="Email"
        type="email"
        placeholder="Enter email"
        leftIcon={<span>📧</span>}
        rightIcon={<span>✓</span>}
        successText="Valid email format"
        defaultValue="user@example.com"
      />
      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        leftIcon={<span>🔒</span>}
        rightIcon={<span>👁️</span>}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Inputs can include icons on the left or right side for visual enhancement.',
      },
    },
  },
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Input label="Default" placeholder="Default state" />
      <Input label="Disabled" placeholder="Disabled state" disabled />
      <Input 
        label="Error" 
        placeholder="Error state" 
        errorText="This field is required"
        defaultValue=""
      />
      <Input 
        label="Success" 
        placeholder="Success state" 
        successText="Looks good!"
        defaultValue="Valid input"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different input states including default, disabled, error, and success.',
      },
    },
  },
}

export const InputTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Input label="Text" type="text" placeholder="Text input" />
      <Input label="Email" type="email" placeholder="Email input" />
      <Input label="Password" type="password" placeholder="Password input" />
      <Input label="Number" type="number" placeholder="Number input" />
      <Input label="Tel" type="tel" placeholder="Phone number" />
      <Input label="URL" type="url" placeholder="Website URL" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input component supports all standard HTML input types.',
      },
    },
  },
}

export const Complex: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your work email',
    required: true,
    leftIcon: <span>📧</span>,
    helperText: 'We\'ll never share your email with anyone else',
  },
}