import { forwardRef, ReactNode, HTMLAttributes, ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'
import styles from './Badge.module.css'

export interface BadgeProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /**
   * Visual variant of the badge
   * @default 'default'
   */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  
  /**
   * Size of the badge
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Whether to use outline style
   * @default false
   */
  outline?: boolean
  
  /**
   * Whether the badge is interactive (clickable)
   * @default false
   */
  interactive?: boolean
  
  /**
   * Icon to display before the text
   */
  leftIcon?: ReactNode
  
  /**
   * Icon to display after the text
   */
  rightIcon?: ReactNode
  
  /**
   * Show a dot indicator instead of text
   * @default false
   */
  dot?: boolean
  
  /**
   * Badge content
   */
  children?: ReactNode
  
  /**
   * Custom class name
   */
  className?: string
  
}

/**
 * Badge component for displaying status, categories, or labels
 * 
 * @example
 * ```tsx
 * <Badge variant="success">Active</Badge>
 * <Badge variant="warning" outline>Pending</Badge>
 * <Badge interactive onClick={() => {}}>Clickable</Badge>
 * <Badge dot variant="error" />
 * ```
 */
export const Badge = forwardRef<HTMLElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      outline = false,
      interactive = false,
      leftIcon,
      rightIcon,
      dot = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const badgeClasses = cn(
      styles.badge,
      styles[variant],
      styles[size],
      {
        [styles.outline]: outline,
        [styles.interactive]: interactive,
      },
      className
    )

    const content = () => {
      if (dot) {
        return <span className={styles.dot} aria-hidden="true" />
      }

      return (
        <>
          {leftIcon && (
            <span className={styles.leftIcon} aria-hidden="true">
              {leftIcon}
            </span>
          )}
          {children && <span>{children}</span>}
          {rightIcon && (
            <span className={styles.rightIcon} aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </>
      )
    }

    if (interactive) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          className={badgeClasses}
          type="button"
          {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {content()}
        </button>
      )
    }

    return (
      <span
        ref={ref as React.Ref<HTMLSpanElement>}
        className={badgeClasses}
        {...(props as HTMLAttributes<HTMLSpanElement>)}
      >
        {content()}
      </span>
    )
  }
)

Badge.displayName = 'Badge'