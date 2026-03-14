import { useState } from 'react'
import { useFreighter } from './useFreighter'
import './index.css'

const CANDIDATES = [
  { id: 1, name: 'Proposal A: Increase Staking Rewards' },
  { id: 2, name: 'Proposal B: Fund Community Grants' },
  { id: 3, name: 'Proposal C: Reduce Transaction Fees' },
]

function App() {
  const { publicKey, isConnected, connectWallet, signTx } = useFreighter()
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [voteStatus, setVoteStatus] = useState(null)

  const handleVote = async () => {
    if (!selectedCandidate) return

    setVoteStatus('constructing')
    // Simulate transaction construction and signing for the mini-dApp
    // In a real dApp, we would build a Soroban or Stellar transaction here
    try {
      // Create a dummy XDR to pass to Freighter to sign (for demo purposes)
      // For real usage, you would use StellarSdk.TransactionBuilder
      setVoteStatus('signing')

      // Simulate network delay for demo
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Assume successful vote for demo
      setVoteStatus('success')
    } catch (e) {
      console.error(e)
      setVoteStatus('error')
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Stellar Voting DApp</h1>
        {!isConnected ? (
          <button className="connect-btn" onClick={connectWallet}>
            Connect Freighter
          </button>
        ) : (
          <div className="wallet-info">
            <span className="network-badge">TESTNET</span>
            <span className="address" title={typeof publicKey === 'string' ? publicKey : 'Connected'}>
              {typeof publicKey === 'string' && publicKey.length >= 10
                ? `${publicKey.substring(0, 6)}...${publicKey.substring(publicKey.length - 4)}`
                : 'Connected'}
            </span>
          </div>
        )}
      </header>

      <main className="main-content">
        <section className="voting-section">
          <h2>Active Proposals</h2>
          <p className="subtitle">Select a proposal to cast your vote on the Stellar network.</p>

          <div className="candidates-list">
            {CANDIDATES.map(candidate => (
              <div
                key={candidate.id}
                className={`candidate-card ${selectedCandidate === candidate.id ? 'selected' : ''}`}
                onClick={() => setSelectedCandidate(candidate.id)}
                data-testid={`candidate-${candidate.id}`}
              >
                <div className="candidate-info">
                  <h3>{candidate.name}</h3>
                </div>
                <div className="radio-circle">
                  {selectedCandidate === candidate.id && <div className="radio-inner" />}
                </div>
              </div>
            ))}
          </div>

          <button
            className="vote-btn"
            disabled={!selectedCandidate || !isConnected || voteStatus === 'signing'}
            onClick={handleVote}
          >
            {voteStatus === 'signing' ? 'Signing transaction...' :
              voteStatus === 'success' ? 'Vote Cast Successfully!' :
                !isConnected ? 'Connect Wallet to Vote' : 'Cast Vote'}
          </button>

          {voteStatus === 'success' && (
            <div className="success-message">
              Your vote for {CANDIDATES.find(c => c.id === selectedCandidate)?.name} has been recorded on the ledger!
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
