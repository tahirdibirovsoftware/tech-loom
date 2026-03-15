# TechLoom — Learning Project

TechLoom (a.k.a. `tech-store`) is a compact React + TypeScript learning project intended for students to experiment with fetching and handling both JSON and HTML form-data (multipart/form-data) responses.

This repository demonstrates robust response handling, a modern UI, and small client-side utilities for parsing different content types.

## Purpose

- Teach how to detect `Content-Type` and parse responses appropriately (`res.json()`, `res.formData()`, or `res.text()`).
- Provide a friendly UI (product grid, search, header/banner/footer) for quickly inspecting fetched data.
- Serve as a hands-on exercise for students to run a mock server and observe how the client adapts to JSON vs. form-data responses.

## Features

- Product grid with uniform cards and responsive wrapping
- Inline SVG brand logo and hero banner
- Search/filter UI for product names/descriptions
- Fetch parsing logic that supports `application/json`, `multipart/form-data`, and sensible fallbacks

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open the app in your browser (Vite will show the URL, typically `http://localhost:5173` or `http://localhost:5174`).

## Where the code lives

- `src/ProductList.tsx` — fetch parsing (JSON, FormData, text) and the product list UI + search
- `src/App.tsx` — site header, hero banner, and footer
- `src/App.css`, `src/index.css` — visual styles and theming

## Testing with a local JSON endpoint

If you prefer to test locally instead of the default remote endpoint, run a tiny JSON server. Create `server-json.js`:

```js
// server-json.js
const express = require('express')
const app = express()
app.get('/items', (req, res) => {
  res.json([
    { id: 1, name: 'Laptop', description: 'Powerful laptop for development', price: 999.99 },
    { id: 2, name: 'Mouse', description: 'Wireless ergonomic mouse', price: 49.99 }
  ])
})
app.listen(3000, () => console.log('JSON mock server running on http://localhost:3000'))
```

Run with `node server-json.js` and update the fetch URL in `src/ProductList.tsx` to `http://localhost:3000/items`.

## Testing with a multipart/form-data response

Returning `multipart/form-data` from an API response is uncommon, but the project demonstrates client-side handling. Here's a minimal Express example that returns a multipart body with a single field `items` (whose value is a JSON string):

```js
// server-form.js
const express = require('express')
const app = express()
app.get('/items-form', (req, res) => {
  const boundary = 'MY_BOUNDARY_12345'
  res.set('Content-Type', 'multipart/form-data; boundary=' + boundary)

  const payload = JSON.stringify([
    { id: 1, name: 'Laptop', description: 'Powerful laptop', price: 999.99 }
  ])

  const body = `--${boundary}\r\nContent-Disposition: form-data; name="items"\r\n\r\n${payload}\r\n--${boundary}--\r\n`
  res.send(body)
})
app.listen(3001, () => console.log('FormData mock server running on http://localhost:3001'))
```

Run with `node server-form.js` and update the fetch URL to `http://localhost:3001/items-form`. The client will call `res.formData()` and the code converts the FormData into a plain JS object (so you can parse the `items` field if it contains JSON).

## Notes for students

- Prefer returning `application/json` for API responses in production. The multipart example exists for learning and edge-case handling.
- Experiment by changing the endpoint and observing how the UI updates.
- Try adding product links, pagination, or persistent state (localStorage) as exercises.

## License

This repository is intended for educational use. Adapt and reuse as needed for workshops or assignments.

# tech-loom
