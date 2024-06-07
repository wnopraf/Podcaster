# Podcaster app

[React](https://es.react.dev/) based app powered by [vitejs](https://vitejs.dev/) that shows you a bunch of Itunes library podcasts, allowing you to filter by name and listen them in a detail page.

The app is built on top of [React-Router](https://reactrouter.com/en/main), and uses basic [React](https://es.react.dev/) state management in order to keep it simple, and [TailwindCSS](https://tailwindcss.com/) for styling.

File structure is ordered following clean arquitecture patterns, concretly feature pattern arquitecutre where we split the main views following a feature based criteria that keep us away of deps coupling, allowing us scaling up the app with easeness while keeping a clean and easy to follow adding pattern.

[Live demo](https://podcasterapp.netlify.app/)

## Development

Requirements:

- Node.js 18
- [PNPM](https://pnpm.io/) 8

## How to run it ?

Main commands:

- `bash pnpm install ` to install respository dependencies
- `bash pnpm dev` to start developemt server
- `bash pnpm build:dev` to get a build version without minification and with source maps
- `bash pnpm build:prod` to get a prod version with asset minification

## Testing

the app uses Vitest as main testing tool and Playwright as e2e framework.
Basic test setup:

- `bash pnpm test` for unit testing
- `bash pnpm test:e2e` for end to end testing
