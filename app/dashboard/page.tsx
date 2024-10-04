"use client";
import { useState } from 'react';
import React  from 'react';

import '../globals.css'; // Import CSS module
import Header from '../components/Header';
import Brand from '../public/images/brand.jpg'
import Image from 'next/image';
import Sidebar from '../components/Sidebar';
import DashboardTabs from '../components/DashboardTabs';


const Dashboard: React.FC = () => {
  
  

  return (
    <>
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-grow bg-gray-100 p-4">
        <DashboardTabs />
      </main>
    </div>
    </>
  );
};

export default Dashboard;
