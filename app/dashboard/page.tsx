"use client";
import React, { useState } from 'react';
import '../globals.css'; // Import CSS module
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import DashboardTabs from '../components/DashboardTabs';

// Example of how your evaluation type might look
interface Evaluation {
  id: number;
  review_title: string;
  // ... other properties
}

const Dashboard: React.FC = () => {
  // Sample evaluations data or fetch from API
  const [evaluations, setEvaluations] = useState<Evaluation[]>([
    { id: 1, review_title: "Great Coach!" },
    { id: 2, review_title: "Needs Improvement." },
    // ... add more evaluations as needed
  ]);

  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-grow bg-gray-100 p-4">
          <DashboardTabs evaluations={evaluations} /> {/* Pass evaluations here */}
        </main>
      </div>
    </>
  );
};

export default Dashboard;
