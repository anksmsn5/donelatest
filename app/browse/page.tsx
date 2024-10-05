"use client";
import { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import SearchFilter from '../components/SearchFilter';
import Head from 'next/head';

// Define a type for the profile
interface Profile {
  id:number;
  firstName: string;
  organization: string;
  image: string;
  rating: number;
  slug: string; // Add slug if it's part of the profile
  clubName: string; // Add clubName if it's part of the profile
}

const Home = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [profiles, setProfiles] = useState<Profile[]>([]); // State for profiles
  const [loading, setLoading] = useState<boolean>(true); // State for loading status
  const [error, setError] = useState<string | null>(null); // State for error handling

  // Fetch coach data from API
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('/api/coach/signup'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch profiles');
        }
        const data = await response.json();
        setProfiles(data); // Assuming the data is an array of profiles
      } catch (err) {
        setError("Some issue occurred.");
      } finally {
        setLoading(false); // Set loading to false after the fetch is complete
      }
    };

    fetchProfiles();
  }, []);

  // Filter profiles based on the search query
  const filteredProfiles = profiles.filter((profile) =>
    profile.firstName.includes(searchQuery.toLowerCase()) // Check against name
  );

  return (
    <>
      <Head>
        <title>Profile Directory</title>
      </Head>

      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-center">
          <div className="w-full md:w-2/3 p-4 rounded-lg">
            <SearchFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
        </div>

        {loading && <p>Loading profiles...</p>} {/* Loading state message */}
        {error && <p className="text-red-500">{error}</p>} {/* Error message */}

        <div className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProfiles.map((profile, index) => (
              <ProfileCard
                key={profile.id}
                name={profile.firstName} // Change from firstName to name
                organization={profile.clubName} // Ensure this matches your Profile interface
                image={profile.image}
                rating={profile.rating}
                slug={profile.slug} // Ensure slug is also part of Profile interface
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
