import React, { useEffect, useState, useMemo } from 'react';
import { useTable } from 'react-table';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Define Item interface for data structure
interface Item {
    id: number;
    firstName: string;
    lastName: string;
    review_title: string;
    primary_video_link: string;
    video_link_two: string;
    video_link_three: string;
    video_description: string;
    status: number;
    created_at: string;
}

// Define props interface for EvaluationDataTable
interface EvaluationDataTableProps {
    limit: number; // Number of items per page
    defaultSort: string; // Default sorting column and order
    playerId: number;
    status: string | null; // Status can be a string or null
}

const EvaluationDataTable: React.FC<EvaluationDataTableProps> = ({ limit, defaultSort, playerId, status }) => {
    const [data, setData] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>('');
    const [sort, setSort] = useState<string>(defaultSort);
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);

    // Fetch data from the API
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/evaluations?search=${search}&sort=${sort}&page=${page}&limit=${limit}&playerId=${playerId || ''}&status=${status || ''}`);
            if (response.ok) {
                const responseData = await response.json();
                setData(responseData.data);
                setTotal(responseData.total);
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };

    // Fetch data whenever search, sort, page, playerId, or status changes
    useEffect(() => {
        fetchData();
    }, [search, sort, page, playerId, status]);

    // Define columns for the react-table without conditions
    const columns = useMemo(() => [
        { Header: 'Coach Name', accessor: 'firstName' },
        { Header: 'Review Title', accessor: 'review_title' },
        { Header: 'Video Link', accessor: 'primary_video_link' },
        { Header: 'Video Link 2', accessor: 'video_link_two' },
        { Header: 'Video Link 3', accessor: 'video_link_three' },
        { Header: 'Video Description', accessor: 'video_description' },
        {
            Header: 'Status',
            accessor: 'status',
            Cell: ({ value }: { value: number }) => {
                let statusLabel;
                switch (value) {
                    case 0: statusLabel = <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Requested</button>; break;
                    case 1: statusLabel = <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Accepted</button>; break;
                    case 3: statusLabel = <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Completed</button>; break;
                    case 4: statusLabel = <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Rejected</button>; break;
                    default: statusLabel = <span>Unknown</span>;
                }
                return statusLabel;
            },
        },
    ], []);

    // Create table instance at the top level
    const tableInstance = useTable({ columns, data });

    const totalPages = Math.ceil(total / limit); // Calculate total pages

    return (
        <div>
            <input 
                type="text" 
                placeholder="Search..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                className='searchBar'
            />
            <table>
                <thead>
                    <tr>
                        <th onClick={() => setSort('firstName')}>Coach Name</th>
                        <th onClick={() => setSort('review_title')}>Review Title</th>
                        <th onClick={() => setSort('primary_video_link')}>Video Link</th>
                        <th onClick={() => setSort('video_link_two')}>Video Link 2</th>
                        <th onClick={() => setSort('video_link_three')}>Video Link 3</th>
                        <th onClick={() => setSort('video_description')}>Video Description</th>
                        <th onClick={() => setSort('status')}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan={7}>Loading...</td></tr>
                    ) : (
                        data.map(item => (
                            <tr key={item.id}>
                                <td>{item.firstName} {item.lastName}</td>
                                <td>{item.review_title}</td>
                                <td><a href={item.primary_video_link} target='_blank' rel="noopener noreferrer"><VisibilityIcon className="icon" /></a></td>
                                <td><a href={item.video_link_two} target='_blank' rel="noopener noreferrer"><VisibilityIcon className="icon" /></a></td>
                                <td><a href={item.video_link_three} target='_blank' rel="noopener noreferrer"><VisibilityIcon className="icon" /></a></td>
                                <td>{item.video_description}</td>
                                <td>
                                    {/* Status buttons are handled in the columns definition */}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className="pagination">
                <button 
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))} 
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span> Page {page} of {totalPages} </span>
                <button 
                    onClick={() => setPage(prev => (prev < totalPages ? prev + 1 : prev))} 
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};


export default EvaluationDataTable;
