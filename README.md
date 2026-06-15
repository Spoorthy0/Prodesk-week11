# ProDesk Blog - Frontend

A React + Vite frontend for a simple blog platform. Users can create, view, edit, and delete posts, with image support and a dark mode toggle.

## Features

- View all posts in a responsive card grid
- Top 3 most recent posts highlighted at the top
- Create posts with a title, content, and optional image upload
- Edit posts via a modal
- Delete posts with a confirmation step
- Dark / light mode toggle
- Toast notifications for all actions

## Tech Stack

- **React 18** with Vite
- **Tailwind CSS** for styling
- **REST API** via Fetch (`src/api.js`)

## Getting Started

```bash
npm install
npm run dev
```

The app runs on `http://localhost:5173` by default.

## Environment Variables

Create a `.env` file in this directory to point at a custom backend:

```env
REACT_APP_BASE_URL=https://your-backend.onrender.com
```

If omitted, it defaults to `https://prodesk-week10.onrender.com`.

## Backend

The backend repo lives in `../week10/`. It is an Express + MongoDB API that must be running (locally on port 5000, or deployed) for the frontend to work.

## Live Demo

Frontend: [https://prodesk-week11-five.vercel.app](https://prodesk-week11-five.vercel.app)
