// components/Tabs.tsx
import { useState } from 'react';
import EvaluationsTable from './EvaluationsTable';

interface Evaluation {
  id: number;
  review_title: string;
  primary_video_link: string;
  video_link_two?: string;
  video_link_three?: string;
  video_description?: string;
  evaluation_status: string;
  payment_status: string;
  created_at: string;
}

interface DashboardTabsProps {
  evaluations: Evaluation[]; // Accept an array instead of grouped by status
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ evaluations }) => {
  const [activeTab, setActiveTab] = useState<string>('Requested');

  const tabs = [
    { id: 'Requested', label: 'Requested' },
    { id: 'Accepted', label: 'Accepted' },
    { id: 'Completed', label: 'Completed' },
    { id: 'Declined', label: 'Declined' },
  ];

  // Debugging output to check evaluations structure
  console.log('Evaluations Prop:', evaluations);

  // Ensure evaluations is defined and provide a fallback
  const activeEvaluations = evaluations ? evaluations[activeTab] || [] : [];

  return (
    <div className="flex flex-col mt-4">
      <div className="flex justify-center items-center space-x-4 border-b pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`p-2 font-semibold ${activeTab === tab.id ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4">
        <EvaluationsTable data={activeEvaluations} />
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const playerId = context.query.playerId; // Get playerId from query parameters
  console.log('Player ID:', playerId); // Log playerId

  const responses = await Promise.all(
    ['Requested', 'Accepted', 'Completed', 'Declined'].map(status =>
      fetch(`http://localhost:3000/api/evaluation?playerId=${playerId}&status=${status}`) // Update the fetch URL accordingly
        .then(res => {
          if (!res.ok) {
            throw new Error(`Failed to fetch data for status: ${status}`);
          }
          return res.json();
        })
    )
  );

  console.log('Responses:', responses);

  const evaluations = responses.reduce((acc: Record<string, Evaluation[]>, curr: Evaluation[], index: number) => {
    const status = ['Requested', 'Accepted', 'Completed', 'Declined'][index];
    acc[status] = curr; // Group evaluations by status
    return acc;
  }, {});

  console.log('Evaluations:', evaluations);

  return {
    props: { evaluations },
  };
}


export default DashboardTabs;
