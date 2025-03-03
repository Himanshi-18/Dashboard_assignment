import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import AddStudentForm from "../pages/AddStudentForm"; 
import ManageStudents from "../pages/ManageStudents";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<ManageStudents />} />
        <Route path="/add-student" element={<AddStudentForm />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
