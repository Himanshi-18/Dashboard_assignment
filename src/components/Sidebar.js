import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white p-5">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <ul className="mt-5">
        <li className="p-2 hover:bg-gray-700 rounded">
          <Link to="/">🏠 Home</Link>
        </li>
        <li className="p-2 hover:bg-gray-700 rounded">
          <Link to="/users">👤 Users</Link>
        </li>
        <li className="p-2 hover:bg-gray-700 rounded">
          <Link to="/settings">⚙️ Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
