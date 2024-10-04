import React, { useState } from 'react';
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

interface EvaluationsByStatus {
  Requested: Evaluation[];
  Accepted: Evaluation[];
  Completed: Evaluation[];
  Declined: Evaluation[];
}

interface DashboardTabsProps {
  evaluations: EvaluationsByStatus; // Change this line
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ evaluations }) => {
  const [activeTab, setActiveTab] = useState<'Requested' | 'Accepted' | 'Completed' | 'Declined'>('Requested');

  const tabs = [
    { id: 'Requested', label: 'Requested' },
    { id: 'Accepted', label: 'Accepted' },
    { id: 'Completed', label: 'Completed' },
    { id: 'Declined', label: 'Declined' },
  ];

  const activeEvaluations = evaluations[activeTab] || [];

  return (
    <div className="flex flex-col mt-4">
      <div className="flex justify-center items-center space-x-4 border-b pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`p-2 font-semibold ${activeTab === tab.id ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
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

export default DashboardTabs;
