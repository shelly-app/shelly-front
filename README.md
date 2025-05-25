# Shelly Front

A modern React application front-end for the Shelly project.

## 🚀 Technologies

- **React 19** - Latest React version with modern features
- **TypeScript** - Type safety for your JavaScript code
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **React Query** - Data fetching and state management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Zod** - Schema validation
- **React Hook Form** - Form handling
- **JWT Authentication** - Secure user authentication

## 📋 Prerequisites

- Node.js (v18 or newer)
- pnpm package manager

## 🔧 Installation

1. Clone the repository

   ```bash
   git clone git@github.com:shelly-app/shelly-front.git
   cd shelly-front
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```
3. Create a `.env` file in the root directory and add your environment variables. You can use the `.env.example` file as a reference.
   ```bash
   cp .env.example .env
   ```

## 🏗️ Development

1. Start the development server
   ```bash
   pnpm dev
   ```
2. Open your browser and navigate to `http://localhost:5173` to view the application.

# 📦 Build

1. Build the application for production
   ```bash
   pnpm build
   ```
2. The production build will be generated in the `dist` directory.
3. You can preview the production build locally using:
   ```bash
   pnpm preview
   ```

# 💅 Code Quality

- Lint Code:

```bash
pnpm lint
```

- Type check:

```bash
pnpm check-types
```

- Format Code:

```bash
pnpm prettier
```

# 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

Codebase structure and standards based on [bulletproof-react](https://github.com/alan2207/bulletproof-react/tree/master).
