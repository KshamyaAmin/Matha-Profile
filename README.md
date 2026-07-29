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

3.  **Run the development server**:
    ```bash
    npm run dev
    ```
    The profile will be accessible at `http://localhost:5173`.

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