import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'
import { Size } from '@/types/component'
import styles from './Input.module.css'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Size of the input
   * @default 'md'
   */
  size?: Size
  
  /**
   * Visual variant of the input
   * @default 'default'
   */
  variant?: 'default' | 'error' | 'success'
  
  /**
   * Label text for the input
   */
  label?: string
  
  /**
   * Whether the field is required
   * @default false
   */
  required?: boolean
  
  /**
   * Helper text to display below the input
   */
  helperText?: string
  
  /**
   * Error message to display below the input
   */
  errorText?: string
  
  /**
   * Success message to display below the input
   */
  successText?: string
  
  /**
   * Icon to display on the left side of the input
   */
  leftIcon?: ReactNode
  
  /**
   * Icon to display on the right side of the input
   */
  rightIcon?: ReactNode
  
  /**
   * Test ID for testing purposes
   */
  'data-testid'?: string
}

/**
 * Input component for text input with various states and styling options
 * 
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   placeholder="Enter your email"
 *   type="email"
 *   required
 * />
 * 
 * <Input
 *   variant="error"
 *   errorText="This field is required"
 *   leftIcon={<EmailIcon />}
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      variant = 'default',
      label,
      required = false,
      helperText,
      errorText,
      successText,
      leftIcon,
      rightIcon,
      className,
      disabled,
      'data-testid': testId,
      id,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    
    // Determine the variant based on props
    const actualVariant = errorText ? 'error' : successText ? 'success' : variant
    
    const inputClasses = cn(
      styles.input,
      styles[size],
      styles[actualVariant],
      {
        [styles.withLeftIcon]: leftIcon,
        [styles.withRightIcon]: rightIcon,
      },
      className
    )

    const displayText = errorText || successText || helperText

    return (
      <div className={styles.inputWrapper} data-testid={testId}>
        {label && (
          <label 
            htmlFor={inputId} 
            className={cn(styles.label, { [styles.required]: required })}
          >
            {label}
          </label>
        )}
        
        <div className={styles.inputContainer}>
          {leftIcon && (
            <div className={styles.leftIcon} aria-hidden="true">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            disabled={disabled}
            required={required}
            aria-describedby={displayText ? `${inputId}-text` : undefined}
            aria-invalid={actualVariant === 'error'}
            {...props}
          />
          
          {rightIcon && (
            <div className={styles.rightIcon} aria-hidden="true">
              {rightIcon}
            </div>
          )}
        </div>
        
        {displayText && (
          <div 
            id={`${inputId}-text`}
            className={cn({
              [styles.helperText]: helperText && !errorText && !successText,
              [styles.errorText]: errorText,
              [styles.successText]: successText,
            })}
            role={errorText ? 'alert' : undefined}
          >
            {displayText}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'