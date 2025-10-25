export default function Navbar() {
  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <h2 className="text-xl font-bold text-blue-700">Dentist Subsystem</h2>
      <div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Logout
        </button>
      </div>
    </div>
  );
}
