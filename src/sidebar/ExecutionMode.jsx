import React from "react";

const ExecutionMode = ({ sectionClass, mode, setMode }) => {
  return (
    <div className={sectionClass}>
      <h3 className="text-md font-semibold text-orange-500 mb-2">
        Mode d’exécution
      </h3>
      <button
        onClick={() => setMode((prev) => (prev === 1 ? 0 : 1))}
        className={`w-full px-3 py-2 rounded font-semibold transition ${
          mode === 1
            ? "bg-blue-600 text-white hover:bg-blue-500"
            : "bg-green-600 text-white hover:bg-green-500"
        }`}
      >
        {mode === 1 ? "Séquentielle" : "Parallèle"}
      </button>
    </div>
  );
};

export default ExecutionMode;
