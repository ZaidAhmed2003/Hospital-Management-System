import React, { useEffect, useState } from 'react';
import { deleteDoctor, getDoctors } from './../constants/api';  // Import the getDoctors function

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);  // Initialize doctors as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);  // To handle pagination
  const [totalPages, setTotalPages] = useState(1);  // To track total number of pages

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getDoctors(10, page);  // Pass limit and page
        setDoctors(response.data.results || []);  // Ensure doctors is an empty array if response is empty
        setTotalPages(response.data.totalPages || 1);  // Default totalPages to 1 if undefined
      } catch (err) {
        setError('Failed to fetch doctors');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [page]);  // Re-run the effect whenever the page changes

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleDelete = async (doctorId) => {
    if (!window.confirm('Are you sure you want to delete this doctor?')) return;
    try {
      await deleteDoctor(doctorId);
      setDoctors((prev) => prev.filter((d) => d.id !== doctorId)); // ✅ Update UI
    } catch (err) {
      alert('Failed to delete doctor');
      console.error(err);
    }
  };

  const handleChange = (doctorId) => {
    // Logic for editing a doctor (could navigate to a form or open a modal)
    console.log(`Change details for doctor with ID: ${doctorId}`);
  };

  if (loading) {
    return <div className="text-center text-xl text-gray-500">Loading doctors...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Doctors List</h2>

      {doctors.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-3 px-4 border-b">Name</th>
                <th className="py-3 px-4 border-b">Specialty</th>
                <th className="py-3 px-4 border-b">Gender</th>
                <th className="py-3 px-4 border-b">Age</th>
                <th className="py-3 px-4 border-b">Address</th>
                <th className="py-3 px-4 border-b">Phone</th>
                <th className="py-3 px-4 border-b">Email</th>
                <th className="py-3 px-4 border-b">Actions</th> {/* Added column for actions */}
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id} className="border-b">
                  <td className="py-3 px-4">{doctor.firstName} {doctor.lastName}</td>
                  <td className="py-3 px-4">{doctor.specialty}</td>
                  <td className="py-3 px-4">{doctor.gender}</td>
                  <td className="py-3 px-4">{doctor.age}</td>
                  <td className="py-3 px-4">{doctor.address}</td>
                  <td className="py-3 px-4">{doctor.phoneNumber}</td>
                  <td className="py-3 px-4">{doctor.email}</td>
                  <td className="py-3 px-4 flex space-x-4">
                    <button
                      onClick={() => handleChange(doctor.id)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
                    >
                      Change
                    </button>
                    <button
                      onClick={() => handleDelete(doctor.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-xl text-gray-500 mt-4">No doctors available.</div>
      )}

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className={`px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </button>
        <span className="text-xl text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className={`px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Doctors;
