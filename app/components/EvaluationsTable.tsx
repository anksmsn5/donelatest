import React from 'react';
import { useTable, Column } from 'react-table';

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

interface EvaluationsTableProps {
  data: Evaluation[];
}

const EvaluationsTable: React.FC<EvaluationsTableProps> = ({ data }) => {
  const columns: Column<Evaluation>[] = React.useMemo(
    () => [
      { Header: 'Review Title', accessor: 'review_title' },
      { Header: 'Primary Video Link', accessor: 'primary_video_link' },
      { Header: 'Video Link Two', accessor: 'video_link_two' },
      { Header: 'Video Link Three', accessor: 'video_link_three' },
      { Header: 'Video Description', accessor: 'video_description' },
      { Header: 'Evaluation Status', accessor: 'evaluation_status' },
      { Header: 'Payment Status', accessor: 'payment_status' },
      { Header: 'Created At', accessor: 'created_at' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<Evaluation>({ columns, data });

  return (
    <table {...getTableProps()} className="min-w-full border-collapse border border-gray-300">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()} // Spread the column props first
                key={column.id} // Add key here
                className="border border-gray-300 p-2 bg-gray-200"
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <div>NA</div>
          );
        })}
      </tbody>
    </table>
  );
};

export default EvaluationsTable;
