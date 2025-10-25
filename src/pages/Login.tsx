import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Basic mock login validation
    if (username.trim() === "dentist" && password === "12345") {
      localStorage.setItem("dentistLoggedIn", "true");
      localStorage.setItem("dentistName", username);
      navigate("/dashboard");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md border border-blue-100">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          🦷 Dentist Login
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 text-sm p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2 transition active:scale-95"
          >
            Login
          </button>
        </form>

        
      </div>
    </div>
  );
}
