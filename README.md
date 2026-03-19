# Stellar Voting DApp

A highly functional, beautifully designed minimum viable decentralized application (mini-dApp) built on the Stellar network.

## Features

- **Freighter Wallet Integration**: Connect and authenticate securely using the Freighter browser extension.
- **Vote on Proposals**: Interactive UI to select and vote on network proposals.
- **Transaction Signing**: Simulates transaction construction and signature requests via the Freighter extension.
- **Premium UI**: Designed with glassmorphism, fluid animations, and a responsive layout for a stunning first impression.

## Smart Contract

The voting logic is implemented as a **Soroban smart contract** in Rust, located at `contracts/voting/`.

### Contract Functions

| Function | Description |
|----------|-------------|
| `initialize(admin, candidates)` | Admin sets up candidate IDs (one-time) |
| `vote(voter, candidate_id)` | Cast a vote (one vote per address) |
| `get_votes(candidate_id)` | Get vote count for a candidate |
| `get_candidates()` | List all candidate IDs |
| `has_voted(voter)` | Check if an address already voted |

### Build the Contract

```bash
cd contracts/voting
cargo build --target wasm32-unknown-unknown --release
```

### Deploy to Testnet

```bash
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/voting_contract.wasm \
  --source <YOUR_SECRET_KEY> \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase "Test SDF Network ; September 2015"
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [Rust](https://www.rust-lang.org/tools/install) (for building the smart contract)
- [Soroban CLI](https://soroban.stellar.org/docs/getting-started/setup) (for deploying the contract)
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

- **Soroban (Rust)**: On-chain voting smart contract on Stellar.
- **React + Vite**: Fast, modern frontend framework.
- **CSS**: Custom vanilla CSS with advanced styling.
- **@stellar/freighter-api**: For interacting with the Stellar user's wallet.
- **Vitest + React Testing Library**: For testing React components.
