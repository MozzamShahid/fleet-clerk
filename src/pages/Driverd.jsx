import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react'; // Import useUser from Clerk to access user details
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import driverimg from '../images/Driverimg.png';

const Driverd = () => {
  const { user } = useUser(); // Use the Clerk hook to get the current user
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    emergencyPhoneNumber: '',
    nationalId: '',
    drivingLicense: '',
  });

  const [errors, setErrors] = useState({});
  const [uploadedImages, setUploadedImages] = useState({
    idCard: null,
    profileImg: null,
    drivingLicense: null
  });

  const validate = () => {
    let newErrors = {};
    let isValid = true;
  
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }
    // Add other validations here
  
    setErrors(newErrors);
    return isValid;
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (user) { // Ensure the user object is available
      const fetchData = async () => {
        const docRef = doc(db, "drivers", user.id); // Use user.id from Clerk
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFormData(docSnap.data());
          setUploadedImages({
            idCard: docSnap.data().idCardImage,
            profileImg: docSnap.data().profileImgImage,
            drivingLicense: docSnap.data().drivingLicenseImage
          });
        } else {
          console.log("No such document!");
        }
      };

      fetchData();
    }
  }, [user]); // Depend on user state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (event, imageType) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const storageRef = ref(storage, `images/${user.id}/${imageType}/${file.name}`); // Use user.id from Clerk
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validate()) {
      console.log("Validation failed");
      toast.error('Please fill out all required fields');
      return;
    }
  
    try {
      const docRef = doc(db, 'drivers', user.id); // Use user.id from Clerk
      console.log("Updating/setting document with: ", formData);
      await setDoc(docRef, {
        ...formData,
        idCardImage: uploadedImages.idCard,
        profileImgImage: uploadedImages.profileImg,
        drivingLicenseImage: uploadedImages.drivingLicense
      }, { merge: true });
  
      toast.success('Form Data and Images uploaded successfully!');
      navigate('/cardetaild');
    } catch (error) {
      console.error('Error updating document:', error.message);
      toast.error('Error submitting the form. Please try again.');
    }
  };

  return (
    <div className='main bg-white flex flex-col '>
      <h1 className='text-4xl bg-blue-600 text-white p-3 rounded-md shadow'>Drivers Details</h1>
      <img src={driverimg} alt="Driverimg" className="h-80 object-none object-top mt-4" />
      <div className='form mt-5'>
      <form onSubmit={handleSubmit}>

<div className='image flex flex-col input-left'>
  <label className='uploadid-label lab-text font-medium'>Profile Image:</label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => handleImageUpload(e, 'profileImg')}
  />
  {uploadedImages.profileImg && (
    <img src={uploadedImages.profileImg} alt="Profile Image" className='uploaded-image w-40 h-40 object-cover rounded-full mt-2 shadow' />
  )}
  {errors.profileImg && <div className="error text-red-500">{errors.profileImg}</div>}
</div>

<div className='flex mt-4 gap-12'>
  <div className='input-left'>
    <label className='first-namelabel lab-text font-medium'>First Name</label>
    <input
      name="firstName"
      className='first-nameinput custom-input w-96 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
      type="text"
      placeholder='Mozzam'
      value={formData.firstName}
      onChange={handleChange}
    />
    {errors.firstName && <div className="error text-red-500">{errors.firstName}</div>}
  </div>

  <div className='input-left'>
    <label className='last-namelabel lab-text font-medium'>Last Name</label>
    <input
      name="lastName"
      className='last-nameinput custom-input w-96 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
      type="text"
      placeholder='Shahid'
      value={formData.lastName}
      onChange={handleChange}
    />
    {errors.lastName && <div className="error text-red-500">{errors.lastName}</div>}
  </div>
</div>

<div className='email input-left mt-4'>
  <label className='email-label lab-text font-medium'>Email:</label>
  <input
    name="email"
    className='email-input custom-input w-96 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
    type="email"
    placeholder='mozzamshahid@gmail.com'
    value={formData.email}
    onChange={handleChange}
  />
  {errors.email && <div className="error text-red-500">{errors.email}</div>}
</div>

<div className='flex mt-4 gap-12'>
  <div className='input-left'>
    <label className='phone-number-label lab-text font-medium'>Phone Number</label>
    <input
      name="phoneNumber"
      className='phone-number-input custom-input w-96 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
      type="text"
      placeholder='1234567890'
      value={formData.phoneNumber}
      onChange={handleChange}
    />
    {errors.phoneNumber && <div className="error text-red-500">{errors.phoneNumber}</div>}
  </div>

  <div className='input-left'>
    <label className='emergency-phone-number-label lab-text font-medium'>Emergency Phone Number</label>
    <input
      name="emergencyPhoneNumber"
      className='emergency-phone-number-input custom-input w-96 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
      type="text"
      placeholder='0987654321'
      value={formData.emergencyPhoneNumber}
      onChange={handleChange}
    />
    {errors.emergencyPhoneNumber && <div className="error text-red-500">{errors.emergencyPhoneNumber}</div>}
  </div>
</div>

<div className='flex mt-4 gap-12'>
  <div className='input-left'>
    <label className='national-id-label lab-text font-medium'>National ID</label>
    <input
      name="nationalId"
      className='national-id-input custom-input w-96 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
      type="number"
      placeholder='ID123456'
      value={formData.nationalId}
      onChange={handleChange}
    />
    {errors.nationalId && <div className="error text-red-500">{errors.nationalId}</div>}
  </div>

  <div className='input-left'>
    <label className='driving-license-label lab-text font-medium'>Driving License</label>
    <input
      name="drivingLicense"
      className='driving-license-input custom-input w-96 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
      type="number"
      placeholder='DL123456'
      value={formData.drivingLicense}
      onChange={handleChange}
    />
    {errors.drivingLicense && <div className="error text-red-500">{errors.drivingLicense}</div>}
  </div>
</div>

<div className='flex mt-4 gap-28'>
  <div className='image flex flex-col input-left'>
    <label className='uploadid-label lab-text font-medium'>Upload ID Card Image:</label>
    <input
      type="file"
      accept="image/*"
      onChange={(e) => handleImageUpload(e, 'idCard')}
    />
    {uploadedImages.idCard && (
      <img src={uploadedImages.idCard} alt="ID Card" className='uploaded-image w-80 h-80 object-cover mt-2 shadow' />
    )}
    {errors.idCard && <div className="error text-red-500">{errors.idCard}</div>}
  </div>

  <div className='image flex flex-col input-left'>
    <label className='uploadlicense-label lab-text font-medium'>Upload Driving License Image:</label>
    <input
      type="file"
      accept="image/*"
      onChange={(e) => handleImageUpload(e, 'drivingLicense')}
    />
    {uploadedImages.drivingLicense && (
      <img src={uploadedImages.drivingLicense} alt="Driving License" className='uploaded-image w-80 h-80 object-cover mt-2 shadow' />
    )}
    {errors.drivingLicense && <div className="error text-red-500">{errors.drivingLicense}</div>}
  </div>
</div>

<button type="submit" className='submit-button button w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-lg'>Submit</button>
</form>
      </div>
    </div>
  );
};

export default Driverd;
