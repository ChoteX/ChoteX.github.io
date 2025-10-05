# Personal Website - Dachi Tchotashvili

A 3-page personal portfolio built with the Tailwind CSS CDN. 

## Access
- Page is available as a public GitHub page: https://chotex.github.io/index.html

## Overview
The site is organized around three static HTML pages (`index.html`, `about.html`, `projects.html`) and provides a brief academic/work journey of myself. Viewers will get an understanding of my skills and work interests as well as hobbies. The About page provides my academic history, detailed work experience, and notable awards. The Projects page features my completed works with imagery and tech tags so visitors can filter relevance at a glance.

## Site Map
- `index.html` — Introduction, featured project call-to-action, and global navigation.
  - Primary navigation (sticky header) routes to all pages and uses `aria-current` for accessibility.
- `about.html` — Education timeline, experience cards, and achievement timeline.
  - Sections: Education, Experience, Achievements; each uses consistent card layouts.
- `projects.html` — Grid of project summaries and tags.
  - Includes client-side search to filter the grid in real time.
- Global footer — Present on all pages with dynamic year and credits; links to Tailwind CSS, MBZUAI, and Komarovi STEM School resources.

## Design Notes
- **Layout:** Tailwind utility classes enable quick iteration; responsive grid/stack transitions ensure readability on mobile and desktop.
- **Color & Typography:** Custom `brand` palette (blue gradient) makes the color palette consistent and matches the MBZUAI logo palette. A gray background was selected for a professional look. The education, experience, and achievements sections have different color splashes for contrast.
- **Interaction:** Sticky navigation, hover states, and accessible focus rings keep navigation obvious while keeping the website lightweight.

## Screenshots
- ## Home page
  ![Home](screenshots/scr1.png)
- ## Education timeline (about page)
  ![About education timeline](screenshots/scr2.png)
- ## Experience cards (about page)
  ![Experience cards](screenshots/scr3.png)
- ## Achievements (about page)
  ![Achievements](screenshots/scr4.png)
- ## Projects grid with search (projects page)
  ![Projects grid with search](screenshots/scr5.png)

## Credits
- Tailwind CSS Play CDN configuration
- MBZUAI logo
- Komarovi STEM School logo
- World Robot Olympiad logo
- IPhO 2023 logo 
- IYPT logo
- Georgian Robotics Association logo
- IOAA logo

## Bonus Work

- line - `<meta name="viewport" content="width=device-width, initial-scale=1">`
makes the website adjust its contents depending on the viewing resolution

- Created a public GitHub page
