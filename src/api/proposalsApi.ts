import api from './api';

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

export const voteForProposal = (proposalId: string, voteOption: boolean) => {
  return api.post(
    `${URLS.voteProposals}`,
    { proposalId, voteOption },
    { baseURL: 'http://localhost:3000/' }
  );
};
export const fetchProposals = () => {
  return api.get<ProposalList>(URLS.fetchProposals, {
    baseURL: 'http://localhost:3000/',
  });
};
