import React from 'react';
import { ProposalData } from '@/api/proposalsApi';
import Confetti from 'react-confetti';
import useWindowSize from '@/hooks/useWindowSize';

interface ProposalListProps {
  proposals: ProposalData[];
  handleVote: (proposalId: string, voteOption: boolean) => Promise<void>;
  votedProposals: Record<string, boolean>;
  errorMessage: string;
  voteStatus: Record<string, 'idle' | 'pending' | 'success' | 'error'>; // Updated type
  showConfetti: boolean;
}

const ProposalList: React.FC<ProposalListProps> = ({
  proposals,
  handleVote,
  errorMessage,
  voteStatus,
  showConfetti,
}) => {
  const { width, height } = useWindowSize();
  return (
    <div className='bg-white p-6 rounded-md shadow-md'>
      <h1 className='text-2xl font-bold mb-4'>Proposals</h1>
      {proposals.map((proposal) => {
        return (
          <div key={proposal.id} className='mb-6'>
            <h2 className='text-lg font-semibold'>{proposal.title}</h2>
            <p className='text-gray-600'>{proposal.description}</p>
            {voteStatus[proposal.id] === 'success' && showConfetti && (
              <div className='absolute top-0 left-0 w-full h-full'>
                <Confetti />
              </div>
            )}
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
                className='px-4 py-2 bg-blue-500 text-white font-semibold rounded-md mr-2 transition-all duration-200 ease-in-out transform hover:scale-110 active:scale-100'
              >
                Vote A
              </button>
              <button
                onClick={() => handleVote(proposal.id, false)}
                className='px-4 py-2 bg-blue-500 text-white font-semibold rounded-md transition-all duration-200 ease-in-out transform hover:scale-110 active:scale-100'
              >
                Vote B
              </button>
            </div>

            {voteStatus[proposal.id] === 'success' && (
              <>
                <p className='text-green-500'>Vote recorded successfully</p>
                {showConfetti && <Confetti width={width} height={height} />}
              </>
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
