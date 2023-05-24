import {
  fetchProposals,
  ProposalData,
  voteForProposal,
} from '@/api/proposalsApi';
import { withAsync } from '@/helpers/withAsync';
import { useState } from 'react';
import { useApiStatus } from '@/api/hooks/useApiStatus';
import { IDLE, PENDING, SUCCESS, ERROR } from '@/api/constants/apiStatus';
import ProposalList from './ProposalList';
import { Spinner } from './common/spinner/Spinner';

const useFetchProposals = () => {
  const [proposals, setProposals] = useState<ProposalData[]>([]);
  const {
    status: proposalStatus,
    setStatus: setProposalStatus,
    isIdle: isFetchProposalStatusIdle,
    isPending: isFetchProposalStatusPending,
    isError: isFetchProposalStatusError,
    isSuccess: isFetchProposalDogStatusSuccess,
  } = useApiStatus(IDLE);
  const fetchProposalsData = async () => {
    try {
      setProposalStatus(PENDING);
      const { response, error } = await withAsync(() => fetchProposals());
      if (error) {
        setProposalStatus(ERROR);
      } else if (response) {
        setProposals(response.data.proposals);
        setProposalStatus(SUCCESS);
      }
    } catch (error) {
      // Handle error if fetchProposals() fails
      console.error('Failed to fetch proposals:', error);
      setProposalStatus('ERROR');
    }
  };

  // useEffect(() => {
  //   fetchProposalsData();
  // }, []);

  return {
    proposalStatus,
    proposals,
    fetchProposalsData,
    isFetchProposalStatusIdle,
    isFetchProposalStatusPending,
    isFetchProposalStatusError,
    isFetchProposalDogStatusSuccess,
  };
};

function ProposalComponent() {
  const { proposals, fetchProposalsData, proposalStatus } = useFetchProposals();
  const [errorMessage, setErrorMessage] = useState('');
  const [votedProposals, setVotedProposals] = useState<Record<string, boolean>>(
    {}
  ); // add this line

  const handleVote = async (
    proposalId: string,
    voteOption: boolean
  ): Promise<void> => {
    try {
      const { response, error } = await withAsync(() =>
        voteForProposal(proposalId, voteOption)
      );
      if (error) {
        setErrorMessage('Failed to vote');
        console.error('Failed to vote:', ERROR);
      } else if (response) {
        setVotedProposals({ ...votedProposals, [proposalId]: true }); // update votedProposals
        fetchProposalsData();
      }
    } catch (error) {
      setErrorMessage('Failed to vote');
      console.error('Failed to vote:', error);
    }
  };

  return (
    <div className='my-8 mx-auto max-w-2xl'>
      {/* Render your proposals */}
      <div className='flex justify-center'>
        {proposalStatus === 'IDLE' && <p>Welcome</p>}
        {proposalStatus === 'PENDING' && <Spinner></Spinner>}
        {proposalStatus === 'ERROR' && <p>There was a problem</p>}
        {proposalStatus === 'SUCCESS' && (
          <>
            <ProposalList
              proposals={proposals}
              handleVote={handleVote}
              votedProposals={votedProposals}
              errorMessage={errorMessage}
            ></ProposalList>
          </>
        )}
      </div>

      <button
        onClick={fetchProposalsData}
        className='mt-4 bg-blue-800 text-blue-100 p-4'
      >
        Fetch proposals
      </button>
    </div>
  );
}

export default ProposalComponent;
