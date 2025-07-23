import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  title: 'Primitives/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible button component built with design system tokens and accessibility in mind.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'destructive'],
      description: 'Visual style variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the button',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the button is in a loading state',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled',
    },
    iconOnly: {
      control: { type: 'boolean' },
      description: 'Whether to render as an icon-only button',
    },
    asChild: {
      control: { type: 'boolean' },
      description: 'Render as a Slot component for composition',
    },
    children: {
      control: { type: 'text' },
      description: 'Button content',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive Button',
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons come in four different sizes: sm, md, lg, and xl.',
      },
    },
  },
}

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button iconLeft={<span>←</span>}>With Left Icon</Button>
        <Button iconRight={<span>→</span>}>With Right Icon</Button>
        <Button iconLeft={<span>★</span>} iconRight={<span>★</span>}>
          Both Icons
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button iconOnly iconLeft={<span>★</span>} aria-label="Star" />
        <Button iconOnly iconLeft={<span>❤️</span>} aria-label="Heart" />
        <Button iconOnly iconLeft={<span>🔥</span>} aria-label="Fire" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons can include icons on the left, right, or be icon-only. Always provide aria-label for icon-only buttons.',
      },
    },
  },
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button>Default</Button>
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button variant="secondary">Default</Button>
        <Button variant="secondary" loading>Loading</Button>
        <Button variant="secondary" disabled>Disabled</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button states include default, loading, and disabled states across all variants.',
      },
    },
  },
}

export const AsChild: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button asChild>
        <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          Link Button
        </a>
      </Button>
      <Button asChild variant="secondary">
        <a href="#section">Anchor Link</a>
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use asChild to render the button as a different element while maintaining button styling.',
      },
    },
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button variants displayed together.',
      },
    },
  },
}