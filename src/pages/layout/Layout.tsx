import React from "react";
import Footer from "../../components/layout-page/Footer";
import Header from "../../components/layout-page/Header";
import Main from "../../components/layout-page/Main";

const Layout: React.FC = () => (
  <div className="layout">
    <Header />

    <Main />

    <Footer />
  </div>
);

export default Layout;
