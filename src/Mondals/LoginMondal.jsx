import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../hooks/useHook';
import { login, loginWithLink } from '../util/AuthApi';
import ErrorToast from '../util/ErrorToast';
import SuccessToast from '../util/SucessToast';

const LoginModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState('password'); // 'password' or 'magic'
  const [form, setForm] = useState({ email: '', password: '' });
 const {setUser} = useAuth();
 const [error , setError] = useState('');
 const [success , setSuccess] = useState('');
 const [loading , setLoading] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (mode === 'magic') {
      try {
        setError('');
        setSuccess('');
       const res =  await loginWithLink(form.email);
        setSuccess('Magic Link Sent Successfully');
        localStorage.setItem('user' , JSON.stringify(res));
        onClose();
      } catch (error) {
        setError(error.message);
        console.log(error);
      }finally{
        window.location.reload();
        setLoading(false);
      }
    } else {
       try {
        setError('');
        setSuccess('');
        const res = await login(form.email, form.password);
        localStorage.setItem('user' , JSON.stringify(res));
        setSuccess('Login Successfully');
        setUser(res);
       } catch (error) {
        console.error(error);
        setError(error.message);
       }finally{
        window.location.reload();
        setLoading(false);
       }
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-sm rounded-lg p-6 shadow-lg relative">
        {/* Close Button */}
        {error && <ErrorToast message={error} onClose={() => setError('')} />}
        {success && <SuccessToast message={success} onClose={() => setSuccess('')} />}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-center text-[#d72f18] mb-4">Login</h2>

        {/* Toggle Login Method */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setMode('password')}
            className={`px-4 py-1 border-b-2 ${
              mode === 'password'
                ? 'border-[#d72f18] text-[#d72f18]'
                : 'border-transparent text-gray-500'
            }`}
          >
            Email & Password
          </button>
          <button
            onClick={() => setMode('magic')}
            className={`px-4 py-1 border-b-2 ${
              mode === 'magic'
                ? 'border-[#d72f18] text-[#d72f18]'
                : 'border-transparent text-gray-500'
            }`}
          >
            Email Link
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field (common) */}
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

          {/* Password Field (only for password login) */}
          {mode === 'password' && (
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
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#d72f18] text-white py-2 rounded-md hover:bg-[#b52011]"
          >
            {loading ? 'Loading...' : ''}
            {mode === 'magic' ? 'Send Login Link' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
