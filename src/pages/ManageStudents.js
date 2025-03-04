import StudentTable from "../components/StudentTable";

const ManageStudents = ({ isSidebarOpen }) => {
  return (
    <div className={`bg-gray-100 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"} w-full p-5 min-h-screen`}>
      <StudentTable />
    </div>
  );
};

export default ManageStudents;
