import React from "react"
import { Sun, Moon, Languages } from "lucide-react"

const Topbar = ({ darkMode, onToggleTheme, onChangeLang }) => {
  return (
    <header
      className={`flex items-center justify-between px-6 py-3 shadow-md border-b transition-all duration-300 
      ${darkMode ? "bg-slate-900 border-slate-700 text-slate-100" : "bg-slate-100 border-slate-300 text-slate-900"}`}
    >
      <h1 className="text-xl font-semibold tracking-wide text-orange-500">
        OpticalRayTracer
      </h1>

      <div className="flex gap-4">
        <button
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200
            ${darkMode
              ? "bg-slate-800 hover:bg-slate-700 text-orange-400"
              : "bg-white hover:bg-slate-200 text-slate-700 border border-slate-300"}`}
        >
          Simulation
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200
            ${darkMode
              ? "bg-slate-800 hover:bg-slate-700 text-purple-400"
              : "bg-white hover:bg-slate-200 text-slate-700 border border-slate-300"}`}
        >
          Analyse
        </button>
      </div>

      {/* --- Icônes droite --- */}
      <div className="flex items-center gap-4">
        <button
          onClick={onChangeLang}
          className="p-2 hover:opacity-80 transition"
          title="Changer de langue"
        >
          <Languages size={22} />
        </button>

        <button
          onClick={onToggleTheme}
          className="p-2 hover:opacity-80 transition"
          title="Changer de thème"
        >
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>
      </div>
    </header>
  )
}

export default Topbar
