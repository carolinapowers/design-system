import { ReactNode } from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { cn } from '@/utils/cn'
import { Size } from '@/types/component'
import styles from './Select.module.css'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectGroup {
  label: string
  options: SelectOption[]
}

export interface SelectProps {
  /**
   * Size of the select
   * @default 'md'
   */
  size?: Size
  
  /**
   * Visual variant of the select
   * @default 'default'
   */
  variant?: 'default' | 'error' | 'success'
  
  /**
   * Label text for the select
   */
  label?: string
  
  /**
   * Whether the field is required
   * @default false
   */
  required?: boolean
  
  /**
   * Placeholder text when no option is selected
   */
  placeholder?: string
  
  /**
   * Helper text to display below the select
   */
  helperText?: string
  
  /**
   * Error message to display below the select
   */
  errorText?: string
  
  /**
   * Success message to display below the select
   */
  successText?: string
  
  /**
   * Select options (flat array)
   */
  options?: SelectOption[]
  
  /**
   * Select options with groups
   */
  groups?: SelectGroup[]
  
  /**
   * Current selected value
   */
  value?: string
  
  /**
   * Default selected value for uncontrolled usage
   */
  defaultValue?: string
  
  /**
   * Callback when value changes
   */
  onValueChange?: (value: string) => void
  
  /**
   * Whether the select is disabled
   * @default false
   */
  disabled?: boolean
  
  /**
   * Custom class name
   */
  className?: string
  
  /**
   * Children for custom content (overrides options/groups)
   */
  children?: ReactNode
}

const ChevronDownIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m4.93179 5.43179c.15143-.15142.39464-.15142.54606 0l2.52215 2.52216 2.5221-2.52216c.1515-.15142.3947-.15142.5461 0 .1514.15143.1514.39464 0 .54606l-2.7982 2.79821c-.1514.1514-.3946.1514-.5460 0l-2.79821-2.79821c-.15142-.15142-.15142-.39463 0-.54606Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
)

const CheckIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m11.4669 3.72684c.1975.1976.1975.5176 0 .7152l-6.6 6.6c-.1976.1975-.5176.1975-.7152 0l-3.3-3.3c-.19748-.1976-.19748-.5176 0-.7152s.51762-.19748.71521 0l2.94279 2.9428 6.2428-6.2428c.1976-.19748.5176-.19748.7152 0Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
)

/**
 * Select component built on top of Radix UI Select primitive
 * 
 * @example
 * ```tsx
 * <Select
 *   label="Choose a fruit"
 *   placeholder="Select fruit..."
 *   options={[
 *     { value: 'apple', label: 'Apple' },
 *     { value: 'banana', label: 'Banana' },
 *   ]}
 *   onValueChange={(value) => console.log(value)}
 * />
 * ```
 */
export const Select = ({
  size = 'md',
  variant = 'default',
  label,
  required = false,
  placeholder = 'Select...',
  helperText,
  errorText,
  successText,
  options = [],
  groups = [],
  value: _value,
  defaultValue,
  onValueChange,
  disabled = false,
  className,
  children,
  ...triggerProps
}: SelectProps) => {
  // Generate unique ID for accessibility
  const selectId = `select-${Math.random().toString(36).substr(2, 9)}`
  
  // Determine the variant based on props
  const actualVariant = errorText ? 'error' : successText ? 'success' : variant
  
  const triggerClasses = cn(
    styles.trigger,
    styles[size],
    styles[actualVariant],
    className
  )

  const displayText = errorText || successText || helperText

  const renderOptions = () => {
    if (children) {
      return children
    }

    if (groups.length > 0) {
      return groups.map((group, groupIndex) => (
        <SelectPrimitive.Group key={groupIndex}>
          <SelectPrimitive.Label className={styles.groupLabel}>
            {group.label}
          </SelectPrimitive.Label>
          {group.options.map((option) => (
            <SelectPrimitive.Item 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
              className={styles.item}
            >
              <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
              <SelectPrimitive.ItemIndicator className={styles.itemIndicator}>
                <CheckIcon />
              </SelectPrimitive.ItemIndicator>
            </SelectPrimitive.Item>
          ))}
          {groupIndex < groups.length - 1 && (
            <SelectPrimitive.Separator className={styles.separator} />
          )}
        </SelectPrimitive.Group>
      ))
    }

    return options.map((option) => (
      <SelectPrimitive.Item 
        key={option.value} 
        value={option.value}
        disabled={option.disabled}
        className={styles.item}
      >
        <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
        <SelectPrimitive.ItemIndicator className={styles.itemIndicator}>
          <CheckIcon />
        </SelectPrimitive.ItemIndicator>
      </SelectPrimitive.Item>
    ))
  }

  return (
    <div className={styles.selectWrapper}>
      {label && (
        <label 
          htmlFor={selectId} 
          className={cn(styles.label, { [styles.required]: required })}
        >
          {label}
        </label>
      )}
      
      <SelectPrimitive.Root
        value={_value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectPrimitive.Trigger 
          className={triggerClasses}
          id={selectId}
          aria-describedby={displayText ? `${selectId}-text` : undefined}
          aria-invalid={actualVariant === 'error'}
          aria-required={required}
          {...triggerProps}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon className={styles.icon}>
            <ChevronDownIcon />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content className={styles.content}>
            <SelectPrimitive.Viewport className={styles.viewport}>
              {renderOptions()}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      
      {displayText && (
        <div 
          id={`${selectId}-text`}
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

// Export sub-components for advanced usage
export const SelectItem = SelectPrimitive.Item
export const SelectGroupPrimitive = SelectPrimitive.Group
export const SelectLabel = SelectPrimitive.Label
export const SelectSeparator = SelectPrimitive.Separator