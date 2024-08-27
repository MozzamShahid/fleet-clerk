import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { db } from '../firebase';
import { doc, getDoc, getDocs, query, collection, where } from "firebase/firestore";
import { toast } from 'react-toastify';
import ImageModal from '../components/ImageModal';


const UserProfile = () => {
    const { user } = useUser();
    const [driverDetails, setDriverDetails] = useState(null);
    const [carDetails, setCarDetails] = useState([]);
    const [maintenanceDetails, setMaintenanceDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const openModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        if (user && user.id) {
            setLoading(true);
            const fetchProfileData = async () => {
                try {
                    // Fetch driver details directly using the user's ID as the document ID
                    const driverDocRef = doc(db, "drivers", user.id);
                    const driverDoc = await getDoc(driverDocRef);
                    if (driverDoc.exists()) {
                        setDriverDetails(driverDoc.data());
                    } else {
                        toast.error("No driver details found.");
                    }
    
                    // Fetch car details using user_specific_id
                    const carQuery = query(collection(db, "cars"), where("user_specific_id", "==", user.id));
                    const carDocs = await getDocs(carQuery);
                    if (!carDocs.empty) {
                        setCarDetails(carDocs.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                    } else {
                        toast.error("No car details found.");
                    }
    
                    // Fetch maintenance records using user_specific_id
                    const maintenanceQuery = query(collection(db, "carMaintain"), where("user_specific_id", "==", user.id));
                    const maintenanceDocs = await getDocs(maintenanceQuery);
                    if (!maintenanceDocs.empty) {
                        setMaintenanceDetails(maintenanceDocs.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                    } else {
                        toast.error("No maintenance records found.");
                    }
    
                } catch (error) {
                    console.error("Error fetching profile data:", error);
                    toast.error("Failed to fetch profile data");
                } finally {
                    setLoading(false);
                }
            };
    
            fetchProfileData();
        }
    }, [user]);
    

    if (loading) {
        return <div>Loading profile details...</div>;
    }



    return (
        <div className='user-profile bg-white p-5 rounded-lg shadow'>
            <h1 className='text-2xl font-bold text-center mb-6'>Profile Details</h1>

            <section className='mb-6'>
                <h2 className='text-xl font-semibold mb-4'>Driver Details</h2>
                {driverDetails ? renderDriverDetails([driverDetails], openModal) : <p>No driver details found.</p>}
            </section>

            <hr className='my-6' />

            <section className='mb-6'>
                <h2 className='text-xl font-semibold mb-4'>Car Details</h2>
                {carDetails.length > 0 ? renderCarDetails(carDetails, openModal) : <p>No car details found.</p>}
            </section>

            <hr className='my-6' />

            <section className='mb-6'>
                <h2 className='text-xl font-semibold mb-4'>Car Maintenance Records</h2>
                {maintenanceDetails.length > 0 ? renderMaintenanceDetails(maintenanceDetails) : <p>No maintenance records found.</p>}
            </section>

            <ImageModal isOpen={modalOpen} imageUrl={selectedImage} onClose={closeModal} />
        </div>
    );
};

// Function to render driver details
function renderDriverDetails(driverDetails, openModal) {
    return (
        <table className="min-w-full table-auto text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Email</th>
                    <th scope="col" className="px-6 py-3">Phone</th>
                    <th scope="col" className="px-6 py-3">National ID</th>
                    <th scope="col" className="px-6 py-3">Driving License</th>
                    <th scope="col" className="px-6 py-3">Profile Image</th>
                    <th scope="col" className="px-6 py-3">ID Card Image</th>
                    <th scope="col" className="px-6 py-3">Driving License Image</th>
                </tr>
            </thead>
            <tbody>
                {driverDetails.map((driver, index) => (
                    <tr key={`${driver.id}-${index}`} className="bg-white border-b">
                        <td className="px-6 py-4">{driver.firstName} {driver.lastName}</td>
                        <td className="px-6 py-4">{driver.email}</td>
                        <td className="px-6 py-4">{driver.phoneNumber}</td>
                        <td className="px-6 py-4">{driver.nationalId}</td>
                        <td className="px-6 py-4">{driver.drivingLicense}</td>
                        <td className="px-6 py-4">
                            <img src={driver.profileImgImage} alt="Profile" className='w-20 h-20 rounded-full object-cover cursor-pointer' onClick={() => openModal(driver.profileImgImage)} />
                        </td>
                        <td className="px-6 py-4">
                            <img src={driver.idCardImage} alt="ID Card" className='w-20 h-20 rounded-md object-cover cursor-pointer' onClick={() => openModal(driver.idCardImage)} />
                        </td>
                        <td className="px-6 py-4">
                            <img src={driver.drivingLicenseImage} alt="Driving License" className='w-20 h-20 rounded-md object-cover cursor-pointer' onClick={() => openModal(driver.drivingLicenseImage)} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}



// Function to render car details
function renderCarDetails(carDetails, openModal) {
    return (
        <table className="min-w-full table-auto text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3">Car Name</th>
                    <th scope="col" className="px-6 py-3">Model</th>
                    <th scope="col" className="px-6 py-3">License Plate</th>
                    <th scope="col" className="px-6 py-3">VIN</th>
                    <th scope="col" className="px-6 py-3">Color</th>
                    <th scope="col" className="px-6 py-3">Car Image</th>
                </tr>
            </thead>
            <tbody>
    {carDetails.map((car) => (
        <tr key={car.id} className="bg-white border-b">
            <td className="px-6 py-4">{car.carName}</td>
            <td className="px-6 py-4">{car.modelCar}</td>
            <td className="px-6 py-4">{car.lpNumber}</td>
            <td className="px-6 py-4">{car.viNumber}</td>
            <td className="px-6 py-4">{car.color}</td>
            <td className="px-6 py-4">
                <img src={car.CaridCardImage} alt="Car Document" className='w-20 h-20 object-contain cursor-pointer' onClick={() => openModal(car.CaridCardImage)} />
            </td>
        </tr>
    ))}
</tbody>

        </table>
    );
}



// Function to render car maintenance details
function renderMaintenanceDetails(maintenanceDetails) {
    return (
        <table className="min-w-full table-auto text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3">Maintenance Details</th>
                    <th scope="col" className="px-6 py-3">Date</th>
                    <th scope="col" className="px-6 py-3">Total Spend</th>
                </tr>
            </thead>
            <tbody>
                {maintenanceDetails.map((maintenance, index) => (
                    <tr key={`${maintenance.id}-${index}`} className="bg-white border-b">
                        <td className="px-6 py-4">{maintenance.tcarMain}</td>
                        <td className="px-6 py-4">{maintenance.date}</td>
                        <td className="px-6 py-4">{maintenance.tspendCar}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}



export default UserProfile;
