const Navbar = () => {
    return (
      <div className="bg-gray-900 text-white p-4 flex justify-between">
        <h2 className="text-xl font-semibold">Admin Dashboard</h2>
        <div>
          <button className="bg-blue-500 px-3 py-2 rounded">Logout</button>
        </div>
      </div>
    );
  };
  
  export default Navbar;
  