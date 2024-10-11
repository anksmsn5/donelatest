"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import EvaluationDataTable from '../components/EvaluationDataTable';
import Sidebar from '../components/Sidebar';
import { useSession } from 'next-auth/react';

// Define the type for the data
interface DataType {
    id: number; // Replace with actual properties
    name: string; // Replace with actual properties
    status: string; // Replace with actual properties
}

const Home: React.FC = () => {
     
    const [playerId, setPlayerId] = useState<number | null>(null);
    const [queryStatus, setQueryStatus] = useState<string | null>(null);
    const limit = 10; // Set the number of items per page
    const defaultSort = 'name,asc';
    const { data: session } = useSession();
    const searchParams = useSearchParams();
  const status = searchParams.get('status'); 

    useEffect(() => {
        if (session && session.user) {
            const id = Number(session.user.id); // Convert to number
            setPlayerId(isNaN(id) ? null : id); // Set playerId or null if conversion fails
        }
    }, [session]);// This effect runs when the session changes



    return (
        <div className="flex h-screen overflow-hidden">
    <Sidebar />
    <main className="flex-grow bg-gray-100 p-4 overflow-auto"> {/* Add overflow-auto */}
        <div className="bg-white shadow-md rounded-lg p-6 h-auto">
            <EvaluationDataTable playerId={playerId} status={status} limit={limit} defaultSort={defaultSort} />
        </div>
    </main>
</div>
    );
};

export default Home;
