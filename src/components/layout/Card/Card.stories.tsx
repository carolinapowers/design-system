import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'
import { Button } from '../../primitives/Button'
import { Input } from '../../primitives/Input'

const meta: Meta<typeof Card> = {
  title: 'Layout/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Card is a flexible layout component for containing and organizing content. It supports header, content, and footer sections with consistent spacing and visual hierarchy.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Controls the padding size of card sections',
    },
    interactive: {
      control: 'boolean',
      description: 'Makes the card interactive with hover effects',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    size: 'md',
    interactive: false,
  },
  render: (args) => (
    <Card {...args}>
      <Card.Header title="Card Title" subtitle="This is a subtitle" />
      <Card.Content>
        <p>
          This is the main content area of the card. You can put any content
          here including text, forms, images, or other components.
        </p>
      </Card.Content>
      <Card.Footer>
        <Button variant="primary">Action</Button>
      </Card.Footer>
    </Card>
  ),
}

export const Simple: Story = {
  render: () => (
    <Card>
      <Card.Content>
        <p>A simple card with just content and no header or footer.</p>
      </Card.Content>
    </Card>
  ),
}

export const HeaderOnly: Story = {
  render: () => (
    <Card>
      <Card.Header title="Settings" subtitle="Manage your preferences" />
      <Card.Content>
        <p>Card content goes here.</p>
      </Card.Content>
    </Card>
  ),
}

export const Interactive: Story = {
  args: {
    interactive: true,
  },
  render: (args) => (
    <Card {...args}>
      <Card.Header title="Interactive Card" subtitle="Click me!" />
      <Card.Content>
        <p>This card responds to hover and click interactions.</p>
      </Card.Content>
    </Card>
  ),
}

export const WithForm: Story = {
  render: () => (
    <Card>
      <Card.Header title="Login" subtitle="Enter your credentials" />
      <Card.Content>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Input placeholder="Email address" />
          <Input type="password" placeholder="Password" />
        </div>
      </Card.Content>
      <Card.Footer>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button variant="primary">Sign In</Button>
          <Button variant="secondary">Cancel</Button>
        </div>
      </Card.Footer>
    </Card>
  ),
}

export const CustomHeader: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>
              Custom Header
            </h3>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
              With custom layout
            </p>
          </div>
          <Button variant="ghost" size="sm">
            ⋯
          </Button>
        </div>
      </Card.Header>
      <Card.Content>
        <p>You can customize the header with any content you need.</p>
      </Card.Content>
    </Card>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', width: '100%' }}>
      <Card size="sm">
        <Card.Header title="Small Card" subtitle="Compact spacing" />
        <Card.Content>
          <p>This card uses small padding for a more compact layout.</p>
        </Card.Content>
        <Card.Footer>
          <Button size="sm" variant="primary">Small Action</Button>
        </Card.Footer>
      </Card>
      
      <Card size="md">
        <Card.Header title="Medium Card" subtitle="Default spacing" />
        <Card.Content>
          <p>This card uses medium padding, which is the default.</p>
        </Card.Content>
        <Card.Footer>
          <Button variant="primary">Medium Action</Button>
        </Card.Footer>
      </Card>
      
      <Card size="lg">
        <Card.Header title="Large Card" subtitle="Generous spacing" />
        <Card.Content>
          <p>This card uses large padding for a more spacious layout.</p>
        </Card.Content>
        <Card.Footer>
          <Button size="lg" variant="primary">Large Action</Button>
        </Card.Footer>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const MultipleCards: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
      <Card interactive>
        <Card.Header title="Feature 1" subtitle="Description of feature" />
        <Card.Content>
          <p>Details about this feature and what it can do for users.</p>
        </Card.Content>
        <Card.Footer>
          <Button variant="primary" size="sm">Learn More</Button>
        </Card.Footer>
      </Card>
      
      <Card interactive>
        <Card.Header title="Feature 2" subtitle="Another great feature" />
        <Card.Content>
          <p>More information about this second feature and its benefits.</p>
        </Card.Content>
        <Card.Footer>
          <Button variant="primary" size="sm">Get Started</Button>
        </Card.Footer>
      </Card>
      
      <Card interactive>
        <Card.Header title="Feature 3" subtitle="Final feature showcase" />
        <Card.Content>
          <p>The last feature in our showcase with its own unique value.</p>
        </Card.Content>
        <Card.Footer>
          <Button variant="primary" size="sm">Try Now</Button>
        </Card.Footer>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const ContentOnly: Story = {
  render: () => (
    <Card>
      <Card.Content>
        <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Content Only Card</h3>
        <p>
          Sometimes you just need a simple container without the complexity of 
          headers and footers. This card demonstrates that use case.
        </p>
        <div style={{ marginTop: '1rem' }}>
          <Button variant="primary">Primary Action</Button>
        </div>
      </Card.Content>
    </Card>
  ),
}