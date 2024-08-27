import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';  // Import useUser from Clerk
import { db, storage } from '../firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Cardetail = () => {
  const [formDatad, setFormDatad] = useState({
    carName: '',
    modelCar: '',
    lpNumber: '',
    color: '',
    viNumber: '',
  });
  const [uploadedImages, setUploadedImages] = useState({
    caridCard: null,
  });
  const [errors, setErrors] = useState({});
  const { user } = useUser();
  const navigate = useNavigate();
  const { driverId } = useParams(); // Get the driver ID from the URL params

  // Use the driverId from the URL if present, otherwise use the logged-in user's ID
  const userId = driverId || user?.id;

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      const docRef = doc(db, "cars", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormDatad(docSnap.data());
        setUploadedImages({
          caridCard: docSnap.data().CaridCardImage,
        });
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDatad(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (event, imageType) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const storageRef = ref(storage, `images/${userId}/${imageType}/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setUploadedImages(prev => ({
          ...prev,
          [imageType]: downloadURL
        }));
      } catch (error) {
        console.error("Error uploading file:", error.message);
      }
    }
  };

  const validate = () => {
    let newErrors = {};
    let isValid = true;
    if (!formDatad.carName.trim()) {
      newErrors.carName = 'Car name is required';
      isValid = false;
    }
    // Add other validations here
    if (!formDatad.modelCar.trim()) newErrors.modelCar = 'Model is required';
    if (!formDatad.lpNumber.trim()) newErrors.lpNumber = 'License plate number is required';
    if (!formDatad.color.trim()) newErrors.color = 'Color is required';
    if (!formDatad.viNumber.trim()) newErrors.viNumber = 'VIN is required';
    if (!uploadedImages.caridCard) newErrors.caridCard = 'Car document image is required';
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fill out all required fields');
      return;
    }
    if (!userId) {
      toast.error("User is not authenticated");
      return;
    }
    try {
      // Reference to the user's car document
      const docRef = doc(db, 'cars', userId);
      
      // Check if the document exists
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Update the existing document
        await setDoc(docRef, {
          ...formDatad,
          CaridCardImage: uploadedImages.caridCard || '',
          user_specific_id: userId
        }, { merge: true });

        toast.success('Car details updated successfully!');
      } else {
        // If no document exists, create a new one
        await setDoc(docRef, {
          ...formDatad,
          CaridCardImage: uploadedImages.caridCard || '',
          user_specific_id: userId
        });

        toast.success('Car details uploaded successfully!');
      }

      // Navigate to the car maintenance page after successful submission
      navigate('/Carmaintainance');
    } catch (error) {
      console.error('Error submitting the form:', error.message);
      toast.error('Error submitting the form. Please try again.');
    }
  };

  return (
    <div className='main bg-white flex flex-col w-full'>
      <h1 className='text-4xl bg-blue-500 text-white p-3 rounded-sm'>Car Details</h1>
      <div className='form mt-4'>
        <form onSubmit={handleSubmit}>
          <div className='flex mt-3 gap-10'>
            <div className='input-left'>
              <label className='car-namelabel lab-text'>Car Name</label>
              <input
                name="carName"
                className='custom-input w-96'
                type="text"
                placeholder='Toyota Hilux'
                value={formDatad.carName}
                onChange={handleChange}
              />
              {errors.carName && <div className="error">{errors.carName}</div>}
            </div>
            <div className='input-left'>
              <label className='model-carlabel lab-text'>Model</label>
              <input
                name="modelCar"
                className='custom-input w-96'
                type="number"
                placeholder='2018'
                value={formDatad.modelCar}
                onChange={handleChange}
              />
              {errors.modelCar && <div className="error">{errors.modelCar}</div>}
            </div>
          </div>
          <div className='flex mt-3 gap-10'>
            <div className='input-left'>
              <label className='lpNumber-label lab-text'>License Plate Number</label>
              <input
                name="lpNumber"
                className='custom-input w-96'
                type="text"
                placeholder='SAMOA123'
                value={formDatad.lpNumber}
                onChange={handleChange}
              />
              {errors.lpNumber && <div className="error">{errors.lpNumber}</div>}
            </div>
            <div className='input-left'>
              <label className='color-label lab-text'>Color</label>
              <input
                name="color"
                className='custom-input w-96'
                type="text"
                placeholder='White'
                value={formDatad.color}
                onChange={handleChange}
              />
              {errors.color && <div className="error">{errors.color}</div>}
            </div>
            <div className='input-left'>
              <label className='viNumber-label lab-text'>Vehicle Identification Number (VIN)</label>
              <input
                name="viNumber"
                className='custom-input w-96'
                type="text"
                placeholder='0987654321'
                value={formDatad.viNumber}
                onChange={handleChange}
              />
              {errors.viNumber && <div className="error">{errors.viNumber}</div>}
            </div>
          </div>
          <div className='flex mt-3'>
            <div className='image flex flex-col input-left'>
              <label className='uploadcarid-label lab-text'>Upload Car Document</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'caridCard')}
              />
              {uploadedImages.caridCard && (
                <img src={uploadedImages.caridCard} alt="CarID Card" className='uploaded-image' />
              )}
              {errors.caridCard && <div className="error">{errors.caridCard}</div>}
            </div>
          </div>
          <button type="submit" className='submit-button button w-full mt-5'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Cardetail;
