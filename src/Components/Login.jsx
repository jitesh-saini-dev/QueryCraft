import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Error state add kar diya Signup ki tarah
  const [error, setError] = useState({});

  const navigate = useNavigate();

  function handlechange(e) {
    e.preventDefault();

    const errorobj = {};

    // 1. Khali (Empty) fields ki validation
    if (form.email === "") errorobj.email = "Email is required";
    if (form.password === "") errorobj.password = "Password is required";

    // Agar khali hai toh yahi se wapas bhej do error set karke
    if (Object.keys(errorobj).length > 0) {
      setError(errorobj);
      return;
    }

    // 2. LocalStorage se user nikalna
    const result = JSON.parse(localStorage.getItem("user"));

    if (!result) {
      alert("You Have to SignUp First!");
      navigate("/signup");
      return;
    }

    // 3. Match validation (Alert ki jagah error messages set kar diye UI ke liye)
    if (form.email !== result.email && form.password !== result.password) {
      errorobj.email = "Email not matched!";
      errorobj.password = "Password not matched!";
      setError(errorobj);
    } else if (form.email !== result.email) {
      errorobj.email = "Email not matched!";
      setError(errorobj);
    } else if (form.password !== result.password) {
      errorobj.password = "Password not matched!";
      setError(errorobj);
    } else {
      // Agar sab sahi hai toh error clear karo aur login karao
      setError({});
      alert("Login Successfully 🔥");
      navigate("/");
      localStorage.setItem("token", true);
      
      setForm({
        email: "",
        password: "",
      });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#eef2f3] to-white flex items-center justify-center p-5 font-[Poppins]">
      <div className="w-full max-w-md bg-white border border-[#ccc] rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-5 text-sm bg-gray-100 hover:bg-gray-200 transition-all duration-300 text-[#222] px-4 py-2 rounded-xl font-medium"
        >
          ← Back
        </button>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#222]">Welcome Back 👋</h1>
          <p className="text-[#666] mt-2">Login to continue your journey</p>
        </div>

        {/* Form */}
        <form onSubmit={handlechange} className="space-y-5">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Enter your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={`w-full px-5 py-4 rounded-2xl bg-white border text-[#222] placeholder-gray-400 outline-none transition-all duration-300
              ${
                error.email
                  ? "border-red-500 focus:shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                  : "border-[#ccc] focus:border-[#007bff] focus:shadow-[0_0_10px_rgba(0,123,255,0.3)]"
              }`}
            />
            {error.email && <p className="text-red-500 text-sm mt-1 ml-1">{error.email}</p>}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Enter your Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className={`w-full px-5 py-4 rounded-2xl bg-white border text-[#222] placeholder-gray-400 outline-none transition-all duration-300
              ${
                error.password
                  ? "border-red-500 focus:shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                  : "border-[#ccc] focus:border-[#007bff] focus:shadow-[0_0_10px_rgba(0,123,255,0.3)]"
              }`}
            />
            {error.password && <p className="text-red-500 text-sm mt-1 ml-1">{error.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 py-4 rounded-2xl bg-[#007bff] hover:bg-blue-600 text-white font-bold text-lg shadow-[0_5px_15px_rgba(0,123,255,0.3)] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,123,255,0.4)] transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;