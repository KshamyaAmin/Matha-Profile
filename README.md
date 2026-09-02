# Matha Digital Profile

A modern, dynamic digital profile for Matha designed to showcase skills, projects, and achievements with interactive elements.

## Features

-   **Responsive Design**: Built with React and Tailwind CSS for a seamless experience across all devices.
-   **ThreeJS Background**: Custom WebGL background (Snow/Stars) for a premium look.
-   **Dynamic Data**: Simple JSON data management (`data.json`) for easy updates.
-   **Tech Stack**: React, Vite, Tailwind CSS, Three.js.

## Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd Matha-Profiles
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run with One Click (Windows)**:
    Simply double-click `run.bat` (or `start.bat`) to launch both the FastAPI backend and Next.js frontend servers simultaneously and open the app in your browser.
    To stop all servers, double-click `stop.bat`.

4.  **Or Run Manually**:
    - Frontend:
      ```bash
      npm run dev
      ```
      Accessible at `http://localhost:3000`.
    - Backend:
      ```bash
      cd backend
      python -m uvicorn main:app --reload --port 8000
      ```
      Accessible at `http://localhost:8000`.

## Usage

To update your profile information, simply edit the `src/data.json` file.

```json
{
  "name": "Your Name",
  "position": "Your Position",
  "description": "About you...",
  "socials": {
    "linkedin": "...",
    "github": "...",
    "twitter": "...",
    "email": "..."
  },
  "skills": ["React", "Node", "CSS"],
  "projects": [
    {
      "name": "Project Name",
      "link": "...",
      "description": "..."
    }
  ]
}
```

## Building for Production

To create a production build:

```bash
npm run build
```

The output will be in the `dist/` folder.