import { Routes, Route } from "react-router-dom";
import AddStudentForm from "../pages/AddStudentForm"; 
import ManageStudents from "../pages/ManageStudents";
import EditStudent from "../pages/EditStudent";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/students" element={<ManageStudents />} />
      <Route path="/add-student" element={<AddStudentForm />} />
      <Route path="/edit-student/:id" element={<EditStudent />} />
    </Routes>
  );
};

export default AppRoutes;
