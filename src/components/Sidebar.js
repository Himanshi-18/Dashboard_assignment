import { Link } from "react-router-dom";
import { FaUserCog, FaHome, FaCog } from "react-icons/fa"

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white p-5">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <ul className="mt-5">
        <li className="p-2 hover:bg-gray-700 rounded flex items-center gap-2">
          <FaHome/>
          <Link to="/"> Home</Link>
        </li>
        <li className="p-2 hover:bg-gray-700 rounded flex items-center gap-2">
          <FaUserCog />
          <Link to="/students"> Manage Students</Link>
        </li>
        <li className="p-2 hover:bg-gray-700 rounded flex items-center gap-2">
          <FaCog/>
          <Link to="/settings"> Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
