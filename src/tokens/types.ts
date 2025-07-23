// This file is auto-generated. Do not edit manually.
import type { tokens } from './index'

export type TypographyFontFamilySansKeys = '0' | '1' | '2' | '3'
export type TypographyFontFamilySansValues = {
  '0': 'Inter'
  '1': 'system-ui'
  '2': '-apple-system'
  '3': 'sans-serif'
}

export type TypographyFontFamilyMonoKeys = '0' | '1' | '2' | '3'
export type TypographyFontFamilyMonoValues = {
  '0': 'JetBrains Mono'
  '1': 'Consolas'
  '2': 'Monaco'
  '3': 'monospace'
}



// Main token object type
export interface DesignTokens {
  color: typeof tokens.color
  typography: typeof tokens.typography
  spacing: typeof tokens.spacing
  shadow: typeof tokens.shadow
}

export type TokenPath = 
  | `color.${keyof typeof tokens.color}`
  | `typography.${keyof typeof tokens.typography}`
  | `spacing.${keyof typeof tokens.spacing}`
  | `shadow.${keyof typeof tokens.shadow}`
