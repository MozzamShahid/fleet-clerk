import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useUser } from '@clerk/clerk-react'; // Import useUser to access user details
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";

const Carmaintain = () => {
    const { user } = useUser(); // Ensure the user is correctly accessed
    const [formDatad, setFormDatad] = useState({
        tcarMain: '',
        date: '',
        tspendCar: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDatad({
            ...formDatad,
            [name]: value
        });
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        let isValid = true;
        let newErrors = {};

        if (!formDatad.tcarMain.trim()) {
            isValid = false;
            newErrors.tcarMain = 'Car Maintenance Details are required';
        }

        if (!formDatad.date.trim()) {
            isValid = false;
            newErrors.date = 'Date is required';
        }

        if (!formDatad.tspendCar.trim()) {
            isValid = false;
            newErrors.tspendCar = 'Total spend is required';
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error('Please fill out all required fields');
            return;
        }
        try {
            const docRef = await addDoc(collection(db, 'carMaintain'), {
                tcarMain: formDatad.tcarMain || '',
                date: formDatad.date || '',
                tspendCar: formDatad.tspendCar || '',
                user_specific_id: user.id // Ensure this references the user ID correctly
            });
            console.log("Document written with ID: ", docRef.id);
            toast.success('Form Data uploaded successfully!');
        } catch (error) {
            console.error('Error adding document:', error.message);
            toast.error('Error submitting the form. Please try again.');
        }
    };

    return (
        <div className='main bg-white flex flex-col w-full'>
            <h1 className='text-4xl bg-blue-500 text-white p-3 rounded-sm'>Last Time Car Maintenance</h1>
            <div className='form mt-4'>
                <form onSubmit={handleSubmit}>
                    <div className='flex mt-3 gap-10'>
                        <div className='input-left w-full'>
                            <label className='text-label lab-text'>Car Maintenance Details</label>
                            <textarea
                                name="tcarMain"
                                className='tcarMain custom-input'
                                type="text"
                                placeholder='Car Tyre Changes from "Store Name".... '
                                value={formDatad.tcarMain}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='input-left mt-3'>
                        <label className='date-label lab-text'>Date</label>
                        <input
                            name="date"
                            className='model-carinput custom-input w-96'
                            type="date"
                            placeholder='2018'
                            value={formDatad.date}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='tspendCar input-left mt-3'>
                        <label className='tspendCar-label lab-text'>Total Spend uptil now</label>
                        <input
                            name="tspendCar"
                            className='tspendCar-input custom-input w-96'
                            type="number"
                            placeholder='$5,000'
                            value={formDatad.tspendCar}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className='submit-button button w-full mt-5'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Carmaintain;
