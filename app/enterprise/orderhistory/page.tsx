"use client";
import React, { useEffect, useState } from 'react';
import { useSession, getSession } from 'next-auth/react';
import Sidebar from '../../components/enterprise/Sidebar';

// Define the type for the data
interface Order {
  id: number;
  orderDate: string;
  packageName: string;
  description: string;
  amount: number;
}

const Home: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 10; // Set the number of items per page
  const { data: session } = useSession();

  useEffect(() => {
    const fetchOrders = async () => {
      const session = await getSession();
      const enterpriseId = session?.user?.id; // Adjust according to your session structure

      if (!enterpriseId) {
        console.error('Enterprise ID not found in session');
        return;
      }

      const response = await fetch('/api/enterprise/orderhistory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          enterprise_id: enterpriseId,
        }),
      });

      if (!response.ok) {
        console.error('Failed to fetch orders');
        return;
      }

      const data = await response.json();
      setOrders(data.orderWithPackageDetails);
      setFilteredOrders(data.orderWithPackageDetails); // Initially show all orders
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    if (search) {
      const filtered = orders.filter((order) =>
        order.packageName.toLowerCase().includes(search.toLowerCase()) ||
        order.amount.toString().includes(search.toLowerCase())
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
    setCurrentPage(1); // Reset to the first page when search is updated
  }, [search, orders]);

  const totalPages = Math.ceil(filteredOrders.length / limit);

  // Get the paginated orders
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-grow bg-gray-100 p-4 overflow-auto">
        <div className="bg-white shadow-md rounded-lg p-6 h-auto">
          <div>
            <input
              type="text"
              placeholder="Search by customer name or status"
              className="w-1/3 mb-2 px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <table className="w-full text-sm text-left text-gray-700">
              <thead>
                <tr>
                  <th>Order Date</th>
                  <th>Package Name</th>
                  <th>Description</th>
                  <th>Amount Paid</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.length > 0 ? (
                  paginatedOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.orderDate}</td>
                      <td>{order.packageName}</td>
                      <td>{order.description}</td>
                      <td>{order.amount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>No orders found</td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 text-sm ${
                  currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-500 hover:underline'
                }`}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 text-sm ${
                  currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-500 hover:underline'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
