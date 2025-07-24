import { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'
import styles from './Card.module.css'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Padding size for the card sections
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Whether the card is interactive (clickable)
   * @default false
   */
  interactive?: boolean
  
  /**
   * Custom class name
   */
  className?: string
  
  /**
   * Card content
   */
  children?: ReactNode
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Card title
   */
  title?: string
  
  /**
   * Card subtitle
   */
  subtitle?: string
  
  /**
   * Custom content (overrides title/subtitle)
   */
  children?: ReactNode
  
  /**
   * Custom class name
   */
  className?: string
}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Content
   */
  children?: ReactNode
  
  /**
   * Custom class name
   */
  className?: string
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Footer content
   */
  children?: ReactNode
  
  /**
   * Custom class name
   */
  className?: string
}

/**
 * Card component for containing and organizing content
 * 
 * @example
 * ```tsx
 * <Card>
 *   <Card.Header title="Settings" subtitle="Manage your account" />
 *   <Card.Content>
 *     <p>Your content here</p>
 *   </Card.Content>
 *   <Card.Footer>
 *     <Button>Save</Button>
 *   </Card.Footer>
 * </Card>
 * ```
 */
const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      size = 'md',
      interactive = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const cardClasses = cn(
      styles.card,
      styles[size],
      {
        [styles.interactive]: interactive,
      },
      className
    )

    return (
      <div ref={ref} className={cardClasses} {...props}>
        {children}
      </div>
    )
  }
)

CardRoot.displayName = 'Card'

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  (
    {
      title,
      subtitle,
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn(styles.header, className)} {...props}>
        {children || (
          <>
            {title && <h3 className={styles.title}>{title}</h3>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </>
        )}
      </div>
    )
  }
)

CardHeader.displayName = 'Card.Header'

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  (
    {
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn(styles.content, className)} {...props}>
        {children}
      </div>
    )
  }
)

CardContent.displayName = 'Card.Content'

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  (
    {
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn(styles.footer, className)} {...props}>
        {children}
      </div>
    )
  }
)

CardFooter.displayName = 'Card.Footer'

// Create a typed Card component with sub-components
interface CardComponent extends React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>> {
  Header: typeof CardHeader
  Content: typeof CardContent
  Footer: typeof CardFooter
}

// Attach sub-components
const CardWithSubComponents = CardRoot as CardComponent
CardWithSubComponents.Header = CardHeader
CardWithSubComponents.Content = CardContent
CardWithSubComponents.Footer = CardFooter

// Re-export as the main Card component
export { CardWithSubComponents as Card }