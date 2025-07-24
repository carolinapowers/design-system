import { forwardRef, ReactNode } from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { cn } from '@/utils/cn'
import { Size } from '@/types/component'
import styles from './Checkbox.module.css'

export interface CheckboxProps {
  /**
   * Size of the checkbox
   * @default 'md'
   */
  size?: Exclude<Size, 'xl'>
  
  /**
   * Whether the checkbox has an error state
   * @default false
   */
  error?: boolean
  
  /**
   * Label text for the checkbox
   */
  label?: string
  
  /**
   * Description text below the label
   */
  description?: string
  
  /**
   * Error message to display
   */
  errorText?: string
  
  /**
   * Whether the checkbox is checked
   */
  checked?: boolean
  
  /**
   * Default checked state for uncontrolled usage
   */
  defaultChecked?: boolean
  
  /**
   * Whether the checkbox is in an indeterminate state
   */
  indeterminate?: boolean
  
  /**
   * Callback when checked state changes
   */
  onCheckedChange?: (checked: boolean) => void
  
  /**
   * Whether the checkbox is disabled
   * @default false
   */
  disabled?: boolean
  
  /**
   * Whether the checkbox is required
   * @default false
   */
  required?: boolean
  
  /**
   * Name attribute for form submission
   */
  name?: string
  
  /**
   * Value attribute for form submission
   */
  value?: string
  
  /**
   * Custom class name
   */
  className?: string
  
  
  /**
   * Custom content to replace the label
   */
  children?: ReactNode
}

const CheckIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m9.765 3.205c.14.14.14.367 0 .507l-4.5 4.5c-.14.14-.367.14-.507 0l-2.25-2.25c-.14-.14-.14-.367 0-.507s.367-.14.507 0l1.996 1.996 4.247-4.246c.14-.14.367-.14.507 0Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
)

const IndeterminateIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 6h6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

/**
 * Checkbox component built on top of Radix UI Checkbox primitive
 * 
 * @example
 * ```tsx
 * <Checkbox
 *   label="Accept terms and conditions"
 *   description="You must accept our terms to continue"
 *   required
 * />
 * 
 * <Checkbox
 *   checked={isChecked}
 *   onCheckedChange={setIsChecked}
 *   error={hasError}
 *   errorText="This field is required"
 * />
 * ```
 */
export const Checkbox = forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      size = 'md',
      error = false,
      label,
      description,
      errorText,
      checked: _checked,
      defaultChecked,
      indeterminate,
      onCheckedChange,
      disabled = false,
      required = false,
      name,
      value,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const wrapperClasses = cn(
      styles.checkboxWrapper,
      styles[size],
      {
        [styles.disabled]: disabled,
        [styles.error]: error || errorText,
      },
      className
    )

    const displayErrorText = errorText
    const hasContent = label || description || children || displayErrorText

    return (
      <div className={wrapperClasses}>
        <CheckboxPrimitive.Root
          ref={ref}
          className={styles.root}
          checked={indeterminate ? 'indeterminate' : _checked}
          defaultChecked={defaultChecked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          required={required}
          name={name}
          value={value}
          aria-describedby={
            description || displayErrorText 
              ? `checkbox-${Math.random().toString(36).substr(2, 9)}-desc` 
              : undefined
          }
          aria-invalid={error || !!errorText}
          {...props}
        >
          <CheckboxPrimitive.Indicator className={styles.indicator}>
            {indeterminate ? <IndeterminateIcon /> : <CheckIcon />}
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>

        {hasContent && (
          <div className={styles.content}>
            {children || (
              <>
                {label && (
                  <label 
                    className={styles.label}
                    onClick={(e) => {
                      if (disabled) {
                        e.preventDefault()
                        return
                      }
                      const checkbox = e.currentTarget.parentElement?.parentElement?.querySelector('[role="checkbox"]') as HTMLElement
                      checkbox?.click()
                    }}
                  >
                    {label}
                    {required && <span style={{ color: 'var(--bds-color-semantic-error-500)' }}> *</span>}
                  </label>
                )}
                {description && (
                  <div className={styles.description}>
                    {description}
                  </div>
                )}
              </>
            )}
            
            {displayErrorText && (
              <div className={styles.errorText} role="alert">
                {displayErrorText}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'