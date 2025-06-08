// src/components/LoginDrawer.tsx
import { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import Login from "../../pages/Login";

const LoginDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger-Button */}
      <button
        onClick={() => setOpen(true)}
        className=""
      >
        <FiLogIn
          size={22}
          color="red"
        />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer-Paneel */}
      <aside
        className={`fixed right-0 top-0 h-screen bg-white shadow-lg z-50
                    transition-transform duration-300
                    ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-2xl"
          aria-label="Close"
        >
          ×
        </button>

        <div className="p-6">
          <Login /> {/* vorhandene Login-Komponente */}
        </div>
      </aside>
    </>
  );
};

export default LoginDrawer;
