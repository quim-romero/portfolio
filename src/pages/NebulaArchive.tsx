import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NebulaTerminal from "../components/NebulaTerminal";
import { motion, AnimatePresence } from "framer-motion";

export default function NebulaArchive() {
  const [showWarning, setShowWarning] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = showWarning ? "hidden" : "auto";
  }, [showWarning]);


  const exitPage = () => {
    navigate(-1);
  };

  return (
    <main className="fixed inset-0 z-[9999] backdrop-blur-sm bg-black/30 text-green-400">
      <AnimatePresence>
        {showWarning && (
          <motion.div
            className="fixed inset-0 bg-black/80 text-white flex items-center justify-center z-50 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="max-w-md bg-zinc-900 border border-yellow-500 rounded-xl p-6 shadow-xl text-center">
              <h2 className="text-xl font-semibold mb-4 text-yellow-400">
                ⚠️ NebulaOS is in archived mode
              </h2>
              <p className="text-sm text-zinc-300 mb-4">
                You found a hidden experiment. This interface was part of a
                creative terminal project and may contain visual glitches.
              </p>
              <div className="flex justify-center gap-3 mt-4">
                <button
                  onClick={() => {
                    setShowWarning(false);
                    setTerminalOpen(true);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium px-4 py-2 rounded transition"
                >
                  I understand, continue
                </button>
                <button
                  onClick={exitPage}
                  className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {terminalOpen && (
        <NebulaTerminal
          isOpen={true}
          onClose={exitPage}
        />
      )}
    </main>
  );
}
