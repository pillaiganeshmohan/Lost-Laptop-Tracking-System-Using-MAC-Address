import React from "react";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="w-full h-dvh bg-black">
      <div className="w-full h-[10vh] z-20">
        <Navbar />
      </div>
      <div className="w-full h-[89vh]">{children}</div>
    </div>
  );
}

export default Layout;
