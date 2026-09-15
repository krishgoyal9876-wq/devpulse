# DevPulse – GitHub Inspector

DevPulse is a React.js single-page application that allows users to inspect GitHub profiles and repositories.

## Features

- Search GitHub users with a 500ms debounce
- Display GitHub profile information
- Display repositories in a responsive grid
- Filter repositories by programming language
- Sort repositories by:
  - Recently Updated
  - Most Stars
  - Most Forks
- URL-based search, filter, and sort state
- Shareable and refresh-persistent URLs
- Pin repositories to a global Pinboard
- Pinboard persists using localStorage
- Context API and useReducer for Pinboard state
- Loading and error states
- useMemo and useCallback for performance optimization
- Responsive design

## Tech Stack

- React.js
- Vite
- JavaScript
- GitHub REST API
- React Hooks
- Context API
- CSS
- localStorage
- Vercel

## React Concepts Used

- useState
- useEffect
- useContext
- useReducer
- useMemo
- useCallback
- Custom Hooks
- React.memo

## Project Structure

```text
src/
├── components/
│   ├── SearchBar.jsx
│   ├── FilterBar.jsx
│   ├── RepoCard.jsx
│   └── Pinboard.jsx
├── context/
│   └── PinboardContext.jsx
├── hooks/
│   └── useDebounce.js
├── App.jsx
├── main.jsx
└── index.css