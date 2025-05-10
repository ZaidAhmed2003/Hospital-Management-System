import { useDispatch } from "react-redux";
import { logout } from "./../../features/auth/authSlice"; // Import logout action
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action to clear user data
    navigate("/"); // Redirect to login page
  };

  return (
    <header className="h-16  bg-white flex items-center justify-between px-6 shadow-md">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <div>
        <button onClick={handleLogout} className=" font-semibold">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;
