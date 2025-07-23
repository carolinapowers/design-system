import { writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import colors from './colors.json'
import typography from './typography.json'
import spacing from './spacing.json'
import shadows from './shadows.json'

// Combine all tokens
const tokens = {
  ...colors,
  ...typography,
  ...spacing,
  ...shadows,
}

// Generate TypeScript types
function generateTypes(obj: any, prefix = ''): string {
  let types = ''
  
  for (const [key, value] of Object.entries(obj)) {
    const typeName = prefix + key.charAt(0).toUpperCase() + key.slice(1)
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      types += generateTypes(value, typeName)
    } else {
      const values = typeof value === 'object' && value !== null 
        ? Object.keys(value).map(k => `'${k}'`).join(' | ')
        : `'${key}'`
      
      if (typeof value === 'object' && value !== null) {
        types += `export type ${typeName}Keys = ${values}\n`
        types += `export type ${typeName}Values = {\n`
        for (const [k, v] of Object.entries(value)) {
          types += `  '${k}': '${v}'\n`
        }
        types += '}\n\n'
      }
    }
  }
  
  return types
}

// Generate CSS custom properties
function generateCSS(obj: any, prefix = '--bds'): string {
  let css = ':root {\n'
  
  function processObject(obj: any, currentPrefix: string) {
    for (const [key, value] of Object.entries(obj)) {
      const cssVar = `${currentPrefix}-${key}`
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        processObject(value, cssVar)
      } else if (Array.isArray(value)) {
        css += `  ${cssVar}: ${value.join(', ')};\n`
      } else {
        css += `  ${cssVar}: ${value};\n`
      }
    }
  }
  
  processObject(obj, prefix)
  css += '}\n'
  
  return css
}

// Generate JavaScript/TypeScript constants
function generateConstants(obj: any, name: string): string {
  return `export const ${name} = ${JSON.stringify(obj, null, 2)} as const\n\n`
}

// Ensure dist directory exists
mkdirSync(resolve(__dirname, '../../dist/tokens'), { recursive: true })

// Generate files
const types = `// This file is auto-generated. Do not edit manually.
import type { tokens } from './index'

${generateTypes(tokens)}

// Main token object type
export interface DesignTokens {
  color: typeof tokens.color
  typography: typeof tokens.typography
  spacing: typeof tokens.spacing
  shadow: typeof tokens.shadow
}

export type TokenPath = 
  | \`color.\${keyof typeof tokens.color}\`
  | \`typography.\${keyof typeof tokens.typography}\`
  | \`spacing.\${keyof typeof tokens.spacing}\`
  | \`shadow.\${keyof typeof tokens.shadow}\`
`

const constants = `// This file is auto-generated. Do not edit manually.

${generateConstants(tokens.color, 'colors')}
${generateConstants(tokens.typography, 'typography')}
${generateConstants(tokens.spacing, 'spacing')}
${generateConstants(tokens.shadow, 'shadows')}

export const tokens = {
  color: colors,
  typography,
  spacing,
  shadow: shadows,
} as const

export type Tokens = typeof tokens
`

const css = `/* This file is auto-generated. Do not edit manually. */

${generateCSS(tokens)}
`

// Write files
writeFileSync(resolve(__dirname, 'types.ts'), types)
writeFileSync(resolve(__dirname, 'index.ts'), constants)
writeFileSync(resolve(__dirname, '../../dist/tokens/index.css'), css)
writeFileSync(resolve(__dirname, '../styles/tokens.css'), css)

console.log('✅ Design tokens generated successfully!')