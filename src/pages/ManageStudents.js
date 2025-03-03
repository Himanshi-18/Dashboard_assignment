import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StudentTable from "../components/StudentTable";

const ManageStudents = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        <Navbar />
        
        {/* Student list */}
        <StudentTable />
      </div>
    </div>
  );
};

export default ManageStudents;
