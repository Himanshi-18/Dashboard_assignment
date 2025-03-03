import axios from "axios";

const BASE_URL = "http://localhost:5000"; // Make sure json-server is running

// ✅ Get all students
export const getStudents = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/students`);
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};

// ✅ Add a new student
export const addStudent = async (student) => {
  try {
    const response = await axios.post(`${BASE_URL}/students`, student);
    return response.data;
  } catch (error) {
    console.error("Error adding student:", error);
  }
};

// ✅ Update student details
export const updateStudent = async (id, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/students/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating student:", error);
  }
};

// ✅ Delete a student
export const deleteStudent = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/students/${id}`);
  } catch (error) {
    console.error("Error deleting student:", error);
  }
};

// ✅ Get all subjects
export const getSubjects = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/subjects`);
    return response.data;
  } catch (error) {
    console.error("Error fetching subjects:", error);
  }
};

// ✅ Add a new subject
export const addSubject = async (subject) => {
  try {
    const response = await axios.post(`${BASE_URL}/subjects`, { name: subject });
    return response.data;
  } catch (error) {
    console.error("Error adding subject:", error);
  }
};
