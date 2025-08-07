import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card, CardHeader, CardFooter, Text, Button, Stack } from '../../src/design-system';

const meta: Meta<typeof Card> = {
  title: 'Design System/Card',
  component: Card,
};
export default meta;

export const Basic: StoryObj<typeof Card> = {
  render: () => (
    <Card>
      <CardHeader>
        <Text as="h3" variant="subheading">Card title</Text>
        <Text variant="muted">Optional subtitle</Text>
      </CardHeader>
      <Text>Body content goes here. Use this area for details.</Text>
      <CardFooter>
        <Stack gap={8}>
          <Button variant="secondary">Cancel</Button>
          <Button>Confirm</Button>
        </Stack>
      </CardFooter>
    </Card>
  ),
};