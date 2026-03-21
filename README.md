<div align="center">

<img src="https://img.shields.io/badge/Stellar-Testnet-blue?style=for-the-badge&logo=stellar&logoColor=white" alt="Stellar Testnet" />
<img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
<img src="https://img.shields.io/badge/Freighter-Wallet-purple?style=for-the-badge" alt="Freighter" />
<img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License" />

# 🗳️ Stellar Voting dApp

**A decentralized governance voting application built on the Stellar Testnet**

Cast on-chain votes, connect your Freighter wallet, and participate in transparent governance — all in a clean, minimal React interface.

---

</div>

## 🌐 Overview

The **Stellar Voting dApp** is a lightweight decentralized application that enables on-chain governance voting using the [Stellar Testnet](https://stellar.org). Users connect their Freighter wallet to view active proposals and cast verifiable votes — one wallet, one vote — with every transaction permanently recorded on-chain.

> ⚠️ **This project runs on Stellar Testnet only.** No real XLM is used or required.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔗 Wallet Connect | Connect via Freighter browser extension |
| 📋 Proposals | Create and browse governance proposals |
| 🗳️ Voting | Cast on-chain votes with one vote per wallet |
| 🔒 Vote Integrity | Duplicate votes are prevented at the contract level |
| 📡 On-Chain Records | All votes are recorded on the Stellar Testnet |
| 💅 Clean UI | Minimal and responsive React interface |

---

## 📜 Smart Contract

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

---

## 🛠 Tech Stack

- **Smart Contract** — [Soroban (Rust)](https://soroban.stellar.org/) on-chain voting contract
- **Frontend** — [React.js](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Blockchain** — [Stellar SDK](https://stellar.github.io/js-stellar-sdk/)
- **Wallet** — [Freighter Wallet API](https://www.freighter.app/)
- **Styling** — HTML & CSS
- **Testing** — Vitest + React Testing Library
- **Language** — JavaScript (ES6+), Rust

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v16+
- [Rust](https://www.rust-lang.org/tools/install) (for building the smart contract)
- [Soroban CLI](https://soroban.stellar.org/docs/getting-started/setup) (for deploying the contract)
- [Freighter Wallet](https://www.freighter.app/) browser extension
- A funded Stellar **Testnet** account

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/Shubhham-golekar/stellar-voting-dapp.git
cd stellar-voting-dapp

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔗 Wallet Setup

> Make sure your Freighter wallet is set to **TESTNET** before interacting with the dApp.

1. Install the [Freighter Wallet](https://www.freighter.app/) browser extension
2. Create or import a wallet
3. Switch the network to **Testnet** from Freighter settings
4. Fund your wallet using the Stellar Testnet Faucet:
```
https://laboratory.stellar.org/#account-creator
```

---

## 🧪 Testing

The project includes test cases to verify core voting functionality.
```bash
npm test
```

> 📸 *Test results screenshot below*

![image alt](https://github.com/Shubhham-golekar/stellar-voting-dapp/blob/717571972476814d0775f6b070b1524b4d480d28/test.jpeg)

---

## 📂 Project Structure
```
stellar-voting-dapp/
│
├── contracts/
│   └── voting/
│       ├── Cargo.toml       # Soroban contract config
│       └── src/
│           └── lib.rs       # Voting smart contract
│
├── public/
│
├── src/
│   ├── App.jsx          # Root component & routing
│   ├── useFreighter.js  # Custom hook for Freighter wallet
│   ├── App.test.jsx     # Test suite
│   ├── index.css        # Styles
│   └── main.jsx         # App entry point
│
├── package.json
└── README.md
```

## 🎥 Demo

Watch the full walkthrough of the dApp in action:

👉 **[Watch on Loom](https://www.loom.com/share/bb83b9a7a88b4eb8a2706fb4177fbacd)**


## 🔗 Live Deploy 

👉 **[Voting-DApp](stellar-voting-dapp-pc69.vercel.app)**


---

## ⚠️ Notes

- This dApp is built for **educational purposes** using the Stellar Testnet.
- **Do not** use real XLM or switch to Mainnet with this code without a thorough security audit.
- Ensure Freighter is set to **TESTNET** before connecting — transactions on Mainnet are irreversible.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👨‍💻 Author

**Shubham Golekar**

> Mini dApp developed as part of a blockchain learning project on the Stellar network.

---

<div align="center">

⭐ **If you found this project useful, consider giving it a star!** ⭐

</div>
