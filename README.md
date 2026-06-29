# E-commerce Frontend

A modern React + Vite frontend for an e-commerce application.

This project is a complete storefront UI with product browsing, cart management, wishlist, orders, authentication, checkout, Stripe payment, and review functionality.

## Key Features

- Product listing and product detail pages
- Shopping cart and checkout flow
- User authentication with login/register and protected routes
- Wishlist / favorites page
- Order history, order detail, and order status pages
- Stripe payment integration using `@stripe/react-stripe-js`
- Review submission and star ratings
- Toast notifications via `react-toastify` and `react-hot-toast`
- Tailwind CSS styling and responsive UI
- Axios interceptors with access token and refresh token handling

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Stripe JS
- React Hook Form
- React Toastify
- React Icons

## Getting Started

### Requirements

- Node.js 18+ (or compatible)
- npm
- Backend API running and accessible at `http://localhost:9191`

### Install

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root and add your Stripe publishable key:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Run Locally

```bash
npm run dev
```

Open the local development URL shown by Vite in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

- `src/App.jsx` - Main route and layout configuration
- `src/main.jsx` - App bootstrap, router, and auth provider
- `src/pages/` - Screen views for products, cart, checkout, login, register, profile, orders, and payment
- `src/components/` - Shared UI components such as `Navbar`, `ProductCard`, `Loader`, and reviews
- `src/context/` - Authentication state and hooks
- `src/api/` - Axios setup, auth API, product API, cart API, favorite API, order service, and review service
- `src/stripe.js` - Stripe client initialization using environment variables

## Backend Integration

This repository is frontend-only. It expects a backend API at:

- `http://localhost:9191`

Authentication and API requests use Axios with:

- `Authorization: Bearer <token>` header
- Refresh token flow at `/auth-api/refresh-token`

User tokens are stored in browser `localStorage`.

## Notes

- Add your own backend implementation or connect to an existing API to use the full app.
- Make sure Stripe keys are configured in `.env` before using the payment flow.
- The app uses protected routes for user-specific pages like cart, orders, wishlist, profile, and checkout.

## Useful Scripts

- `npm run dev` - start development server
- `npm run build` - build production assets
- `npm run preview` - preview production build
- `npm run lint` - run ESLint checks
