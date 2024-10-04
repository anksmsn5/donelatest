import React, { useEffect, useState } from 'react';
import '../globals.css';
import Sidebar from '../components/Sidebar';
import DashboardTabs from '../components/DashboardTabs';

interface Evaluation {
  id: number;
  review_title: string;
  // ... other properties
}

interface EvaluationsByStatus {
  Requested: Evaluation[];
  Accepted: Evaluation[];
  Completed: Evaluation[];
  Declined: Evaluation[];
}

const Dashboard: React.FC = () => {
  const [evaluations, setEvaluations] = useState<EvaluationsByStatus>({
    Requested: [],
    Accepted: [],
    Completed: [],
    Declined: [],
  });

  useEffect(() => {
    const fetchEvaluations = async () => {
      const playerId = 1; // Replace with actual player ID logic
      const responses = await Promise.all(
        ['Requested', 'Accepted', 'Completed', 'Declined'].map(status =>
          fetch(`http://localhost:3000/api/evaluation?playerId=${playerId}&status=${status}`)
            .then(res => res.json())
        )
      );

      const groupedEvaluations = responses.reduce((acc: EvaluationsByStatus, curr: Evaluation[], index: number) => {
        const status = ['Requested', 'Accepted', 'Completed', 'Declined'][index];
        acc[status] = curr; // Group evaluations by status
        return acc;
      }, { Requested: [], Accepted: [], Completed: [], Declined: [] });

      setEvaluations(groupedEvaluations);
    };

    fetchEvaluations();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-grow bg-gray-100 p-4">
        <DashboardTabs evaluations={evaluations} /> {/* Pass evaluations here */}
      </main>
    </div>
  );
};

export default Dashboard;
