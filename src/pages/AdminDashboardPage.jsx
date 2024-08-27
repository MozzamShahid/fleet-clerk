import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { toast } from 'react-toastify';
import { useUser } from '@clerk/clerk-react'; // Use useUser for accessing the current user

const AdminDashboardPage = () => {
  const { user } = useUser(); // This gets the current Clerk user
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      setLoading(true);
      try {
        const driversSnapshot = await getDocs(collection(db, "drivers"));
        const drivers = driversSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log("Fetched driver details:", drivers); // Debugging log
        setDrivers(drivers);
      } catch (error) {
        console.error("Error fetching drivers:", error);
        toast.error("Failed to fetch drivers");
      } finally {
        setLoading(false);
      }
    };
  
    fetchDrivers();
  }, []);

  if (loading) {
    return <div>Loading drivers...</div>;
  }

  return (
    <div className='admin-dashboard bg-white p-5 rounded-lg shadow'>
      <h1 className='text-2xl font-bold text-center mb-6'>Driver Overview</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {drivers.map((driver) => (
          <div key={driver.id} className="driver-card bg-gray-100 p-4 rounded-lg mb-4 shadow">
            <div className="mb-4">
              <p><strong>Name:</strong> {driver.firstName} {driver.lastName}</p>
              <p><strong>Email:</strong> {driver.email}</p>
              <Link to={`/admin/driver/${driver.id}`} className="text-blue-500 hover:underline">
                View Details
              </Link>
            </div>
            <img src={driver.profileImgImage} alt="Profile" className='w-1/2 h-32 md:h-40 lg:h-48 rounded-full object-cover cursor-pointer hover:opacity-80' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
