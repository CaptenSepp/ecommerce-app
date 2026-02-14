import { useState } from "react"; // local open/close state
import { MessageCircle, X } from "lucide-react"; // icon button labels

const AssistantFab = () => { // floating assistant trigger
  const [isOpen, setIsOpen] = useState(false); // panel toggle

  return (
    <div className="assistant-fab"> {/* fixed wrapper */}
      <div id="assistant-panel" className={`assistant-panel ${isOpen ? "assistant-panel--open" : ""}`}> {/* drop-up panel */}
        <div className="assistant-panel__header"> {/* panel header */}
          <span className="assistant-panel__title">Assistant</span> {/* small title */}
          <button
            type="button"
            className="assistant-panel__close"
            aria-label="Close assistant panel"
            onClick={() => setIsOpen(false)} // close panel
          >
            <X size={16} />
          </button>
        </div>
        <div className="assistant-panel__content"> {/* inner padding */}
          <p className="u-text-sm text-muted">AI assistant placeholder</p> {/* temp content */}
          <p className="u-text-sm text-muted">We will add chat here.</p> {/* temp content */}
        </div>
      </div>

      <button
        type="button"
        className="assistant-fab__btn"
        aria-expanded={isOpen}
        aria-controls="assistant-panel"
        onClick={() => setIsOpen((prev) => !prev)} // toggle panel
      >
        <MessageCircle size={20} />
      </button>
    </div>
  );
};

export default AssistantFab;
