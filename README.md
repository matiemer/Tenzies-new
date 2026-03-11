# Tenzies

A small React + TypeScript implementation of the Tenzies dice game. Roll the dice until all 10 show the same value, and click individual dice to hold them between rolls.

## Features

- Roll 10 dice and keep selected dice locked in place
- Win state detection when all held dice match
- Confetti celebration on victory
- Quick restart with a new game button

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- `nanoid` for die IDs
- `react-confetti` and `react-use` for the win effect

## Getting Started

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal to play.

## Available Scripts

- `npm run dev` starts the development server
- `npm run build` creates a production build
- `npm run preview` previews the production build locally
- `npm run lint` runs ESLint

## Project Structure

```text
src/
  App.tsx      # game logic and layout
  Die.tsx      # individual die button
  index.css    # global styles and Tailwind setup
  main.tsx     # app entry point
```

## Notes

This project currently keeps game state in memory only. Refreshing the page starts a new game.
