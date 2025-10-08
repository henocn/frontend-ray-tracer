import React from "react"

const Sidebar = ({ darkMode }) => {
  return (
    <aside
      className={`w-64 h-full flex flex-col p-4 border-r transition-all duration-300
      ${darkMode ? "bg-slate-900 border-slate-800 text-slate-200" : "bg-slate-100 border-slate-300 text-slate-800"}`}
    >
      <h2 className="text-lg font-semibold mb-4 text-orange-400">
        Configuration
      </h2>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium">Source</label>
        <input
          type="number"
          placeholder="Intensité"
          className={`px-2 py-1 rounded border text-sm
            ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-300"}`}
        />

        <label className="text-sm font-medium">Nombre de rayons</label>
        <input
          type="number"
          placeholder="5000"
          className={`px-2 py-1 rounded border text-sm
            ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-300"}`}
        />

        <button
          className={`mt-4 px-3 py-2 rounded font-medium text-sm
          ${darkMode
            ? "bg-orange-600 hover:bg-orange-500 text-white"
            : "bg-orange-500 hover:bg-orange-400 text-white"}`}
        >
          Appliquer
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
