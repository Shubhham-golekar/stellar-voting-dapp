#![no_std]

use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Env, Symbol, Vec};

// ── Storage keys ───────────────────────────────────────────────

const ADMIN: Symbol = symbol_short!("ADMIN");
const CANDS: Symbol = symbol_short!("CANDS");

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Votes(u32),
    Voted(Address),
}

// ── Contract ───────────────────────────────────────────────────

#[contract]
pub struct VotingContract;

#[contractimpl]
impl VotingContract {
    /// Initialize the contract with an admin and a list of candidate IDs.
    /// Can only be called once.
    pub fn initialize(env: Env, admin: Address, candidates: Vec<u32>) {
        // Prevent re-initialization
        if env.storage().instance().has(&ADMIN) {
            panic!("already initialized");
        }

        admin.require_auth();

        env.storage().instance().set(&ADMIN, &admin);
        env.storage().instance().set(&CANDS, &candidates);

        // Initialize vote counts to zero
        for id in candidates.iter() {
            env.storage().persistent().set(&DataKey::Votes(id), &0u32);
        }
    }

    /// Cast a vote for a candidate. Each address may only vote once.
    pub fn vote(env: Env, voter: Address, candidate_id: u32) {
        voter.require_auth();

        // Must be initialized
        if !env.storage().instance().has(&ADMIN) {
            panic!("not initialized");
        }

        // Check voter hasn't already voted
        let voted_key = DataKey::Voted(voter.clone());
        if env.storage().persistent().has(&voted_key) {
            panic!("already voted");
        }

        // Validate candidate
        let candidates: Vec<u32> = env.storage().instance().get(&CANDS).unwrap();
        let mut valid = false;
        for id in candidates.iter() {
            if id == candidate_id {
                valid = true;
            }
        }
        if !valid {
            panic!("invalid candidate");
        }

        // Increment vote count
        let votes_key = DataKey::Votes(candidate_id);
        let current: u32 = env.storage().persistent().get(&votes_key).unwrap_or(0);
        env.storage().persistent().set(&votes_key, &(current + 1));

        // Mark voter as having voted
        env.storage().persistent().set(&voted_key, &true);
    }

    /// Get the vote count for a specific candidate.
    pub fn get_votes(env: Env, candidate_id: u32) -> u32 {
        env.storage()
            .persistent()
            .get(&DataKey::Votes(candidate_id))
            .unwrap_or(0)
    }

    /// Get the list of all candidate IDs.
    pub fn get_candidates(env: Env) -> Vec<u32> {
        env.storage()
            .instance()
            .get(&CANDS)
            .unwrap_or(Vec::new(&env))
    }

    /// Check if an address has already voted.
    pub fn has_voted(env: Env, voter: Address) -> bool {
        env.storage()
            .persistent()
            .has(&DataKey::Voted(voter))
    }
}

// ── Tests ──────────────────────────────────────────────────────

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::testutils::Address as _;
    use soroban_sdk::Env;

    fn setup_contract() -> (Env, VotingContractClient<'static>, Address) {
        let env = Env::default();
        env.mock_all_auths();

        let contract_id = env.register_contract(None, VotingContract);
        let client = VotingContractClient::new(&env, &contract_id);

        let admin = Address::generate(&env);
        let candidates = Vec::from_array(&env, [1u32, 2u32, 3u32]);
        client.initialize(&admin, &candidates);

        (env, client, admin)
    }

    #[test]
    fn test_initialize_and_get_candidates() {
        let (_env, client, _admin) = setup_contract();

        let candidates = client.get_candidates();
        assert_eq!(candidates.len(), 3);
    }

    #[test]
    fn test_vote_and_get_votes() {
        let (env, client, _admin) = setup_contract();

        let voter = Address::generate(&env);
        client.vote(&voter, &1u32);

        assert_eq!(client.get_votes(&1u32), 1);
        assert_eq!(client.get_votes(&2u32), 0);
        assert!(client.has_voted(&voter));
    }

    #[test]
    #[should_panic(expected = "already voted")]
    fn test_double_vote_panics() {
        let (env, client, _admin) = setup_contract();

        let voter = Address::generate(&env);
        client.vote(&voter, &1u32);
        client.vote(&voter, &2u32); // should panic
    }

    #[test]
    #[should_panic(expected = "invalid candidate")]
    fn test_invalid_candidate_panics() {
        let (env, client, _admin) = setup_contract();

        let voter = Address::generate(&env);
        client.vote(&voter, &99u32); // candidate 99 does not exist
    }

    #[test]
    fn test_multiple_voters() {
        let (env, client, _admin) = setup_contract();

        let voter1 = Address::generate(&env);
        let voter2 = Address::generate(&env);
        let voter3 = Address::generate(&env);

        client.vote(&voter1, &1u32);
        client.vote(&voter2, &1u32);
        client.vote(&voter3, &2u32);

        assert_eq!(client.get_votes(&1u32), 2);
        assert_eq!(client.get_votes(&2u32), 1);
        assert_eq!(client.get_votes(&3u32), 0);
    }
}
