import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Text, Stack } from '../../src/design-system';

const meta: Meta<typeof Text> = {
  title: 'Design System/Text',
  component: Text,
};
export default meta;

export const Variants: StoryObj<typeof Text> = {
  render: () => (
    <Stack direction="column" gap={10}>
      <Text variant="heading">Heading</Text>
      <Text variant="subheading">Subheading</Text>
      <Text>Body text lorem ipsum dolor sit amet.</Text>
      <Text variant="muted">Muted text for secondary information.</Text>
      <Text variant="caption">Caption text</Text>
    </Stack>
  ),
};