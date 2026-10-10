<div align="center">

# 🍕 A Slice of Pi

### A clear view of pizza sales, revenue, stores, and customer sentiment.

Built with React, TypeScript, Vite, Tailwind CSS, Recharts, and React DatePicker.

![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Recharts](https://img.shields.io/badge/Charts-Recharts-8884d8)

</div>

---

## ✨ Dashboard highlights

| Visualization                     | What it shows                                                                |
| --------------------------------- | ---------------------------------------------------------------------------- |
| **Monthly Revenue**               | Monthly revenue trend, with a lightly shaded area under the line.            |
| **Store Performance**             | Order counts per store, filterable by pizza type and size.                   |
| **Pizza Sales by Store and Size** | A grouped bar chart comparing small, medium, and large pizzas at each store. |
| **Review Sentiment**              | The distribution of customer review sentiment.                               |
| **Total Revenue 2023**            | Revenue across all 2023 orders.                                              |

Use the date range control to filter the charts. Dates are limited to 2023,
displayed in `yyyy-MM-dd` format, and the start and end dates are inclusive.
Pizza type and size filters apply only to **Store Performance**. The total
revenue card always reflects all 2023 orders.

> Pizza items do not have individual dates, so date filtering uses the date of
> the order containing each item. Reviews are filtered by their own dates.

## 🚀 Get started

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

## 🧰 Commands

| Command           | Purpose                                                |
| ----------------- | ------------------------------------------------------ |
| `npm run dev`     | Start the local development server.                    |
| `npm run build`   | Type-check and create the production build in `dist/`. |
| `npm run preview` | Preview the production build locally.                  |
| `npm run lint`    | Run ESLint.                                            |

## 🗂️ Project layout

```text
src/
├── common/                 Shared interface components
├── components/
│   ├── charts/             Revenue, store, and sentiment charts
│   ├── filters/            Date and pizza filters
│   └── kpi/                Revenue summary card
├── constants/              Shared chart colors
├── data/                   Order, review, and pricing JSON
├── utils/                  Filtering and calculation helpers
├── App.tsx                 Dashboard state and layout
└── index.css               Global styles and motion preferences
```

Dashboard data lives in `src/data/`. Update the JSON there to change the sample
orders, reviews, or pizza prices.

## ♿ Accessibility and responsive design

- Date pickers have associated labels and format instructions for assistive
  technology. The calendar supports keyboard navigation, including arrow keys
  to move between dates, Enter to select a date, and Escape to close it.
- Date picker navigation controls have accessible names localized in English
  and French.
- The chart area can be scrolled independently from the filters and KPI.
- The chart entrance fade respects the system's reduced-motion preference.
- Layouts adapt to smaller screens.

## 🛠️ Built with

React 19 · TypeScript · Vite · Tailwind CSS 4 · Recharts · React DatePicker ·
date-fns
