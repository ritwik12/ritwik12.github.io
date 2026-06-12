# [ritwik12.github.io](https://ritwik12.github.io)

My personal portfolio website — a single-page site introducing me, my work, my projects, blog, and resume.

🔗 **Live:** https://ritwik12.github.io

## About

I'm Ritwik Sharma, a Software Engineer on the Infrastructure team at LinkedIn, working on
distributed systems, developer tooling, and notification platforms.

## Sections

- **About** — who I am and what I work on
- **Blog** — embedded view of [my blog](https://ritwik12.github.io/Blog/)
- **Projects** — LinkedIn work and open-source / personal projects
- **Resume** — viewable and downloadable PDF
- **Contact** — how to reach me

## Tech

- Static HTML / CSS / JavaScript (jQuery), hosted on **GitHub Pages**
- Based on the [MyResume](https://bootstrapmade.com/free-html-bootstrap-template-my-resume/) Bootstrap template
- [AOS](https://michalsnik.github.io/aos/) for scroll animations and [Typed.js](https://github.com/mattboldt/typed.js/) for the hero text
- A [p5.js](https://p5js.org/) flocking-boids animation on the hero canvas

## Local development

It's a static site — no build step. Just open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Project structure

```
index.html            # the whole page
assets/
  css/style.css       # site styles
  js/main.js          # nav, smooth scroll, hero typing, AOS init
  canvas/flock.js     # p5.js boids animation
  img/                # images (optimized)
  Ritwik_Resume.pdf   # resume
  vendor/             # third-party libraries
```
