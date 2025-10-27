import { useState } from "react";
import { useNavigate } from "react-router-dom";
import  supabase  from "../basedata/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 🔐 Supabase email/password login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      // ✅ Successful login
      localStorage.setItem("dentistLoggedIn", "true");
      localStorage.setItem("dentistEmail", email);
      navigate("/dashboard");
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
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2 transition active:scale-95 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
