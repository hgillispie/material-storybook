import React from 'react';

const Introduction = () => (
  <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
    <h1>Design System Starter</h1>
    <p>
      This Storybook is a clean slate to build your design system. It ships with a minimal set of primitives
      (Button, Card, Text, Box, Stack) and CSS variable tokens with light/dark modes.
    </p>
    <ul>
      <li>Edit tokens in <code>src/design-system/tokens.css</code></li>
      <li>Add components in <code>src/design-system/components</code></li>
      <li>Export them from <code>src/design-system/index.ts</code></li>
    </ul>
    <p>
      When ready, you can integrate with Builder Fusion by mapping these primitives and tokens.
    </p>
  </div>
);

export default {
  title: 'Introduction',
  component: Introduction,
};

export const Intro = {}; 