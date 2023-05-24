import React from 'react';
import { ProposalData } from '@/api/proposalsApi';

interface ProposalListProps {
  proposals: ProposalData[];
  handleVote: (proposalId: string, voteOption: boolean) => Promise<void>;
  votedProposals: Record<string, boolean>;
  errorMessage: string;
  voteStatus: Record<string, 'idle' | 'pending' | 'success' | 'error'>; // Updated type
}

const ProposalList: React.FC<ProposalListProps> = ({
  proposals,
  handleVote,
  errorMessage,
  voteStatus,
}) => {
  return (
    <div className='bg-white p-6 rounded-md shadow-md'>
      <h1 className='text-2xl font-bold mb-4'>Proposals</h1>
      {proposals.map((proposal) => {
        return (
          <div key={proposal.id} className='mb-6'>
            <h2 className='text-lg font-semibold'>{proposal.title}</h2>
            <p className='text-gray-600'>{proposal.description}</p>
            <p className='text-gray-500 mt-2'>
              Option A:
              <span className='font-semibold'>
                {proposal.optionA} ({proposal.optionAVotes} votes)
              </span>
            </p>
            <p className='text-gray-500'>
              Option B:
              <span className='font-semibold'>
                {proposal.optionB} ({proposal.optionBVotes} votes)
              </span>
            </p>
            <p className='text-gray-500'>
              Status: <span className='font-semibold'>{proposal.status}</span>
            </p>
            <div className='flex justify-center mt-2'>
              <button
                onClick={() => handleVote(proposal.id, true)}
                className='px-4 py-2 bg-blue-500 text-white font-semibold rounded-md mr-2'
              >
                Vote A
              </button>
              <button
                onClick={() => handleVote(proposal.id, false)}
                className='px-4 py-2 align bg-blue-500 text-white font-semibold rounded-md'
              >
                Vote B
              </button>
            </div>
            {voteStatus[proposal.id] === 'success' && (
              <p className='text-green-500'>Vote recorded successfully</p>
            )}
            {voteStatus[proposal.id] === 'error' && (
              <p className='text-red-500'>{errorMessage}</p>
            )}
            <p className='mt-2'>
              Winning option so far:{' '}
              <span className='font-semibold'>
                {proposal.optionAVotes > proposal.optionBVotes
                  ? `Option A (${proposal.optionAVotes} votes)`
                  : `Option B (${proposal.optionBVotes} votes)`}
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ProposalList;
