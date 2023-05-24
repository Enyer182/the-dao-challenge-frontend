import api from './api';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any;
  }
}

const URLS = {
  fetchProposals: 'proposals',
  voteProposals: 'vote',
};

export type ProposalData = {
  id: string;
  title: string;
  description: string;
  deadline: string;
  minimumVotes: string;
  optionA: string;
  optionB: string;
  optionAVotes: string;
  optionBVotes: string;
  status: string;
  isOpen: boolean;
  isExecuted: boolean;
  proposer: string;
  executor: string;
};

export type ProposalList = {
  proposals: ProposalData[];
};

export const voteForProposal = async (
  proposalId: string,
  voteOption: boolean
) => {
  try {
    if (window.ethereum) {
      // Request access to MetaMask accounts
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const sender = accounts[0];

      // Send the request to the backend with the sender's address
      return api.post(
        `${URLS.voteProposals}`,
        { proposalId, voteOption, sender },
        { baseURL: 'http://localhost:3000/' }
      );
    } else {
      throw new Error('MetaMask not detected');
    }
  } catch (error) {
    console.error('Failed to connect to MetaMask', error);
    throw new Error('Failed to connect to MetaMask');
  }
};

export const fetchProposals = () => {
  return api.get<ProposalList>(URLS.fetchProposals, {
    baseURL: 'http://localhost:3000/',
  });
};
