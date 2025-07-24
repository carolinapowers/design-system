import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { Select } from './Select'

const sampleOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
]

const sampleGroups = [
  {
    label: 'Fruits',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'cherry', label: 'Cherry' },
    ],
  },
  {
    label: 'Vegetables',
    options: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'broccoli', label: 'Broccoli' },
      { value: 'spinach', label: 'Spinach' },
    ],
  },
]

const meta = {
  title: 'Primitives/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A select component built on Radix UI primitives with support for single selection, groups, and multiple states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the select',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'error', 'success'],
      description: 'Visual variant of the select',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text for the select',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text when no option is selected',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the field is required',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the select is disabled',
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text to display below select',
    },
    errorText: {
      control: { type: 'text' },
      description: 'Error message to display',
    },
    successText: {
      control: { type: 'text' },
      description: 'Success message to display',
    },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Choose an option...',
    options: sampleOptions,
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Favorite Fruit',
    placeholder: 'Select your favorite fruit',
    options: sampleOptions,
  },
}

export const Required: Story = {
  args: {
    label: 'Required Field',
    placeholder: 'Please select an option',
    required: true,
    options: sampleOptions,
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Fruit Selection',
    placeholder: 'Choose a fruit',
    helperText: 'Select your preferred fruit from the list',
    options: sampleOptions,
  },
}

export const ErrorState: Story = {
  args: {
    label: 'Fruit',
    placeholder: 'Select a fruit',
    errorText: 'Please select a valid option',
    options: sampleOptions,
  },
}

export const SuccessState: Story = {
  args: {
    label: 'Fruit',
    placeholder: 'Select a fruit',
    successText: 'Great choice!',
    defaultValue: 'apple',
    options: sampleOptions,
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Select size="sm" label="Small" placeholder="Small select" options={sampleOptions} />
      <Select size="md" label="Medium" placeholder="Medium select" options={sampleOptions} />
      <Select size="lg" label="Large" placeholder="Large select" options={sampleOptions} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select components come in three sizes: sm, md, and lg.',
      },
    },
  },
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Select label="Default" placeholder="Default state" options={sampleOptions} />
      <Select label="Disabled" placeholder="Disabled state" disabled options={sampleOptions} />
      <Select 
        label="Error" 
        placeholder="Error state" 
        errorText="This field is required"
        options={sampleOptions}
      />
      <Select 
        label="Success" 
        placeholder="Success state" 
        successText="Perfect choice!"
        defaultValue="apple"
        options={sampleOptions}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different select states including default, disabled, error, and success.',
      },
    },
  },
}

export const WithGroups: Story = {
  args: {
    label: 'Food Selection',
    placeholder: 'Choose food...',
    groups: sampleGroups,
  },
  parameters: {
    docs: {
      description: {
        story: 'Select can organize options into labeled groups with separators.',
      },
    },
  },
}

export const WithDisabledOptions: Story = {
  args: {
    label: 'Available Fruits',
    placeholder: 'Select a fruit',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana (Out of stock)', disabled: true },
      { value: 'cherry', label: 'Cherry' },
      { value: 'date', label: 'Date (Seasonal)', disabled: true },
      { value: 'elderberry', label: 'Elderberry' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Individual options can be disabled to prevent selection.',
      },
    },
  },
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('banana')
    
    return (
      <div style={{ width: '300px' }}>
        <Select
          label="Controlled Select"
          placeholder="Choose a fruit"
          value={value}
          onValueChange={setValue}
          options={sampleOptions}
        />
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
          Selected value: {value || 'None'}
        </p>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Select can be controlled by managing the value state externally.',
      },
    },
  },
}

export const DefaultValue: Story = {
  args: {
    label: 'Pre-selected Option',
    placeholder: 'Choose a fruit',
    defaultValue: 'cherry',
    options: sampleOptions,
  },
  parameters: {
    docs: {
      description: {
        story: 'Select can have a default value for uncontrolled usage.',
      },
    },
  },
}

export const Complex: Story = {
  args: {
    label: 'Meal Preference',
    placeholder: 'Select your preferred meal type',
    required: true,
    helperText: 'Choose based on your dietary requirements',
    groups: [
      {
        label: 'Vegetarian',
        options: [
          { value: 'veggie-burger', label: 'Veggie Burger' },
          { value: 'salad', label: 'Garden Salad' },
          { value: 'pasta', label: 'Pasta Primavera' },
        ],
      },
      {
        label: 'Non-Vegetarian',
        options: [
          { value: 'chicken', label: 'Grilled Chicken' },
          { value: 'fish', label: 'Baked Fish' },
          { value: 'beef', label: 'Beef Steak', disabled: true },
        ],
      },
    ],
  },
}