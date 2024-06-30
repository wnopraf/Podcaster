# Podcaster app

[React](https://es.react.dev/) based app powered by [vitejs](https://vitejs.dev/) that shows you a bunch of Itunes library podcasts, allowing you to filter by name and listen them in a detail page.

The app is built on top of [React-Router](https://reactrouter.com/en/main), and uses basic [React](https://es.react.dev/) state management in order to keep it simple, and [TailwindCSS](https://tailwindcss.com/) for styling.

File structure is ordered following clean arquitecture patterns, concretly feature pattern arquitecutre where we split the main views following a feature based criteria that keep us away of deps coupling, allowing us scaling up the app with easeness while keeping a clean and easy to follow adding pattern.

[Live demo](https://podcasterapp.netlify.app/)

## Component arquitecture
![<app structure>](./podcasts-component-diagram.svg)

## Branchs

- main with custom cache system
- f/with-react-query with react-query as cache & fetching system

## Development

Requirements:

- Node.js 18
- [PNPM](https://pnpm.io/) 8

## How to run it ?

Main commands:

- `pnpm install ` to install respository dependencies
- `pnpm dev` to start developemt server
- `pnpm build:dev` to get a build version without minification and with source maps
- `pnpm build:prod` to get a prod version with asset minification

## Testing

the app uses Vitest as main testing tool and Cypress as e2e framework.
Basic test setup:

- `pnpm test` for unit testing
- `pnpm test:e2e` for end to end testing






