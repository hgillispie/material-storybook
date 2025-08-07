import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button, Stack } from '../../src/design-system';

const meta: Meta<typeof Button> = {
  title: 'Design System/Button',
  component: Button,
  argTypes: {
    variant: { control: 'radio', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Button',
  },
};
export default meta;

export const Variants: StoryObj<typeof Button> = {
  render: (args) => (
    <Stack gap={12}>
      <Stack gap={8}>
        <Button {...args} variant="primary">Primary</Button>
        <Button {...args} variant="secondary">Secondary</Button>
        <Button {...args} variant="ghost">Ghost</Button>
      </Stack>
    </Stack>
  ),
};

export const Sizes: StoryObj<typeof Button> = {
  render: (args) => (
    <Stack gap={12}>
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </Stack>
  ),
};