import api from './api';

const URLS = {
  fetchProposals: 'proposals',
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

export const fetchProposals = () => {
  return api.get<ProposalList>(URLS.fetchProposals, {
    baseURL: 'http://localhost:3000/',
  });
};
