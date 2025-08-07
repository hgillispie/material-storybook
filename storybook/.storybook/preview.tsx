import React from 'react';
import ResizeObserverErrorBoundary from '../src/components/ResizeObserverErrorBoundary';
import '../src/utils/resizeObserverFix';
import { ThemeProvider } from '../src/design-system/ThemeProvider';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#fafafa' },
        { name: 'dark', value: '#0b0b0c' },
      ],
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const themeMode = context.globals.theme;
      return (
        <ResizeObserverErrorBoundary>
          <ThemeProvider mode={themeMode}>
            <div style={{ minHeight: '100vh', padding: 20 }}>
              <Story />
            </div>
          </ThemeProvider>
        </ResizeObserverErrorBoundary>
      );
    },
  ],
};

export default preview; 