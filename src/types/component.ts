import { ComponentPropsWithoutRef, ElementRef } from 'react'

// Base component props that all components should extend
export interface BaseComponentProps {
  className?: string
  'data-testid'?: string
}

// Common size variants
export type Size = 'sm' | 'md' | 'lg' | 'xl'

// Common variant types
export type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline'

// Utility type for forwarding refs
export type ComponentRef<T extends keyof JSX.IntrinsicElements> = ElementRef<T>

// Utility type for component props with ref forwarding
export type ComponentProps<T extends keyof JSX.IntrinsicElements> = 
  ComponentPropsWithoutRef<T> & BaseComponentProps

// Color token keys (generated from design tokens)
export type ColorToken = 
  | 'brand.primary'
  | 'brand.secondary' 
  | 'semantic.success'
  | 'semantic.warning'
  | 'semantic.error'
  | 'neutral'

// Spacing token keys
export type SpacingToken = 
  | '0' | '0.5' | '1' | '1.5' | '2' | '2.5' | '3' | '3.5' | '4' 
  | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '14' | '16' 
  | '20' | '24' | '28' | '32' | '36' | '40'

// Typography token keys
export type FontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
export type FontWeight = 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black'