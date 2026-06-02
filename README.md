# Flamme Rouge Energy Phase Helper

This app helps to eliminate the monotonous shuffling during the energy phase of the board game Flamme Rouge.

## Tech Stack

- [Vue 3](https://vuejs.org/) (`<script setup>` + Composition API)
- [Vite](https://vitejs.dev/) build tooling
- [Pinia](https://pinia.vuejs.org/) state management
- [Vue I18n](https://vue-i18n.intlify.dev/) localization (English, Hungarian)
- [Tailwind CSS](https://tailwindcss.com/) + [daisyUI](https://daisyui.com/) styling
- [Biome](https://biomejs.dev/) linting and formatting
- [Vitest](https://vitest.dev/) unit testing
- [Playwright](https://playwright.dev/) end-to-end testing

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [Biome](https://biomejs.dev/)

```sh
npm run lint
```

### Format with [Biome](https://biomejs.dev/)

```sh
npm run format
```

### Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm test
```

Run in watch mode:

```sh
npm run test:watch
```

### End-to-End Tests with [Playwright](https://playwright.dev/)

Install the browser binaries once before the first run:

```sh
npx playwright install chromium
```

Run the E2E suite (the dev server is started automatically):

```sh
npm run test:e2e
```

Run with the interactive UI:

```sh
npm run test:e2e:ui
```
