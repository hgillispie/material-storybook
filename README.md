# Design System Starter

A clean-slate Storybook setup for building a custom design system. It includes theme tokens (CSS variables), a lightweight ThemeProvider with light/dark modes, and a few base primitives to get you moving fast.

## Requirements
- Node 18+
- npm 9+ (or pnpm/yarn if you prefer)

## Quickstart
```bash
npm install
npm run storybook
Build static Storybook:

npm run build-storybook
Project structure
.storybook/: Storybook config using the custom ThemeProvider
src/design-system/: Tokens, ThemeProvider, and primitives
tokens.css: CSS variables for colors, spacing, radii, typography, shadows
ThemeProvider.tsx: Sets data-theme and exposes useTheme()
components/: Base primitives
Box, Stack, Button, Card, Text
index.ts: Barrel exports
stories/DesignSystem/: Example stories for primitives
Theming and tokens
Tokens live in src/design-system/tokens.css and are applied via data-theme on :root.

Light and dark themes are supported out of the box
Add/edit variables to grow your token set
Use ThemeProvider at the app/story root:

import { ThemeProvider } from '../src/design-system';

export function App() {
  return (
    <ThemeProvider mode="light">
      {/* your app */}
    </ThemeProvider>
  );
}
Switch modes by changing the mode prop ('light' | 'dark').

Primitives
All components are exported from src/design-system/index.ts.

import { Box, Stack, Button, Card, CardHeader, CardFooter, Text } from '../src/design-system';

function Example() {
  return (
    <Card>
      <CardHeader>
        <Text as="h3" variant="subheading">Title</Text>
        <Text variant="muted">Subtitle</Text>
      </CardHeader>
      <Text>Body content</Text>
      <CardFooter>
        <Stack gap={8}>
          <Button variant="secondary">Cancel</Button>
          <Button>Confirm</Button>
        </Stack>
      </CardFooter>
    </Card>
  );
}
Box: simple wrapper with as and common HTML props
Stack: flex layout with direction, gap, align, justify, wrap
Button: variant = primary | secondary | ghost, size = sm | md | lg
Card, CardHeader, CardFooter
Text: variant = body | muted | heading | subheading | caption
Extending the system
Add a new primitive in src/design-system/components/
Export it in src/design-system/index.ts
Create a story in stories/DesignSystem/ to document it
Add/adjust tokens in tokens.css as needed
Common next primitives:

Input, Tag/Badge, Modal/Drawer, Tooltip, Tabs, Menu, Grid
Builder Fusion integration
You can map Builder Fusion components to these primitives and tokens.

Keep primitives small and composable
Centralize visual decisions in tokens
Create a fusion-mapping.ts (or similar) to translate Fusion nodes → DS components
If you share the required mapping shape, we can scaffold the mapping file here.

Scripts
npm run storybook: start Storybook
npm run build-storybook: build static Storybook
Contributing
Edit components/tokens, add stories, and open a PR.
Keep primitives unopinionated; push styling into tokens.
License
MIT (or your preferred license).
## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the same terms as the main mui-vite-demo project.
