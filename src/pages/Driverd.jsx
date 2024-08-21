import React from 'react'
import ImageUpload from '../components/ImageUpload'


const Driverd = () => {
  return (
    <div className='main  bg-white flex flex-col'>
      <h1 className='text-4xl bg-blue-500 text-white p-3 rounded-sm'>Drivers Details</h1>

      <div className='form'>
        <form >
          <div className='image flex justify-start p-5'>
            <ImageUpload />
          </div>
          <div className='flex mt-3 gap-10'>
            {/* this is first name and last name in flex property side by side */}
            <div className='flex flex-col gap-2 text-left'>
              <label class='first-namelabel lab-text'> First Name </label>
              <input class='first-nameinput custom-input w-96' type="text" placeholder='Mozzam' />
            </div>

            <div className='flex flex-col gap-2 text-left'>
              <label class='last-namelabel lab-text'>Last Name</label>
              <input class='last-nameinput custom-input w-96' type="text" placeholder='Shahid' />
            </div>
          </div>

          <div className='email flex flex-col gap-2 text-left mt-3'>
            <label class='email-label lab-text'>Email:</label>
            <input class='email-input custom-input w-96' type="email" placeholder='mozzamshahid@gmail.com' />
          </div>
          {/* this is phone number and emergency phone number in flex property side by side */}
          <div className='flex mt-3 gap-10'>

            <div className='flex flex-col gap-2 text-left'>
              <label class='phone-label lab-text'>Phone Number</label>
              <input class='phone-input custom-input w-96' type="phone" placeholder='+68' />
            </div>

            <div className='flex flex-col gap-2 text-left'>
              <label class='ephone-label lab-text'>Emergency Phone Number</label>
              <input class='ephone-input custom-input w-96' type="phone" placeholder='+68' />
            </div>
          </div>

          {/* this is national id number and driving lisence in flex property side by side */}
          <div className='flex mt-3 gap-10'>

            <div className='flex flex-col gap-2 text-left'>
              <label class='id-label lab-text'>National ID  Number</label>
              <input class='id-input custom-input w-96' type="number" placeholder='Your National ID Number' />
            </div>

            <div className='flex flex-col gap-2 text-left'>
              <label class='d-name lab-text'>Driving License Number</label>
              <input class='d-input custom-input w-96' type="number" placeholder='Your Driving License Number' />
            </div>
          </div>

          <div className=' flex flex-col gap-2 text-left mt-3'>
            <label class='uploadid-label lab-text'>Upload ID Card Image:</label>
            <div className='image flex justify-start p-5'>
              <ImageUpload
              />

            </div>
          </div>

          <div className=' flex flex-col gap-2 text-left mt-3'>
            <label class='drivingid-label lab-text'>Upload Driving Lisence Image:</label>
            <div className='image flex justify-start p-5'>
              <ImageUpload
              />

            </div>
          </div>

          <input className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 w-full' type="submit" />



        </form>

      </div>

    </div>
  )
}

export default Driverd
