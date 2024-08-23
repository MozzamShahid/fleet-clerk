import React, { useState } from 'react';
import ImageUpload from '../components/ImageUpload';

const Driverd = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    emergencyPhoneNumber: '',
    nationalId: '',
    drivingLicense: '',
  });

  // State for uploaded images
  const [uploadedImages, setUploadedImages] = useState({
    idCard: null,
    drivingLicense: null
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle image uploads
  const handleImageUpload = (event, imageType) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImages(prevState => ({
        ...prevState,
        [imageType]: URL.createObjectURL(file)
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    console.log('Uploaded Images:', uploadedImages);
  };

  return (
    <div className='main bg-white flex flex-col'>
      <h1 className='text-4xl bg-blue-500 text-white p-3 rounded-sm'>Drivers Details</h1>

      <div className='form'>
        <form onSubmit={handleSubmit}>
          <div className='image flex justify-start p-5'>
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

          <div className='flex mt-3 gap-10'>
            <div className='flex flex-col gap-2 text-left'>
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

            <div className='flex flex-col gap-2 text-left'>
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

          <div className='email flex flex-col gap-2 text-left mt-3'>
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
            <div className='flex flex-col gap-2 text-left'>
              <label className='phone-label lab-text'>Phone Number</label>
              <input
                name="phoneNumber"
                className='phone-input custom-input w-96'
                type="text"
                placeholder='+68'
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div className='flex flex-col gap-2 text-left'>
              <label className='ephone-label lab-text'>Emergency Phone Number</label>
              <input
                name="emergencyPhoneNumber"
                className='ephone-input custom-input w-96'
                type="text"
                placeholder='+68'
                value={formData.emergencyPhoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='flex mt-3 gap-10'>
            <div className='flex flex-col gap-2 text-left'>
              <label className='id-label lab-text'>National ID Number</label>
              <input
                name="nationalId"
                className='id-input custom-input w-96'
                type="text"
                placeholder='Your National ID Number'
                value={formData.nationalId}
                onChange={handleChange}
              />
            </div>

            <div className='flex flex-col gap-2 text-left'>
              <label className='d-name lab-text'>Driving License Number</label>
              <input
                name="drivingLicense"
                className='d-input custom-input w-96'
                type="text"
                placeholder='Your Driving License Number'
                value={formData.drivingLicense}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='flex flex-col gap-2 text-left mt-3'>
            <label className='drivingid-label lab-text'>Upload Driving License Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 'drivingLicense')}
            />
            {uploadedImages.drivingLicense && (
              <img src={uploadedImages.drivingLicense} alt="Driving License" className='uploaded-image' />
            )}
          </div>

          <input
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 w-full'
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
};

export default Driverd;
