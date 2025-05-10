import React, { useEffect, useState } from 'react';
import { deleteDoctor, getDoctors } from "@/constants/api";
import {
  showSuccess,
  showError,
  showLoading,
  closeLoading,
} from "@/utils/toast";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getDoctors(50, page);
        setDoctors(response.data.results || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (err) {
        setError("Failed to fetch doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleDelete = async (doctorId, firstName, lastName) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;
    try {
      await deleteDoctor(doctorId);
      setDoctors((prev) => prev.filter((d) => d.id !== doctorId));
      showSuccess(`Docter ${firstName} ${lastName} Deleted Successfully`);
    } catch (err) {
      showError("Failed to delete doctor");
      console.error(err);
    }
  };

  const handleChange = (doctorId) => {
    console.log(`Change details for doctor with ID: ${doctorId}`);
  };

  if (loading) {
    return (
      <div className="text-center text-xl text-gray-500">
        Loading doctors...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="m-6">Hospital Management System {">"} Doctors</div>
      <div className=" mx-auto px-2 mb-5 ">
        {doctors.length > 0 ? (
          <div className="overflow-auto bg-white h-[75vh]">
            <table className="min-w-full table-auto border-collapse border border-gray-300  rounded-lg">
              <thead className="text-black border-b ">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Specialty</th>
                  <th className="py-3 px-4 text-left">Gender</th>
                  <th className="py-3 px-4 text-left">Age</th>
                  <th className="py-3 px-4 text-left">Address</th>
                  <th className="py-3 px-4 text-left">Phone</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor.id} className="border-b">
                    <td className="py-3 px-4">
                      {doctor.firstName} {doctor.lastName}
                    </td>
                    <td className="py-3 px-4">{doctor.specialty}</td>
                    <td className="py-3 px-4">{doctor.gender}</td>
                    <td className="py-3 px-4">{doctor.age}</td>
                    <td className="py-3 px-4">{doctor.address}</td>
                    <td className="py-3 px-4">{doctor.phoneNumber}</td>
                    <td className="py-3 px-4">{doctor.email}</td>
                    <td className="py-3 px-4 flex justify-start space-x-2">
                      <button
                        onClick={() => handleChange(doctor.id)}
                        className="px-4 py-1 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600 transition duration-300"
                      >
                        Change
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(
                            doctor.id,
                            doctor.firstName,
                            doctor.lastName
                          )
                        }
                        className="px-4 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition duration-300"
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
          <div className="text-center text-xl text-gray-500 mt-4">
            No doctors available.
          </div>
        )}

        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ${
              page === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Previous
          </button>
          <span className="text-xl text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ${
              page === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Doctors;
