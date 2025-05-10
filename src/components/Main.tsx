import { Outlet } from "react-router-dom";
import ContactSection from "./ContactSection";

const Main = () => {
  return (
    <main className="flex-1">
      <Outlet />
      <section className="section" />
      <div className="relative flex flex-col items-left h-70 bg-cover bg-center bg-no-repeat bg-gray-200">
        <ContactSection />
      </div>
    </main>
  );
};

export default Main;
