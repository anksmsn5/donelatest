"use client";
import { useState, useEffect } from 'react';
import React from 'react';

import '../../globals.css'; // Import CSS module
import Sidebar from '../../components/coach/Sidebar';
import { useTable } from 'react-table';
import { Evaluation, EvaluationsByStatus } from '../../types/types';
import Modal from '../../components/Modal';
import AcceptanceModal from '@/app/components/coach/AcceptanceModal';
import EvaluationForm from '@/app/components/coach/EvaluationForm';

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAcceptOpen, setIsAcceptOpen] = useState(false);
  const [isEvFormOpen, setIsEvFormOpen] = useState(false);
  const [evaluationId, setEvaluationId]=useState();
  const [evaluationData, setEvaluationData]=useState();
  const [coachId, setCoachId]=useState();
  const [playerId, setPlayerId]=useState();
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
  const [evaluations, setEvaluations] = useState<EvaluationsByStatus>({
    Requested: [],
    Accepted: [],
    Completed: [],
    Declined: [],
  });
  const [selectedTab, setSelectedTab] = useState<string>('0');
  const [data, setData] = useState<Evaluation[]>([]);

  const fetchEvaluations = async (status: string) => {
    const response = await fetch('/api/coach/evaluations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch evaluations');
    }

    const evaluationsData = await response.json();
    setEvaluations(prev => ({
      ...prev,
      [status]: evaluationsData,
    }));

    setData(evaluationsData);
  };

  useEffect(() => {
    fetchEvaluations(selectedTab);
  }, [selectedTab]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Sr No.',
        Cell: ({ row }: { row: any }) => row.index + 1,
      },
      {
        Header: 'Player Name',
        accessor: 'first_name',
        Cell: ({ row }) => `${row.original.first_name} ${row.original.last_name}`,
      },
      { Header: 'Evaluation Title', accessor: 'review_title' },
      { Header: 'Video Link', accessor: 'primary_video_link', Cell: ({ value }) => <a href={value} target="_blank" rel="noopener noreferrer">Watch</a> },
      { Header: 'Description', accessor: 'video_description' },
      { Header: 'Status', accessor: 'payment_status' },
      {
        Header: 'Action',
        Cell: ({ row }: { row: any }) => {
          const evaluation = row.original;
          if (selectedTab === '0') {
            return (
              <button
                onClick={() => handleRequestedAction(evaluation)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Action
              </button>
            );
          } else if (selectedTab === '1') {
            return (
              <button
                onClick={() => handleAcceptedAction(evaluation)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Evaluate
              </button>
            );
          } else {
            return null;
          }
        },
      },
    ],
    [selectedTab]
  );

  const handleRequestedAction = (evaluation: Evaluation) => {
    setEvaluationId(evaluation.id);
    setCoachId(evaluation.coach_id);
    setPlayerId(evaluation.player_id);
     
    setIsAcceptOpen(true);
  };

  const handleAcceptedAction = (evaluation: Evaluation) => {
    setEvaluationId(evaluation.id);
    console.log(evaluation);
    setEvaluationData(evaluation);
    setIsEvFormOpen(true);
   
  };

  const tableInstance = useTable({ columns, data });

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const closeAcceptanceModal = () => {
    console.log("Closing Acceptance Modal"); // Debugging log
    setIsAcceptOpen(false);
  };

  const   closeEvform=()=>{
    setIsEvFormOpen(false);
  };
  
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
      <AcceptanceModal
      
        evaluationId={evaluationId} // Pass the appropriate evaluation ID if needed
        isOpen={isAcceptOpen}
        onClose={closeAcceptanceModal}
      />

      <EvaluationForm  evaluationId={evaluationId} evaluationData={evaluationData} coachId={coachId} playerId={playerId} isOpen={isEvFormOpen} onClose={closeEvform}/>

      
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-grow bg-gray-100 p-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex space-x-4 mb-4">
              {[
                { name: 'Requested', value: '0' },
                { name: 'Accepted', value: '1' },
                { name: 'Completed', value: '2' },
                { name: 'Declined', value: '3' },
              ].map(tab => (
                <button
    key={tab.value} // This is good
    onClick={() => setSelectedTab(tab.value)}
    className={`p-2 border-b-2 ${selectedTab === tab.value ? 'border-blue-500 font-bold' : 'border-transparent'}`}
  >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Table to display evaluations */}
            <table {...tableInstance.getTableProps()} className="min-w-full bg-white border border-gray-300">
            <thead>
  {tableInstance.headerGroups.map(headerGroup => (
    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}> {/* Add key here */}
      {headerGroup.headers.map(column => (
        <th {...column.getHeaderProps()} key={column.id} className="border-b-2 border-gray-200 bg-gray-100 px-4 py-2 text-left text-gray-600">
          {column.render('Header')}
        </th>
      ))}
    </tr>
  ))}
</thead>

 
<tbody {...tableInstance.getTableBodyProps()}>
  {tableInstance.rows.map(row => {
    tableInstance.prepareRow(row);
    return (
      <tr {...row.getRowProps()} key={row.id}> {/* Add key here */}
        {row.cells.map(cell => (
          <td {...cell.getCellProps()} key={row.id} className="border-b border-gray-200 px-4 py-2">
            {cell.render('Cell')}
          </td>
        ))}
      </tr>
    );
  })}
</tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
