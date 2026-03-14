import { useState } from 'react'
import { useFreighter } from './useFreighter'
import * as StellarSdk from '@stellar/stellar-sdk'
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
    if (!selectedCandidate || typeof publicKey !== 'string') return

    setVoteStatus('constructing')
    try {
      const candidateInfo = CANDIDATES.find(c => c.id === selectedCandidate);

      // Use a dummy account sequence to construct the XDR just to prompt the wallet
      const dummyAccount = new StellarSdk.Account(publicKey, "0");

      const transaction = new StellarSdk.TransactionBuilder(dummyAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
        .addOperation(StellarSdk.Operation.payment({
          destination: publicKey, // send to self
          asset: StellarSdk.Asset.native(),
          amount: "0.0000001",
        }))
        .addMemo(StellarSdk.Memo.text(`Vote: ${candidateInfo.id}`))
        .setTimeout(30)
        .build();

      const xdr = transaction.toXDR();
      setVoteStatus('signing')

      const signedTransactionResponse = await signTx(xdr, 'TESTNET');

      if (!signedTransactionResponse || signedTransactionResponse.error) {
        setVoteStatus('error');
        return;
      }

      setVoteStatus('success')
    } catch (e) {
      console.error('Error constructing or signing transaction:', e)
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
