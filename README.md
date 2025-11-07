# StarFolk Wiki

## Project Structure

- `frontend/` - Lit web components application
- `backend/` - FastAPI application with SQLite database
- `docker-compose.yml` - Orchestrates both services

## Quick Start with Docker

### Step 1: Start the Project

Open your terminal and run:

```bash
docker-compose up
```

### Step 2: Open Your Browser

Once everything is running, open:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

### Step 3: Test the Application

1. **Search for characters**: Type a name in the search bar (e.g., "Luke", "Leia", "Vader")
2. **View character details**: Click on any character from the search results
3. **Browse featured characters**: Check the sidebar for quick access to popular characters
4. **Navigate**: Use the logo to go back to the homepage

## Why Docker?

I decided to use Docker because I don't have Python installed locally on my machine. In such cases, I prefer to solve this via Docker to avoid installation issues and dependency conflicts. Docker allows the project to run in an isolated container with all dependencies pre-configured, making setup much simpler and more reliable.

## Features

- **Search Bar**: Search for Star Wars characters by name
- **Character List**: Display matching characters with name and birth year
- **Character Profile**: View detailed character information
- **Featured Characters**: Quick access to popular characters

## Architecture Decisions

### Note on Typography

I have a feeling that the font provided in the instructions (Inter from rsms.me/inter CDN) might be different from the font used in the Figma design, so there could be a mismatch in style. I followed the instructions to use the Inter font from the CDN, but if there are visual differences, this is likely the reason.

### 1. CSS Reset (`reset.css.ts`)

**Why I use it:**

- Different browsers have different default styles (margins, paddings, font sizes)
- The reset file makes all browsers start with the same base styles
- This ensures our design looks consistent across Chrome, Firefox, Safari, and Edge
- Applied to all components through `BaseElement`, so every component gets clean, predictable styling

### 2. Custom Event Types (`events.ts`)

**Why I use it:**

- Components need to communicate with each other (e.g., when a character loads, notify other components)
- TypeScript needs to know what data these events contain
- This file tells TypeScript: "When you see a 'character-loaded' event, it will have a character object in it"
- Without this, we'd have to use unsafe type casting (`as unknown as EventListener`), which can cause bugs
- Makes the code safer and easier to understand

### 3. Custom Page Routing

**Why I built my own router:**

- Since this is one of my first introductions with Lit, I decided not to go deep into libraries and external routing solutions
- I created a simple routing solution just to manage a couple of things:
  - URL changes (e.g., `/character/1`, `/search?q=luke`)
  - Browser back/forward buttons
  - Updating the page content based on the URL
- It's small, fast, and does exactly what I need - nothing more, nothing less
- This approach helped me understand how routing works under the hood while keeping the codebase simple
