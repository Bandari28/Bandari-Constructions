import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const BandariLogo = () => (
  <svg width="180" height="54" viewBox="0 0 270 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="20" width="25" height="40" rx="5" fill="#273046" />
    <rect x="40" y="20" width="25" height="40" rx="5" fill="#ffb347" />
    <text x="80" y="45" fontFamily="Montserrat, Arial, sans-serif" fontSize="32" fill="#273046" fontWeight="bold">
      BANDARI
    </text>
    <text x="80" y="68" fontFamily="Montserrat, Arial, sans-serif" fontSize="16" fill="#ffb347" letterSpacing="4">
      CONSTRUCTIONS
    </text>
  </svg>
);

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // ✅ Save token and show success
      localStorage.setItem("token", data.token);

      // ✅ Navigate and reset form
      setEmail("");
      setPassword("");
      navigate("/");

    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-50 to-white">
      <div className="flex w-full max-w-4xl rounded-2xl shadow-2xl bg-white/50 overflow-hidden">
        {/* Image Side */}
        <div className="relative hidden md:flex md:w-1/2 bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-50 to-white/70 backdrop-blur-lg" />
          <div className="relative z-10 flex flex-col justify-center items-center h-full px-8">
            <BandariLogo />
            <h2 className="text-2xl font-bold text-purple-800 mb-2 drop-shadow">Find Your Next Home</h2>
            <p className="text-blue-800 text-opacity-80 text-base text-center">
              Experience luxury, comfort, and seamless property discovery.
            </p>
          </div>
        </div>

        {/* Login Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 bg-white/70 backdrop-blur-md">
          <div className="mb-8 w-full text-center flex flex-col items-center">
            <div className="md:hidden mb-4">
              <BandariLogo />
            </div>
            <h1 className="text-3xl font-bold text-purple-900 mb-2">Login to Your Account</h1>
            <p className="text-blue-800 text-opacity-70 text-sm">
              Welcome back! Enter your credentials below.
            </p>
          </div>

          {/* ✅ Corrected Form */}
          <form className="w-full space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-purple-800 font-semibold mb-1" htmlFor="email">
                Email address
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-purple-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                type="email"
                id="email"
                placeholder="you@email.com"
                required
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            <div>
              <label className="block text-purple-800 font-semibold mb-1" htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-purple-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                type="password"
                id="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            <div className="flex items-center justify-end mb-4">
              {/* <label className="flex items-center text-xs text-blue-800 cursor-pointer">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label> */}
              <a href="#" className="text-xs text-purple-700 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 via-blue-500 to-purple-400 text-white font-bold text-lg shadow-md hover:scale-105 transition-transform"
            >
              Log In
            </button>
          </form>

          {/* <div className="mt-6 text-center">
            <p className="text-sm text-blue-800">
              Don't have an account?{" "}
              <a href="/signup" className="font-semibold text-purple-700 hover:underline">
                Sign up
              </a>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
