# Design System Inspired by Buffer

A modern, accessible design system built with Radix UI primitives, CSS Modules, and design tokens. This system provides a comprehensive set of reusable components and design tokens to ensure consistency across Buffer's products.

👉 [Storybook Documentation](design-system-iota-five.vercel.app)

<img width="1701" height="887" alt="Buffer Design System Preview" src="https://github.com/user-attachments/assets/6ab101de-250d-4e6b-92a1-96cd59098cd6" />

## Features

- 🎨 **Design Tokens**: JSON-based token system for consistent design values
- ♿ **Accessibility First**: Built on Radix UI primitives with WCAG 2.1 AA compliance
- 🎯 **CSS Modules**: Scoped styling with better performance
- 📚 **Storybook Integration**: Interactive documentation and component playground
- 🔧 **TypeScript**: Full type safety and IntelliSense support
- 🧪 **Comprehensive Testing**: Unit tests, accessibility tests, and visual regression testing
- 📱 **Responsive Design**: Mobile-first approach with flexible layouts

## Installation

```bash
npm install @buffer/design-system
```

## Usage

### Basic Component Usage

```tsx
import { Button, Input, Select } from '@buffer/design-system'
import '@buffer/design-system/styles'

function App() {
  return (
    <div>
      <Button variant="primary" size="medium">
        Click me
      </Button>
      <Input placeholder="Enter your name" />
      <Select>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </Select>
    </div>
  )
}
```

### Design Tokens

Access design tokens directly in your applications:

```tsx
import { tokens } from '@buffer/design-system'

const customStyles = {
  color: tokens.color.brand.primary,
  spacing: tokens.spacing.medium,
  fontSize: tokens.typography.size.body
}
```

## Available Components

### Primitives
- **Button** - Primary, secondary, and ghost variants with multiple sizes
- **Input** - Text input with validation states and icons
- **Select** - Dropdown select with search and multi-select support
- **Checkbox** - Accessible checkbox with indeterminate state
- **Badge** - Status indicators and labels

### Composite Components
- **Modal/Dialog** - Accessible modal dialogs with overlay management

### Layout Components
- **Card** - Content containers with consistent spacing and elevation

## Development

### Prerequisites

- Node.js 20.0.0 or higher
- npm 8.0.0 or higher

### Getting Started

1. Clone the repository:
```bash
git clone https://github.com/carolinapowers/design-system.git
cd design-system
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Launch Storybook for component development:
```bash
npm run storybook
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build the component library |
| `npm run build-tokens` | Generate design tokens from JSON |
| `npm run test` | Run unit tests |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:watch` | Run tests in watch mode |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors automatically |
| `npm run storybook` | Launch Storybook development server |
| `npm run build-storybook` | Build Storybook for production |
| `npm run chromatic` | Run visual regression tests |

## Architecture

### Project Structure

```
src/
├── tokens/              # Design tokens (JSON-based)
│   ├── colors.json
│   ├── typography.json
│   ├── spacing.json
│   └── build.ts
├── components/          # Component library
│   ├── primitives/      # Basic UI components
│   ├── composite/       # Complex components
│   └── layout/          # Layout components
├── styles/              # Global styles and utilities
│   ├── globals.css
│   ├── tokens.css
│   └── utilities.module.css
└── utils/               # Utility functions
    └── cn.ts           # Class name utility
```

### Technology Stack

- **React** - Component framework
- **TypeScript** - Type safety and developer experience
- **Radix UI** - Accessible primitive components
- **CSS Modules** - Scoped styling
- **Vite** - Build tool and development server
- **Vitest** - Unit testing framework
- **Storybook** - Component documentation and development
- **ESLint** - Code linting and formatting

## Design Tokens

The design system uses a token-based approach for maintaining design consistency:

```json
{
  "color": {
    "brand": {
      "primary": "#168bf8",
      "secondary": "#f3f4f6"
    },
    "semantic": {
      "success": "#10b981",
      "warning": "#f59e0b",
      "error": "#ef4444"
    }
  },
  "spacing": {
    "xs": "0.25rem",
    "sm": "0.5rem",
    "md": "1rem",
    "lg": "1.5rem",
    "xl": "2rem"
  }
}
```

Tokens are automatically converted to CSS custom properties and TypeScript constants.

## Testing

The design system includes comprehensive testing strategies:

- **Unit Tests**: Component behavior and logic testing with Vitest
- **Accessibility Tests**: Automated a11y testing with axe-core
- **Visual Regression**: Chromatic integration for visual testing
- **Type Checking**: TypeScript compilation verification

Run all tests:
```bash
npm run test
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following the established patterns
4. Add tests for new functionality
5. Run the test suite: `npm run test`
6. Run type checking: `npm run typecheck`
7. Run linting: `npm run lint:fix`
8. Commit your changes: `git commit -m 'Add amazing feature'`
9. Push to the branch: `git push origin feature/amazing-feature`
10. Open a Pull Request

### Component Development Guidelines

1. **Follow existing patterns**: Use established component structure and naming conventions
2. **Include comprehensive tests**: Add unit tests and stories for all components
3. **Ensure accessibility**: Verify WCAG 2.1 AA compliance
4. **Use design tokens**: Leverage the token system for consistent styling
5. **Document thoroughly**: Include JSDoc comments and Storybook stories

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT © Buffer

## Links

- [Storybook Documentation](https://your-storybook-url.com)
- [Design Guidelines](./CLAUDE.md)
- [Contributing Guidelines](#contributing)