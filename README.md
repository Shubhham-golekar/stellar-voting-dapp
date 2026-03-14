# Stellar Voting DApp

A highly functional, beautifully designed minimum viable decentralized application (mini-dApp) built on the Stellar network.

## Features

- **Freighter Wallet Integration**: Connect and authenticate securely using the Freighter browser extension.
- **Vote on Proposals**: Interactive UI to select and vote on network proposals.
- **Transaction Signing**: Simulates transaction construction and signature requests via the Freighter extension.
- **Premium UI**: Designed with glassmorphism, fluid animations, and a responsive layout for a stunning first impression.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [Freighter Wallet Extension](https://www.freighter.app/)

## Installation

1. Clone or download the repository.
2. Navigate to the project folder:
   ```bash
   cd stellar-voting-dapp
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

Start the local development server:

```bash
npm run dev
```

Open your browser to `http://localhost:5173` to view the application.

## Testing

This project includes a comprehensive Vitest test suite that verifies the core requirements of the application.

To run the tests:

```bash
npm test
```

### Test Coverage
- Application rendering and candidate validation
- Freighter Wallet Connect functionality
- Interactive voting state rules (disabled when disconnected, enabled upon candidate selection)

## Development Stack

- **React + Vite**: Fast, modern frontend framework.
- **CSS**: Custom vanilla CSS with advanced styling.
- **@stellar/freighter-api**: For interacting with the Stellar user's wallet.
- **Vitest + React Testing Library**: For testing React components.
