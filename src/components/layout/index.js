import React from "react";
// import Header from "../header";
// import Footer from "../footer";

const Index = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen ">
      {/* <Header /> */}
      <div className="flex-1 layout">{children}</div>
      {/* <Footer /> */}
    </div>
  );
};

export default Index;
