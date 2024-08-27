import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='bg-gray-800 text-white flex justify-between items-center p-4 shadow-md'>
      <h1 className='text-2xl font-bold'>
        <Link to="/">Fleet</Link>
      </h1>
      <nav>
        <ul className='flex space-x-6 text-lg'>
          {/* <li><Link to="/" className='hover:text-gray-400'>Home</Link></li> */}
          <li><Link to="/driverd" className='hover:text-gray-400'>Driver Details</Link></li>
          <li><Link to="/cardetaild" className='hover:text-gray-400'>Car Details</Link></li>
          <li><Link to="/carmaintainance" className='hover:text-gray-400'>Car Maintenance</Link></li>
          <li><Link to="/userprofile" className='hover:text-gray-400'>User Profile</Link></li>
          <li><Link to="/admin" className='hover:text-gray-400'>Admin Dashboard</Link></li>
          {/* <li><Link to="/admin/driver/:id" className='hover:text-gray-400'>Drivers Details</Link></li> */}
        </ul>
      </nav>
      <div>
        <SignedOut>
          <SignInButton className='button'/>
        </SignedOut>
        <SignedIn>
          <UserButton className='text-lg' />
        </SignedIn>
      </div>
    </div>
  )
}

export default Header
