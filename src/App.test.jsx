import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from './App'

// Mock the useFreighter hook manually instead of vi.mock string issue
const mockUseFreighter = vi.fn()

vi.mock('./useFreighter', () => ({
    useFreighter: () => mockUseFreighter()
}))

describe('Stellar Voting DApp', () => {

    it('renders the app title and candidates', () => {
        mockUseFreighter.mockReturnValue({
            publicKey: null,
            isConnected: false,
            connectWallet: vi.fn(),
            signTx: vi.fn()
        })

        render(<App />)

        expect(screen.getByText('Stellar Voting DApp')).toBeInTheDocument()
        expect(screen.getByText('Active Proposals')).toBeInTheDocument()
        // Should render all 3 proposals
        expect(screen.getByText('Proposal A: Increase Staking Rewards')).toBeInTheDocument()
        expect(screen.getByText('Proposal B: Fund Community Grants')).toBeInTheDocument()
        expect(screen.getByText('Proposal C: Reduce Transaction Fees')).toBeInTheDocument()
    })

    it('displays Connect Freighter button initially and calls connect on click', () => {
        const connectWalletMock = vi.fn()
        mockUseFreighter.mockReturnValue({
            publicKey: null,
            isConnected: false,
            connectWallet: connectWalletMock,
            signTx: vi.fn()
        })

        render(<App />)

        const connectBtn = screen.getByText('Connect Freighter')
        expect(connectBtn).toBeInTheDocument()

        fireEvent.click(connectBtn)
        expect(connectWalletMock).toHaveBeenCalled()
    })

    it('enables vote button when wallet is connected and a candidate is selected', () => {
        mockUseFreighter.mockReturnValue({
            publicKey: 'GA2C...7F23',
            isConnected: true,
            connectWallet: vi.fn(),
            signTx: vi.fn()
        })

        render(<App />)

        const voteBtn = screen.getByText('Cast Vote')
        // Initially connected, but no candidate selected - should be disabled
        expect(voteBtn).toBeDisabled()

        // Select the first candidate (Proposal A with id 1)
        const candidateA = screen.getByTestId('candidate-1')
        fireEvent.click(candidateA)

        // Now it should be enabled
        expect(voteBtn).not.toBeDisabled()
    })

})
