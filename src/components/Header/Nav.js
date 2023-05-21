import React from "react";
import NavAdm from "./NavAdm";
import NavUser from "./NavUser";

const Nav = ({ userType }) => {
  return (
    <div>
      {userType === 1 && <NavUser />}{" "}
      {/* Renderiza NavUser se o userType for "user" */}
      {userType === 0 && <NavAdm />}{" "}
      {/* Renderiza NavAdm se o userType for "admin" */}
    </div>
  );
};

export default Nav;
