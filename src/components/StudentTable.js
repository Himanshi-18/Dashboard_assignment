import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaBook, FaEdit, FaTrash } from "react-icons/fa";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/students/${id}`);
      fetchStudents(); // Refresh the list
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center space-x-2">
          <FaBook className="text-3xl text-orange-600" />
          <h2 className="text-3xl font-bold text-gray-700">Students</h2>
        </div>
        <button
          onClick={() => navigate("/add-student")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition"
        >
          Add Student
        </button>
      </div>

      {/* Table Wrapper for Scrollable Content */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full table-fixed border-collapse">
          {/* Table Head */}
          <thead>
            <tr className="bg-gray-800 text-white h-12">
              <th className="px-4 py-3 text-left w-20">Image</th>
              <th className="px-4 py-3 text-left w-28">First Name</th>
              <th className="px-4 py-3 text-left w-28">Last Name</th>
              <th className="px-4 py-3 text-left w-36">Student ID</th>
              <th className="px-4 py-3 text-left w-52">Email</th>
              <th className="px-4 py-3 text-left w-52">Address</th>
              <th className="px-4 py-3 text-left w-60">Subjects</th>
              <th className="px-4 py-3 text-left w-24">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b h-16 hover:bg-gray-100">
                <td className="px-4 py-3">
                  <img
                    src={student.image}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                </td>
                <td className="px-4 py-3">{student.firstName}</td>
                <td className="px-4 py-3">{student.lastName}</td>
                <td className="px-4 py-3 font-semibold text-gray-700">
                  {student.studentId}
                </td>
                <td className="px-4 py-3 max-w-xs truncate overflow-hidden whitespace-nowrap">
                  {student.email}
                </td>
                <td className="px-4 py-3 max-w-xs truncate overflow-hidden whitespace-nowrap">
                  {student.address}
                </td>
                <td className="px-4 py-3 max-w-xs truncate overflow-hidden whitespace-nowrap">
                  {student.subjects.join(", ")}
                </td>
                <td className="px-4 py-3 flex justify-between items-center">
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="hover:bg-red-600 p-2 rounded-md transition"
                  >
                    <FaTrash className="text-xl text-red-600" />
                  </button>

                  {/* Edit Button */}
                  <button
                    onClick={() => navigate(`/edit-student/${student.id}`)}
                    className="hover:bg-green-600 p-2 rounded-md transition"
                  >
                    <FaEdit className="text-xl text-green-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
