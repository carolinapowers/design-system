import type { Preview } from '@storybook/react'
import '../src/styles/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'focus-trap',
            enabled: true,
          },
        ],
      },
    },
  },
  argTypes: {
    // Global arg types for design tokens
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'destructive'],
    },
  },
  tags: ['autodocs'],
}

export default preview