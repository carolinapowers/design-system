# Buffer Design System Implementation Guide

This document outlines the implementation approach for Buffer's modern design system using Radix primitives, CSS modules, Storybook, and design tokens.

## Architecture Overview

### Technology Stack
- **Component Foundation**: Radix UI primitives for accessibility-first components
- **Styling**: CSS Modules for scoped styling and better performance
- **Documentation**: Storybook for component documentation and interactive testing
- **Design Tokens**: JSON-based token system for consistent design values
- **Build System**: TypeScript + Vite for modern bundling and development

## Project Structure

```
src/
├── tokens/              # Design tokens
│   ├── colors.json
│   ├── typography.json
│   ├── spacing.json
│   └── index.ts
├── styles/              # Global styles and utilities
│   ├── globals.css
│   ├── tokens.css       # CSS custom properties from tokens
│   └── utilities.module.css
├── components/          # Component library
│   ├── primitives/      # Radix-based primitive components
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Select/
│   ├── composite/       # Higher-level components
│   │   ├── SearchInput/
│   │   └── DataTable/
│   └── layout/          # Layout components
│       ├── Stack/
│       ├── Grid/
│       └── Container/
└── stories/             # Storybook stories
    ├── primitives/
    ├── composite/
    └── tokens/
```

## Implementation Guidelines

### 1. Design Tokens

Create a centralized token system in JSON format:

```json
// tokens/colors.json
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
  }
}
```

Convert tokens to CSS custom properties and TypeScript constants for consumption.

### 2. Component Development

#### Primitive Components
- Build on Radix UI primitives for accessibility
- Use CSS Modules for component-scoped styling
- Accept design token-based props (size, variant, etc.)
- Include comprehensive TypeScript types

#### Example Button Component Structure:
```
Button/
├── Button.tsx           # Main component
├── Button.module.css    # Component styles
├── Button.stories.tsx   # Storybook stories
├── Button.test.tsx      # Unit tests
└── index.ts            # Exports
```

### 3. CSS Modules Approach

- Use semantic class names: `.primary`, `.secondary`, `.large`, `.small`
- Leverage CSS custom properties for theming
- Create utility classes for common patterns
- Ensure responsive design with mobile-first approach

### 4. Storybook Configuration

Set up comprehensive documentation:
- Component API documentation
- Interactive controls for all props
- Design token showcase
- Accessibility testing integration
- Visual regression testing

### 5. Development Workflow

#### Component Creation Process:
1. Define component API and TypeScript interface
2. Create base component using Radix primitive
3. Implement CSS Module styles with design tokens
4. Write Storybook stories covering all variants
5. Add unit tests for functionality
6. Document accessibility features

#### Testing Strategy:
- Unit tests with Jest and React Testing Library
- Visual regression tests with Chromatic
- Accessibility tests with axe-core
- Cross-browser testing for critical components

### 6. Migration from Styled Components

#### Phase 1: Foundation
- Set up design token system
- Create CSS custom properties
- Establish Storybook environment

#### Phase 2: Core Components
- Migrate Button, Input, Select, Checkbox
- Focus on most-used components first
- Maintain backward compatibility during transition

#### Phase 3: Complex Components
- Migrate composite components
- Update layout components
- Replace styled-components theme provider

#### Phase 4: Cleanup
- Remove styled-components dependencies
- Update documentation
- Performance optimization

## Key Commands

### Development
```bash
npm run dev          # Start development server
npm run storybook    # Launch Storybook
npm run test         # Run unit tests
npm run test:a11y    # Run accessibility tests
```

### Build & Release
```bash
npm run build        # Build component library
npm run build-tokens # Generate tokens from JSON
npm run lint         # Run ESLint and Stylelint
npm run typecheck    # TypeScript type checking
```

### Quality Assurance
```bash
npm run test:visual  # Visual regression tests
npm run test:coverage # Test coverage report
npm run chromatic    # Visual testing with Chromatic
```

## Performance Considerations

- Tree-shakable component exports
- CSS Module code splitting
- Lazy loading for large components
- Bundle size monitoring
- Core Web Vitals optimization

## Accessibility Standards

- WCAG 2.1 AA compliance
- Screen reader testing
- Keyboard navigation support
- Focus management
- Color contrast validation
- Semantic HTML structure

## Contribution Guidelines

1. Follow established component patterns
2. Include comprehensive tests and stories
3. Validate accessibility requirements
4. Update design token documentation
5. Ensure responsive design compliance
6. Run all quality checks before PR submission

## Migration Checklist

- [ ] Set up design token system
- [ ] Configure Storybook with design tokens showcase  
- [ ] Create CSS Module utilities and globals
- [ ] Implement core primitive components (Button, Input, Select)
- [ ] Add comprehensive testing setup
- [ ] Document component API and usage patterns
- [ ] Set up visual regression testing
- [ ] Create migration guide for existing styled-components
- [ ] Establish CI/CD pipeline with quality gates
- [ ] Performance benchmark and optimization

## Claude Commit Instructions

When using Claude for code contributions, **do not** include the `claude` code label in any commit messages or pull requests. All commits should follow the project's conventional commit guidelines - commit lint, and avoid any AI attribution labels.