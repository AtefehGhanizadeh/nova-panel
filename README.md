# NOVA Admin

An admin panel for the NOVA store, built with React, TypeScript and Redux Toolkit on top of
[FakeStoreAPI](https://fakestoreapi.com). Admins can sign in, browse and search products and users,
and create new ones. The interface supports Persian (RTL) and English (LTR), in light and dark themes.

## Features

- Authentication: login with session persistence, protected routes, a redirect back to the
  page you originally requested, and automatic logout when the API returns 401.
- Products: a paginated table with client-side search by title or category (including the
  translated category name), and a create form with a live image preview.
- Users: a paginated table with search by name, username or email, and a create form.
- Internationalization: Persian and English, with type-checked dictionaries. Layout direction,
  number and currency formatting follow the selected language.
- Theming: light and dark themes, saved in localStorage.
- Complete UI states: loading skeletons, empty states, no-results states, and error states with
  a retry button. Errors are mapped to clear, translated messages (network, timeout, unauthorized,
  server and so on).
- Accessibility: labelled controls, field-level error announcements, a focus-trapped modal that
  returns focus when closed, keyboard navigation and prefers-reduced-motion support.

## Tech stack

| Concern  | Choice                              |
| -------- | ----------------------------------- |
| UI       | React 19, styled-components         |
| Language | TypeScript (strict)                 |
| State    | Redux Toolkit, React Redux          |
| Routing  | React Router                        |
| Forms    | Formik + Yup                        |
| HTTP     | Axios                               |
| Tooling  | Vite, ESLint (type-aware), Prettier |

## Getting started

### Prerequisites

- Node.js 20 or later
- npm

### Install and run

npm install
cp .env.example .env
npm run dev
The app runs at http://localhost:5173.

### Environment variables

| Variable            | Description                            | Example                    |
| ------------------- | -------------------------------------- | -------------------------- |
| VITE_API_BASE_URL | Base URL of the API (must be absolute) | https://fakestoreapi.com |

The app checks this value at startup and fails with a clear message if it is missing or invalid.

### Demo credentials

FakeStoreAPI accepts the username and password of any user returned by
[/users](https://fakestoreapi.com/users), for example:

| Username   | Password |
| ---------- | -------- |
| mor_2314 | 83r5^_ |

## Scripts

| Command                | Description                              |
| ---------------------- | ---------------------------------------- |
| npm run dev          | Start the development server             |
| npm run build        | Type-check and build for production      |
| npm run preview      | Serve the production build locally       |
| npm run typecheck    | Run the TypeScript compiler only         |
| npm run lint         | Lint the project with ESLint             |
| npm run format       | Format all files with Prettier           |
| npm run format:check | Check formatting without writing changes |

## Project structure

`text
src/
├── assets/          Fonts, images and SVG icon components
├── Components/      Feature components (Layout, Login, Products, Users)
├── Dictionary/      Translations (fa, en) and the useTranslation hook
├── Modals/          Create-product and create-user dialogs
├── Pages/           Route-level pages
├── Redux/           Store, typed hooks and slices (auth, products, users, settings)
├── Routes/          Router, route paths, and protected/public-only route guards
├── Shared/          Reusable UI primitives (Button, Input, Table, Modal, ...)
├── Storage/         Cookie and localStorage wrappers
├── styles/          Theme tokens and global styles
├── types/           Domain types and enums
├── Utils/           API client, services and helper functions
└── Validations/     Yup schemas for the login, product and user forms
`

## Architecture notes

- Layered data flow. Components dispatch thunks, thunks call services, services call a single
  Axios instance. Components never call the API directly.
- One error shape. Every failure is normalized into an `ApiError` (`code`, `message`, optional
  `status`) by `handleApiError`. The UI translates the `code`, so the user always sees a clear
  message in their own language.
- No duplicate requests. Fetch thunks use Redux Toolkit's `condition` option, so data loads
  once even under React StrictMode and is not refetched when you switch between pages.
- Type-safe translations. The English dictionary is typed against the Persian one, so a missing
  or misspelled key is a compile-time error.
- Validated storage. Values read from cookies and `localStorage` are checked against the expected
  shape before use, so corrupted or outdated data falls back to safe defaults.
- RTL first. Layout uses CSS logical properties (`inset-inline-start`, `margin-block-end`, ...),
  so the same styles work in both directions. Directional icons flip automatically in RTL.

## Known limitations

- FakeStoreAPI does not persist writes. Created products and users are returned by the API but
  never saved, so they are kept in the Redux store only and disappear on reload. The API also
  returns the same ID for every new item, so the app assigns a unique local ID when needed.
- Search and pagination are client-side, because the API offers neither. This is fine for the
  small dataset but would move to the server in a real product.
- Desktop-first layout. The panel targets screens 1280px wide or more.
- Token storage. The session is kept in a `SameSite=Strict` cookie that JavaScript can read