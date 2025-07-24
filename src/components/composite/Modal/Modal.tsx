import { ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { cn } from '@/utils/cn'
import { Button } from '@/components/primitives/Button'
import styles from './Modal.module.css'

export interface ModalProps {
  /**
   * Whether the modal is open
   */
  open?: boolean
  
  /**
   * Callback when modal open state changes
   */
  onOpenChange?: (open: boolean) => void
  
  /**
   * Modal title
   */
  title?: string
  
  /**
   * Modal description
   */
  description?: string
  
  /**
   * Size of the modal
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  
  /**
   * Whether to show close button
   * @default true
   */
  showCloseButton?: boolean
  
  /**
   * Close button aria label
   * @default 'Close'
   */
  closeButtonLabel?: string
  
  /**
   * Primary action button text
   */
  primaryAction?: string
  
  /**
   * Primary action callback
   */
  onPrimaryAction?: () => void
  
  /**
   * Primary action button variant
   * @default 'primary'
   */
  primaryActionVariant?: 'primary' | 'secondary' | 'destructive'
  
  /**
   * Primary action button loading state
   */
  primaryActionLoading?: boolean
  
  /**
   * Secondary action button text
   */
  secondaryAction?: string
  
  /**
   * Secondary action callback
   */
  onSecondaryAction?: () => void
  
  /**
   * Whether clicking overlay closes modal
   * @default true
   */
  closeOnOverlayClick?: boolean
  
  /**
   * Whether escape key closes modal
   * @default true
   */
  closeOnEscape?: boolean
  
  /**
   * Custom class name for modal content
   */
  className?: string
  
  /**
   * Modal content
   */
  children?: ReactNode
  
  /**
   * Trigger element (for uncontrolled usage)
   */
  trigger?: ReactNode
}

const CloseIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m12.854 2.854-10 10-.708-.708 10-10 .708.708Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
    <path
      d="m2.146 2.854 10 10 .708-.708-10-10-.708.708Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
)

/**
 * Modal component built on top of Radix UI Dialog primitive
 * 
 * @example
 * ```tsx
 * <Modal
 *   title="Delete Account"
 *   description="This action cannot be undone"
 *   primaryAction="Delete"
 *   primaryActionVariant="destructive"
 *   secondaryAction="Cancel"
 *   onPrimaryAction={() => deleteAccount()}
 *   onSecondaryAction={() => setModalOpen(false)}
 * >
 *   <p>Are you sure you want to delete your account?</p>
 * </Modal>
 * ```
 */
export const Modal = ({
  open,
  onOpenChange,
  title,
  description,
  size = 'md',
  showCloseButton = true,
  closeButtonLabel = 'Close',
  primaryAction,
  onPrimaryAction,
  primaryActionVariant = 'primary',
  primaryActionLoading = false,
  secondaryAction,
  onSecondaryAction,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
  children,
  trigger,
}: ModalProps) => {
  const contentClasses = cn(
    styles.content,
    styles[size],
    className
  )

  const modalContent = (
    <Dialog.Portal>
      <Dialog.Overlay 
        className={styles.overlay}
        onClick={closeOnOverlayClick ? undefined : (e) => e.preventDefault()}
      />
      <Dialog.Content 
        className={contentClasses}
        onEscapeKeyDown={closeOnEscape ? undefined : (e) => e.preventDefault()}
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            {title ? (
              <Dialog.Title className={styles.title}>
                {title}
              </Dialog.Title>
            ) : (
              <Dialog.Title className={styles.srOnly}>
                Modal
              </Dialog.Title>
            )}
            {description ? (
              <Dialog.Description className={styles.description}>
                {description}
              </Dialog.Description>
            ) : (
              <Dialog.Description className={styles.srOnly}>
                Modal dialog
              </Dialog.Description>
            )}
          </div>
          
          {showCloseButton && (
            <Dialog.Close className={styles.closeButton} aria-label={closeButtonLabel}>
              <CloseIcon />
            </Dialog.Close>
          )}
        </div>

        {/* Body */}
        {children && (
          <div className={styles.body}>
            {children}
          </div>
        )}

        {/* Footer */}
        {(primaryAction || secondaryAction) && (
          <div className={styles.footer}>
            {secondaryAction && (
              <Button
                variant="outline"
                onClick={onSecondaryAction}
              >
                {secondaryAction}
              </Button>
            )}
            {primaryAction && (
              <Button
                variant={primaryActionVariant}
                onClick={onPrimaryAction}
                loading={primaryActionLoading}
              >
                {primaryAction}
              </Button>
            )}
          </div>
        )}
      </Dialog.Content>
    </Dialog.Portal>
  )

  // Controlled modal
  if (open !== undefined) {
    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
        {modalContent}
      </Dialog.Root>
    )
  }

  // Uncontrolled modal (requires trigger)
  return (
    <Dialog.Root onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      {modalContent}
    </Dialog.Root>
  )
}

// Export sub-components for advanced usage
export const ModalRoot = Dialog.Root
export const ModalTrigger = Dialog.Trigger
export const ModalPortal = Dialog.Portal
export const ModalOverlay = Dialog.Overlay
export const ModalContent = Dialog.Content
export const ModalTitle = Dialog.Title
export const ModalDescription = Dialog.Description
export const ModalClose = Dialog.Close