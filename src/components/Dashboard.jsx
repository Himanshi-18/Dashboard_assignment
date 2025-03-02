import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        <Navbar />
        <div className="p-5">
          <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
          <div className="grid grid-cols-3 gap-4 mt-5">
            {/* Cards */}
            <div className="p-5 bg-white shadow rounded">📊 Statistics</div>
            <div className="p-5 bg-white shadow rounded">👤 Users</div>
            <div className="p-5 bg-white shadow rounded">⚙️ Settings</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
