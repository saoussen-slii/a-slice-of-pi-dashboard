# A Slice of Pi Dashboard

A responsive pizza-sales dashboard built with React, TypeScript, Vite, Tailwind
CSS, and Recharts. It presents order, revenue, store, and customer-review data
for 2026.

## Features

- Filter dashboard charts by an inclusive start and end date.
- View total revenue for 2026. This KPI is intentionally independent of the
  date and pizza filters.
- Explore monthly revenue in an area chart.
- View order counts by store, with pizza type and size filters.
- Compare pizza sales by store and pizza size in a grouped bar chart.
- Explore review sentiment distribution in a pie chart.
- Scroll through the chart area independently from the date filter and revenue
  KPI.
- Responsive layouts, keyboard-accessible filter controls, and reduced-motion
  support for the charts' entrance fade.

## Requirements

- Node.js compatible with the installed Vite version
- npm

## Getting started

Install dependencies and start the development server:

```sh
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

## Available scripts

| Command           | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Start the Vite development server.                   |
| `npm run build`   | Type-check and create a production build in `dist/`. |
| `npm run preview` | Serve the production build locally.                  |
| `npm run lint`    | Run ESLint.                                          |

## Data and filtering

Dashboard data is stored as JSON in `src/data/`:

- `order_data.json` contains orders, including their dates and pizza items.
- `review_data.json` contains dated customer reviews and sentiment.
- `pricing_data.json` maps pizza types and sizes to prices.

The date filter in `App.tsx` applies to orders and reviews passed to the charts.
Since pizza items do not have individual dates, each item's date is the date of
its containing order. The start and end dates are inclusive. The total revenue
card continues to show revenue for all 2026 orders, regardless of the selected
date range.

The pizza type and size filters apply only to the Store Performance chart.

## Project structure

```text
src/
  common/       Shared UI components such as ChartCard
  components/
    charts/     Recharts visualizations
    filters/    Date and pizza filter controls
    kpi/        Dashboard KPI cards
  constants/    Shared chart colors
  data/         JSON data and exports
  utils/        Date filtering, revenue calculations, and frequency counts
  App.tsx       Dashboard state, layout, and chart data flow
  index.css     Global styles, typography, and motion preferences
```

## Technology

- React 19 and TypeScript
- Vite
- Tailwind CSS 4
- Recharts
