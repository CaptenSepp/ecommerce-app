import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <main className="flex-1"> {/* route outlet wrapper */}
      <Outlet /> {/* nested route content */}
    </main>
  );
};

export default Main;
