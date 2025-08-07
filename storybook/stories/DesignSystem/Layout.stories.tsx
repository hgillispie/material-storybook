import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Box, Stack, Text, Card } from '../../src/design-system';

const meta: Meta<typeof Box> = {
  title: 'Design System/Layout',
  component: Box,
};
export default meta;

export const StackAndBox: StoryObj<typeof Box> = {
  render: () => (
    <Stack direction="column" gap={16}>
      <Text variant="subheading">Horizontal Stack</Text>
      <Stack gap={12}>
        <Card><Text>Item 1</Text></Card>
        <Card><Text>Item 2</Text></Card>
        <Card><Text>Item 3</Text></Card>
      </Stack>
      <Text variant="subheading">Vertical Stack</Text>
      <Stack direction="column" gap={12}>
        <Card><Text>Row 1</Text></Card>
        <Card><Text>Row 2</Text></Card>
        <Card><Text>Row 3</Text></Card>
      </Stack>
    </Stack>
  ),
};