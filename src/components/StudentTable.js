import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await axios.get("http://localhost:5000/students");
    setStudents(response.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/students/${id}`);
    fetchStudents();
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Students</h2>
        <button
          onClick={() => navigate("/add-student")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Student
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="">Image</th>
            <th className="">First Name</th>
            <th className="">Last Name</th>
            <th className="">Student ID</th>
            <th className="">Email</th>
            <th className="">Address</th>
            <th className="">Subjects</th>
            <th className="">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="border-b">
              <td>
                <img
                  src={student.image}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
              </td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.studentId}</td>
              <td>{student.email}</td>
              <td>{student.address}</td>
              <td>{student.subjects.join(", ")}</td>
              <td>
                <button
                  onClick={() => handleDelete(student.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                >
                  🗑️
                </button>
                <button className="bg-green-500 text-white px-2 py-1 rounded">
                  ✏️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
