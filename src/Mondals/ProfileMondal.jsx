import { X } from 'lucide-react';
import React from 'react'

const ProfileMondal = ({onClose }) => {
const localUser = JSON.parse(localStorage.getItem('user'));
  return (
    <div className='absolute top-10  right-20 z-50 bg-white border-l-4 border-red-500 rounded-r-lg p-4 shadow-lg max-w-xs md:max-w-md'>
      <button 
        onClick={onClose}
        className="ml-auto -mx-1.5 -my-1.5 bg-red-50 rounded-lg p-1.5 inline-flex items-center justify-center text-red-500 hover:bg-red-100"
      >
        <X className="h-4 w-4" />
      </button>
      {/* Profile Section */}
    <div>
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p>Name: {localUser.profile.full_name}</p>
      <p>Email: {localUser.Userdata?.user.email}</p>
      <p>Phone: {localUser?.profile.phone}</p>
    </div>
       
    </div>
  )
}

export default ProfileMondal
