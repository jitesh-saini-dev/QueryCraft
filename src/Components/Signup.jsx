import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    phone: "",
    city: "",
    state: "",
    country: "",
  });

  const [error, setError] = useState({});

  const navigate = useNavigate();

  function handlechange(e) {
    e.preventDefault();

    const errorobj = {};

    if (form.name === "") errorobj.name = "Name is required";
    if (form.email === "") errorobj.email = "Email is required";
    if (form.password === "") errorobj.password = "Password is required";
    if (form.age === "") errorobj.age = "Age is required";
    if (form.phone === "") errorobj.phone = "Phone no. is required";
    if (form.city === "") errorobj.city = "City is required";
    if (form.state === "") errorobj.state = "State is required";
    if (form.country === "") errorobj.country = "Country is required";

    setError(errorobj);

    if (Object.keys(errorobj).length === 0) {
      localStorage.setItem("user", JSON.stringify(form));

      alert("Signup Successfully 🎉");

      setForm({
        name: "",
        email: "",
        password: "",
        age: "",
        phone: "",
        city: "",
        state: "",
        country: "",
      });

      navigate("/login");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#eef2f3] to-white flex items-center justify-center p-5 font-[Poppins]">
      <div className="w-full max-w-2xl bg-white border border-[#ccc] rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-5 text-sm bg-gray-100 hover:bg-gray-200 transition-all duration-300 text-[#222] px-4 py-2 rounded-xl font-medium"
        >
          ← Back
        </button>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#222]">
            Create Account 🚀
          </h1>
          <p className="text-[#666] mt-2">
            Fill your details to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handlechange}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`w-full px-5 py-4 rounded-2xl bg-white border text-[#222] placeholder-gray-400 outline-none transition-all duration-300
                ${
                  error.name
                    ? "border-red-500 focus:shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                    : "border-[#ccc] focus:border-[#007bff] focus:shadow-[0_0_10px_rgba(0,123,255,0.3)]"
                }`}
              />
              {error.name && <p className="text-red-500 text-sm mt-1 ml-1">{error.name}</p>}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email Address"
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
                placeholder="Password"
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

            {/* Age */}
            <div>
              <input
                type="number"
                placeholder="Age"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                className={`w-full px-5 py-4 rounded-2xl bg-white border text-[#222] placeholder-gray-400 outline-none transition-all duration-300
                ${
                  error.age
                    ? "border-red-500 focus:shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                    : "border-[#ccc] focus:border-[#007bff] focus:shadow-[0_0_10px_rgba(0,123,255,0.3)]"
                }`}
              />
              {error.age && <p className="text-red-500 text-sm mt-1 ml-1">{error.age}</p>}
            </div>

            {/* Phone */}
            <div>
              <input
                type="text"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={`w-full px-5 py-4 rounded-2xl bg-white border text-[#222] placeholder-gray-400 outline-none transition-all duration-300
                ${
                  error.phone
                    ? "border-red-500 focus:shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                    : "border-[#ccc] focus:border-[#007bff] focus:shadow-[0_0_10px_rgba(0,123,255,0.3)]"
                }`}
              />
              {error.phone && <p className="text-red-500 text-sm mt-1 ml-1">{error.phone}</p>}
            </div>

            {/* City */}
            <div>
              <input
                type="text"
                placeholder="City"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className={`w-full px-5 py-4 rounded-2xl bg-white border text-[#222] placeholder-gray-400 outline-none transition-all duration-300
                ${
                  error.city
                    ? "border-red-500 focus:shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                    : "border-[#ccc] focus:border-[#007bff] focus:shadow-[0_0_10px_rgba(0,123,255,0.3)]"
                }`}
              />
              {error.city && <p className="text-red-500 text-sm mt-1 ml-1">{error.city}</p>}
            </div>

            {/* State */}
            <div>
              <input
                type="text"
                placeholder="State"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                className={`w-full px-5 py-4 rounded-2xl bg-white border text-[#222] placeholder-gray-400 outline-none transition-all duration-300
                ${
                  error.state
                    ? "border-red-500 focus:shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                    : "border-[#ccc] focus:border-[#007bff] focus:shadow-[0_0_10px_rgba(0,123,255,0.3)]"
                }`}
              />
              {error.state && <p className="text-red-500 text-sm mt-1 ml-1">{error.state}</p>}
            </div>

            {/* Country */}
            <div>
              <input
                type="text"
                placeholder="Country"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className={`w-full px-5 py-4 rounded-2xl bg-white border text-[#222] placeholder-gray-400 outline-none transition-all duration-300
                ${
                  error.country
                    ? "border-red-500 focus:shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                    : "border-[#ccc] focus:border-[#007bff] focus:shadow-[0_0_10px_rgba(0,123,255,0.3)]"
                }`}
              />
              {error.country && <p className="text-red-500 text-sm mt-1 ml-1">{error.country}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-8 py-4 rounded-2xl bg-[#007bff] hover:bg-blue-600 text-white font-bold text-lg shadow-[0_5px_15px_rgba(0,123,255,0.3)] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,123,255,0.4)] transition-all duration-300"
          >
            Create Account
          </button>

          {/* Login Redirect */}
          <p className="text-center text-[#666] mt-5">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#007bff] font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;