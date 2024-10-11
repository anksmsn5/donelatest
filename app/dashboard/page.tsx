"use client";
import React, { useEffect, useState } from 'react';
import '../globals.css';
import Sidebar from '../components/Sidebar';
import { getSession } from 'next-auth/react'; 
import { useTable } from 'react-table'; // Import react-table
import { Evaluation, EvaluationsByStatus } from '../types/types'; // Import the correct types

const Dashboard: React.FC = () => {
  const [evaluations, setEvaluations] = useState<EvaluationsByStatus>({
    Requested: [],
    Accepted: [],
    Completed: [],
    Declined: [],
  });

  const [selectedTab, setSelectedTab] = useState<string>('0');
  const [data, setData] = useState<Evaluation[]>([]); // State to hold the data for the table

  // Fetch evaluations when the selected tab changes
  const fetchEvaluations = async (status: string) => {
    const session = await getSession();
    const userId = session?.user.id; 
    console.log(userId);

    if (!userId) {
      throw new Error('User not authenticated');
    }
    
    const response = await fetch('/api/evaluations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        status, // Pass the active tab status
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch evaluations');
    }

    const evaluationsData = await response.json();
    setEvaluations(prev => ({
      ...prev,
      [status]: evaluationsData, // Assuming evaluationsData is an array
    }));
    
    setData(evaluationsData); // Set the data for the table
  };

  useEffect(() => {
    // Fetch data for the initially selected tab
    fetchEvaluations(selectedTab);
  }, [selectedTab]);

  // Define columns for the react-table
  const columns = React.useMemo(
    () => [
      { 
        Header: 'Serial Number', 
        Cell: ({ row }: { row: any }) => row.index + 1  // Serial Number starts from 1
      },
      { Header: 'Player Name', accessor: 'first_name', Cell: ({ row }) => `${row.original.first_name} ${row.original.last_name}` },  // Show full name
      { Header: 'Evaluation Title', accessor: 'review_title' },  // Use the correct accessor
      { Header: 'Video Link', accessor: 'primary_video_link', Cell: ({ value }) => <a href={value} target="_blank" rel="noopener noreferrer">Watch</a> },
      { Header: 'Description', accessor: 'video_description' },  
      { Header: 'Status', accessor: 'payment_status' },            // Status column
     
    ],
    []
  );

  const handleAction = (evaluation: Evaluation) => {
    // Implement the action logic here
    console.log('Action for:', evaluation);
    // You could navigate to another page, open a modal, etc.
  };

  // Create table instance
  const tableInstance = useTable({ columns, data });

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-grow bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex space-x-4 mb-4">
          {[
            { name: 'Requested', value: '0' },
            { name: 'Accepted', value: '1' },
            { name: 'Completed', value: '2' },
            { name: 'Declined', value: '3' }
          ].map(tab => (
            <button
              key={tab.value}
              onClick={() => {
                setSelectedTab(tab.value);
                fetchEvaluations(tab.value);
              }}
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
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()} className="border-b-2 border-gray-200 bg-gray-100 px-4 py-2 text-left text-gray-600">
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
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} className="border-b border-gray-200 px-4 py-2">
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
  );
};

export default Dashboard;
