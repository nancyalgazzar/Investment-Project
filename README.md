# InvestmentProject

A full-featured investment web application built with Angular that democratizes investing by allowing anyone — regardless of budget — to own fractional shares in real estate, gold, stocks... No need for large capital. Invest with small amounts and grow your wealth while protecting it from inflation.
## overview
Investment is an Angular-based fractional investment platform built to solve a real problem: inflation erodes savings, but traditional investing requires large capital most people don't have.

Our solution: break down high-value assets — real estate properties, gold, stocks... — into affordable fractional shares. Users can invest with small amounts of money, own a piece of something tangible, earn returns, and protect their savings from inflation over time.

Whether you have $10 or $10,000, Investment gives you access to investment opportunities that were previously out of reach.
##  Features

Users can register, sign in, and access a personal dashboard showing their net balance, a doughnut chart of profit distribution, and a list of held assets. They can browse and invest in projects, add funds to their balance, and filter projects by category, name, or description.
Admins can add and manage investment projects across asset categories
AI Assistant — a built-in chatbot that answers questions about specific projects or general investment concepts, helping first-time investors make informed decisions.

## Tech Stack

- Angular 21
- TypeScript
- Bootstrap 5
- Angular Material
- ng2-charts / Chart.js
- json-server
- Express + OpenRouter API for chatbot
- ngx-paypal

## Prerequisites

- Node.js 18+ and npm 10+
- An OpenRouter API key if you want to run the chatbot

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file with your OpenRouter API key:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

## Running the App

Start the mock backend server:

```bash
npm run server
```

Start the Angular application:

```bash
npm run app
```

Optionally start the AI chatbot backend server:

```bash
npm run chatbot
```
## Project Structure

- `src/app/Components` - UI components such as chatbot, project cards, sidebar, and more
- `src/app/Pages` - Route pages such as dashboard, home, login, signup, and details
- `src/app/Services` - Application services for API calls, authentication, payments, and notifications
- `server` - Express server for AI chatbot integration
- `db.json` - Mock backend data used by `json-server`

## Notes

- Make sure `OPENROUTER_API_KEY` is set before using the chatbot feature.
- The project uses route guards to protect user and admin sections.
- `json-server` provides a simple mock API and can be extended by editing `db.json`.


## Team
A wonderful and cooperative team who built this together.
- [Fatma haggag](https://github.com/FatmaHaggag)
- [Carol maged](https://github.com/Carol-Maged)
- [Omar Madbouly](https://github.com/OmarMadbouly0)
- [gamal Eldin](https://github.com/gamaleldin11)
- [Ahmed Mosad](https://github.com/AhmedMosad0)
