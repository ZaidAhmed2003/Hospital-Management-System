// src/layouts/MainLayout.jsx
import Sidebar from './../components/layout/Sidebar';
import Topbar from './../components/layout/Topbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-4 overflow-y-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
