import React from "react";
import logo from "../img/logo.webp";

function Header() {
  return (
    <div id="logo">
      <img src={logo} alt="TicTacToe " />
      <h1 id="title">But You Always Loose</h1>
    </div>
  );
}
export default Header;
