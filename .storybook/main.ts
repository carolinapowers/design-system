import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },

  viteFinal: async (config) => {
    // Ensure CSS modules work in Storybook
    if (config.css?.modules) {
      config.css.modules = {
        ...config.css.modules,
        localsConvention: 'camelCase',
        generateScopedName: 'bds-[name]__[local]___[hash:base64:5]',
      }
    }
    
    return config
  }
}

export default config