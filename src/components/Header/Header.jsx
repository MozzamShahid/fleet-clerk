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
          <li><Link to="/" className='hover:text-gray-400'>Home</Link></li>
          <li><Link to="/pricing" className='hover:text-gray-400'>Pricing</Link></li>
          <li><Link to="/docs" className='hover:text-gray-400'>Docs</Link></li>
          <li><Link to="/driverd" className='hover:text-gray-400'>Driver Details</Link></li>
        </ul>
      </nav>
      <div>
        <SignedOut>
          <SignInButton className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500'/>
        </SignedOut>
        <SignedIn>
          <UserButton className='text-lg' />
        </SignedIn>
      </div>
    </div>
  )
}

export default Header
