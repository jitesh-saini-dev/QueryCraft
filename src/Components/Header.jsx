import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="navbar">
      <Link to={"/"} className="link">
        Food Items
      </Link>
    </div>
  );
};

export default Header;
