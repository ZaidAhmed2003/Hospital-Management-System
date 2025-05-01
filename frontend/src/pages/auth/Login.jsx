// src/pages/auth/Login.jsx
import { useState } from 'react';
import { login } from './../../constants/api';
import { loginSuccess } from './../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Login = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(form);
      dispatch(loginSuccess(data));
      toast.success('Login successful');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 space-y-4">
      <h2 className="text-xl font-bold">Login</h2>
      <input type="email" placeholder="Email" value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full p-2 border rounded" />
      <input type="password" placeholder="Password" value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full p-2 border rounded" />
      <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">Login</button>
    </form>
  );
};

export default Login;
