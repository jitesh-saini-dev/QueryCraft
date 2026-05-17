import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full h-[70px] flex items-center justify-center gap-6 flex-wrap bg-white border-b border-gray-200 shadow-sm px-5">
      
      <Link
        to={"/"}
        className="text-[17px] font-semibold px-5 py-2 rounded-xl text-black bg-white transition-all duration-300 hover:text-blue-500 hover:bg-blue-50 hover:-translate-y-1"
      >
        Food Items
      </Link>

      <Link
        to={"/signup"}
        className="text-[17px] font-semibold px-5 py-2 rounded-xl text-black bg-white transition-all duration-300 hover:text-blue-500 hover:bg-blue-50 hover:-translate-y-1"
      >
        Signup
      </Link>

      <Link
        to={"/login"}
        className="text-[17px] font-semibold px-5 py-2 rounded-xl text-black bg-white transition-all duration-300 hover:text-blue-500 hover:bg-blue-50 hover:-translate-y-1"
      >
        Login
      </Link>
    </div>
  );
};

export default Header;