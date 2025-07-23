import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/utils/cn'
import { Size, Variant } from '@/types/component'
import styles from './Button.module.css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant of the button
   * @default 'primary'
   */
  variant?: Variant
  
  /**
   * Size of the button
   * @default 'md'
   */
  size?: Size
  
  /**
   * Whether the button is in a loading state
   * @default false
   */
  loading?: boolean
  
  /**
   * Icon to display before the button text
   */
  iconLeft?: ReactNode
  
  /**
   * Icon to display after the button text
   */
  iconRight?: ReactNode
  
  /**
   * Whether to render as an icon-only button (no text)
   * @default false
   */
  iconOnly?: boolean
  
  /**
   * If true, the button will render as a Slot component for composition
   * @default false
   */
  asChild?: boolean
  
  /**
   * Content of the button
   */
  children?: ReactNode
  
  /**
   * Test ID for testing purposes
   */
  'data-testid'?: string
}

/**
 * Button component built on top of HTML button element with design system tokens
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md">
 *   Click me
 * </Button>
 * 
 * <Button variant="secondary" iconLeft={<Icon />} loading>
 *   Loading...
 * </Button>
 * 
 * <Button asChild>
 *   <a href="/link">Link Button</a>
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      iconLeft,
      iconRight,
      iconOnly = false,
      asChild = false,
      className,
      disabled,
      children,
      'data-testid': testId,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : 'button'
    
    const buttonClasses = cn(
      styles.button,
      styles[variant],
      styles[size],
      {
        [styles.loading]: loading,
        [styles.iconOnly]: iconOnly,
        [styles.iconLeft]: iconLeft && !iconOnly,
        [styles.iconRight]: iconRight && !iconOnly,
      },
      className
    )

    const isDisabled = disabled || loading

    const content = () => {
      if (iconOnly) {
        return iconLeft || iconRight || children
      }
      
      return (
        <>
          {iconLeft && !loading && iconLeft}
          {children && <span>{children}</span>}
          {iconRight && !loading && iconRight}
        </>
      )
    }

    return (
      <Component
        ref={ref}
        className={buttonClasses}
        disabled={isDisabled}
        data-testid={testId}
        aria-disabled={isDisabled}
        aria-busy={loading}
        type={asChild ? undefined : 'button'}
        {...props}
      >
        {content()}
      </Component>
    )
  }
)

Button.displayName = 'Button'