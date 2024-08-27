import React, { useState } from 'react';
import { db, storage } from '../firebase'; // Import Firebase configuration
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Driverd = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    emergencyPhoneNumber: '',
    nationalId: '',
    drivingLicense: '',
  });

  const [uploadedImages, setUploadedImages] = useState({
    idCard: null,
    profileImg: null,
    drivingLicense: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageUpload = async (event, imageType) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const storageRef = ref(storage, `images/${imageType}/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setUploadedImages(prevState => ({
          ...prevState,
          [imageType]: downloadURL
        }));
      } catch (error) {
        console.error("Error uploading file:", error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'drivers'), {
        firstName: formData.firstName || '',
        lastName: formData.lastName || '',
        email: formData.email || '',
        phoneNumber: formData.phoneNumber || '',
        emergencyPhoneNumber: formData.emergencyPhoneNumber || '',
        nationalId: formData.nationalId || '',
        drivingLicense: formData.drivingLicense || '',
        idCardImage: uploadedImages.idCard || '',
        profileImgImage: uploadedImages.profileImg || '',
        drivingLicenseImage: uploadedImages.drivingLicense || ''
      });
      console.log("Document written with ID: ", docRef.id);
      alert('Form Data and Images uploaded successfully!');
    } catch (error) {
      console.error('Error adding document:', error.message);
      alert('Error submitting the form. Please try again.');
    }
  };
  

  return (

    
    
    <div className='main bg-white flex flex-col w-full'>
      <h1 className='text-4xl bg-blue-500 text-white p-3 rounded-sm'>Drivers Details</h1>
      <div className='form mt-4'>
        <form onSubmit={handleSubmit}>

        <div className='image flex flex-col input-left'>
            <label className='uploadid-label lab-text'>Profile Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 'profileImg')}
            />
            {uploadedImages.profileImg && (
              <img src={uploadedImages.profileImg} alt="Profile Image" className='uploaded-image' />
            )}
          </div>


          <div className='flex mt-3 gap-10'>
            <div className='input-left'>
              <label className='first-namelabel lab-text'>First Name</label>
              <input
                name="firstName"
                className='first-nameinput custom-input w-96'
                type="text"
                placeholder='Mozzam'
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className='input-left'>
              <label className='last-namelabel lab-text'>Last Name</label>
              <input
                name="lastName"
                className='last-nameinput custom-input w-96'
                type="text"
                placeholder='Shahid'
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='email input-left mt-3'>
            <label className='email-label lab-text'>Email:</label>
            <input
              name="email"
              className='email-input custom-input w-96'
              type="email"
              placeholder='mozzamshahid@gmail.com'
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className='flex mt-3 gap-10'>
            <div className='input-left'>
              <label className='phone-number-label lab-text'>Phone Number</label>
              <input
                name="phoneNumber"
                className='phone-number-input custom-input w-96'
                type="text"
                placeholder='1234567890'
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div className='input-left'>
              <label className='emergency-phone-number-label lab-text'>Emergency Phone Number</label>
              <input
                name="emergencyPhoneNumber"
                className='emergency-phone-number-input custom-input w-96'
                type="text"
                placeholder='0987654321'
                value={formData.emergencyPhoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='flex mt-3 gap-10'>
            <div className='input-left'>
              <label className='national-id-label lab-text'>National ID</label>
              <input
                name="nationalId"
                className='national-id-input custom-input w-96'
                type="number"
                placeholder='ID123456'
                value={formData.nationalId}
                onChange={handleChange}
              />
            </div>

            <div className='input-left'>
              <label className='driving-license-label lab-text'>Driving License</label>
              <input
                name="drivingLicense"
                className='driving-license-input custom-input w-96'
                type="text"
                placeholder='DL123456'
                value={formData.drivingLicense}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='flex mt-3 gap-28'>
          <div className='image flex flex-col input-left'>
            <label className='uploadid-label lab-text'>Upload ID Card Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 'idCard')}
            />
            {uploadedImages.idCard && (
              <img src={uploadedImages.idCard} alt="ID Card" className='uploaded-image' />
            )}
          </div>

          <div className='image flex flex-col input-left'>
            <label className='uploadlicense-label lab-text'>Upload Driving License Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 'drivingLicense')}
            />
            {uploadedImages.drivingLicense && (
              <img src={uploadedImages.drivingLicense} alt="Driving License" className='uploaded-image' />
            )}
          </div>
          </div>

          <button type="submit" className='submit-button button w-full mt-5'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Driverd;
