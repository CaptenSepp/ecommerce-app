import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Main from "../../components/Main";

const Layout: React.FC = () => (
  <div className="layout">
    <Header />

    <Main />

    <Footer />
  </div>
);

export default Layout;
