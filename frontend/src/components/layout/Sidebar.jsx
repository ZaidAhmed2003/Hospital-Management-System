// src/components/layout/Sidebar.jsx
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r shadow-lg p-4">
      <h2 className="text-xl font-bold mb-6">Hospital Panel</h2>
      <nav className="flex flex-col space-y-2">
        <NavLink to="/" className="hover:text-blue-600">Dashboard</NavLink>
        <NavLink to="/doctors" className="hover:text-blue-600">Doctors</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
