# API

## Stack

- [Next.js](https://nextjs.org/) - A React framework with hybrid static & server rendering, and route pre-fetching, etc.
- [Styled-Components](https://styled-components.com/) - A CSS-in-JS styling library for React
- [Express](https://www.expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js

## Project structure

```
    Client (Next.js)
    │
    │   # Page files
    ├── pages
    │   # React component files
    ├── components
    │   # Global and theme style files
    ├── styles
    │   # Utility functions
    ├── utils
    │   # Static files
    └── public

    Server (Node.js)
    │
    ├── server.ts
    │
    ├── middleware
    │   └── validateKey.ts
    │
    └── utils
        └── generateApiKey.ts
```
