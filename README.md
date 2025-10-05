
# Tailwind Personal Website (3 Pages)

A simple, accessible personal website built with **Tailwind CSS** using the Play CDN. It includes three pages:
- `index.html` (Home)
- `about.html` (About)
- `projects.html` (Projects)

## Quick Start

1. Download and unzip the project.
2. Open `index.html` in your browser.
3. Edit content directly in the HTML files (search for placeholders like "Your Name").

> Tailwind is loaded via the Play CDN, so there's no build step required.

## Customization

- **Brand color**: Update the `brand` palette in the inline `tailwind.config` within the `<head>`.
- **Navigation**: Edit the `nav` block to add links or change titles.
- **Cards/content**: Duplicate the example project cards and update text/links.
- **Accessibility**: Active nav link uses `aria-current="page"`. Inputs and landmarks include labels/roles.

## Deployment

- **GitHub Pages**: Push to a repo and enable Pages (root).  
- **Netlify/Vercel**: Drag & drop or link your repo.  
- **Static hosting**: Any static file server works (no server code needed).

## Optional: Local Dev Server

Use a simple Python server from the project folder:

```bash
python3 -m http.server 5173
```
Open `http://localhost:5173`.

## Folder Structure

```
tailwind-personal-site/
├── index.html
├── about.html
├── projects.html
└── README.md
```

## License

MIT — do whatever you want, just don't hold me liable.
