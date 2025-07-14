import React, { useState } from 'react';
import { X } from 'lucide-react';
import { signup } from '../util/AuthApi';
import { useAuth } from '../hooks/useHook';
import ErrorToast from '../util/SucessToast';
import SuccessToast from '../util/SucessToast';
const SignupModal = ({ isOpen, onClose }) => {
 const {setUser , user} = useAuth();
 const [error , setError] = useState('');
 const [loading , setLoading] = useState(false);
 const [success , setSuccess] = useState('');
  const [form, setForm] = useState({
    email: '',
    password: '',
    username: '',
    full_name: '',
    phone: '',
    age: '',
    gender: 'Male',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  console.log(user);
  

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
        setError('');
        setSuccess('');
        setLoading(true);
        const res = await signup(form);
        localStorage.setItem('user' , JSON.stringify(res));
        setUser(res);
        console.log(res);
        setSuccess('Account Created Successfully');
        onClose();
    } catch (error) {
       setError(error.message);
    }finally{
        window.location.reload();
        setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        {error && <ErrorToast message={error} onClose={() => setError('')} />}
        {success && <SuccessToast message={success} onClose={() => setSuccess('')} />}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-center text-[#d72f18] mb-4">Create Account</h2>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
              required
            />
          </div>

          {/* Username */}
          <div>
            <label className="text-sm text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
              required
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="text-sm text-gray-700">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>

          {/* Age & Gender */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="text-sm text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>

            <div className="w-1/2">
              <label className="text-sm text-gray-700">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-[#d72f18] text-white py-2 rounded-md hover:bg-[#b52011]"
          >
           {loading ? "Creating..." : " Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
