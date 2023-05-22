import { fetchProposals, ProposalData } from '@/api/proposalsApi';
import { useState } from 'react';

const useFetchProposals = () => {
  const [proposals, setProposals] = useState<ProposalData[]>([]);

  const fetchProposalsData = async () => {
    try {
      const response = await fetchProposals();
      setProposals(response.data.proposals);
    } catch (error) {
      // Handle error if fetchProposals() fails
      console.error('Failed to fetch proposals:', error);
    }
  };

  return {
    proposals,
    fetchProposalsData,
  };
};

function ProposalComponent() {
  const { proposals, fetchProposalsData } = useFetchProposals();

  return (
    <div className='my-8 mx-auto max-w-2xl'>
      {/* Render your proposals */}
      {proposals.map((proposal: ProposalData) => (
        <div key={proposal.id}>
          <h2>{proposal.title}</h2>
          <p>{proposal.description}</p>
          {/* Render other properties as needed */}
        </div>
      ))}

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
