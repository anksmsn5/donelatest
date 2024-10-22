import { useEffect, useState, useRef } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { FaEye } from 'react-icons/fa';

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

interface EvaluationDataTableProps {
    playerId: number | null; // Assuming this is already defined
    status: string | null; // Update type to include null
    limit: number;
    defaultSort: string;// Update this to string | null
}

const EvaluationDataTable: React.FC<EvaluationDataTableProps> = ({ limit, defaultSort, playerId, status }) => {
    const [data, setData] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>('');
    const [sort, setSort] = useState<string>(defaultSort);
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);

    // Prevent fetchData from running unnecessarily
    const firstRender = useRef(true); // Helps avoid running the effect immediately after render

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/evaluations?search=${search}&sort=${sort}&page=${page}&limit=${limit}&playerId=${playerId || ''}&status=${status || ''}`);
            
            if (response.ok) {
                const data = await response.json();
                setData(data.data);
                setTotal(data.total);
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
      
        fetchData();
    }, [search, sort, page, playerId]); // Add status only if needed

    const handleSort = (column: string) => {
        setSort(prev => prev.startsWith(column) && prev.endsWith('asc') ? `${column},desc` : `${column},asc`);
    };

    const totalPages = Math.ceil(total / limit); // Calculate total pages
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if necessary
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed, so add 1) and pad
        const year = date.getFullYear();
        return `${day}-${month}-${year}`; // Format as d-m-Y
    };
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
                        <th onClick={() => handleSort('created_at')}>Date</th>
                        <th onClick={() => handleSort('firstName')}>Coach Name</th>
                        <th onClick={() => handleSort('review_title')}>Review Title</th>
                        <th onClick={() => handleSort('primary_video_link')}>Video Link</th>
                        
                        <th onClick={() => handleSort('video_description')}>Video Description</th>
                        <th onClick={() => handleSort('evaluation_status')}>Status</th>
                        <th onClick={() => handleSort('evaluation_status')}>View Evaluation</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan={8}>Loading...</td></tr>
                    ) : (
                        data.map(item => (
                            <tr key={item.id}>
                                <td>{formatDate(item.created_at)}</td>
                                <td>{item.firstName} {item.lastName}</td>
                                <td>{item.review_title}</td>
                                <td>
                                    
                                <a href={item.primary_video_link} 
   className="block w-full text-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md text-base font-medium mt-2" 
   target="_blank">
   One
</a>
<a href={item.video_link_two} 
   className="block w-full text-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md text-base font-medium mt-2" 
   target="_blank">
   Two
</a>
<a href={item.video_link_three} 
   className="block w-full text-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md text-base font-medium mt-2" 
   target="_blank">
   Three
</a>

                                
                                </td>
                               
                                <td>{item.video_description}</td>
                                <td> 
                                    {item.status === 0 && (
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Requested</button>
                                    )}
                                    {item.status === 1 && (
                                        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Accepted</button>
                                    )}
                                    {item.status === 2 && (
                                        <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Completed</button>
                                    )}
                                    {item.status === 3 && (
                                        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Rejected</button>
                                    )}
                                </td>
                                <td>
                                    {item.status === 2 && (
                                        <a href={`/evaluationdetails?evaluationId=${item.id}`} target="_blank">
                                            <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                                               <FaEye/>
                                            </button>
                                        </a>
                                    )}
                                     {item.status != 2 && (
                                       "N/A"
                                    )}
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
