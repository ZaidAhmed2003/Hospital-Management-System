import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import {
  showSuccess,
  showError,
  showLoading,
  closeLoading,
} from "@/utils/toast";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show loading toast
    const loadingToastId = showLoading("Logging in...");

    try {
      // Dispatch the login action
      const result = await dispatch(loginAsync(form));

      // Close the loading toast once the login attempt completes
      closeLoading(loadingToastId);

      // Handle the response and show success or error
      if (result.meta.requestStatus === "fulfilled") {
        showSuccess("Login successful");
        navigate("/"); // Redirect to dashboard or home
      } else {
        showError("Login failed");
      }
    } catch (err) {
      // Close the loading toast if there’s an error
      closeLoading(loadingToastId);
      showError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-amber-200 to-yellow-500">
        <div className="flex flex-col items-center max-w-96 justify-center p-5 bg-white shadow-[15px_15px_0px_0px_rgba(0,_0,_0,_1)] rounded-2xl">
          <h2 className="text-2xl text-center font-bold mb-10">
            Hospital Management System
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-3 pl-12 rounded-lg bg-gray-200 text-gray-700 focus:outline-none focus:ring-0 transition duration-300"
              />
              <span className="absolute left-3 top-4 text-gray-400">
                <FaEnvelope />
              </span>
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full p-3 pl-12 rounded-lg bg-gray-200 text-gray-700 focus:outline-none focus:ring-0 transition duration-300"
              />
              <span className="absolute left-3 top-4 text-gray-400">
                <FaLock />
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 bg-yellow-500 text-white rounded-lg hover:bg-black cursor-pointer focus:outline-none transition duration-300 disabled:opacity-50"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
