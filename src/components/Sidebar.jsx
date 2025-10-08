import React, { useState } from "react"

const defaultParams = {
  Point: { position: [0, 3, 0], intensity: 1 },
  Directional: { position: [0, 3, 0], direction: [0, -1, 0], intensity: 1 },
  // Tu peux ajouter d'autres types de sources ici
}

const Sidebar = ({ darkMode, onAddSource }) => {
  const [type, setType] = useState("Point")
  const [params, setParams] = useState(defaultParams[type])
  const [rayCount, setRayCount] = useState(5000)

  // Mise à jour automatique des paramètres quand le type change
  const handleTypeChange = (e) => {
    const t = e.target.value
    setType(t)
    setParams(defaultParams[t])
  }

  const handleParamChange = (key, value) => {
    setParams({ ...params, [key]: value })
  }

  const handleAddSource = () => {
    if (onAddSource) {
      onAddSource({ type, params, rayCount })
    }
  }

  return (
    <aside
      className={`w-64 h-full flex flex-col p-4 border-r transition-all duration-300
      ${darkMode ? "bg-slate-900 border-slate-800 text-slate-200" : "bg-slate-100 border-slate-300 text-slate-800"}`}
    >
      <h2 className="text-lg font-semibold mb-4 text-orange-400">
        Ajouter une source
      </h2>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium">Type de source</label>
        <select
          value={type}
          onChange={handleTypeChange}
          className={`px-2 py-1 rounded border text-sm
            ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-300"}`}
        >
          {Object.keys(defaultParams).map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        {Object.keys(params).map((key) => (
          <div key={key}>
            <label className="text-sm font-medium">{key}</label>
            <input
              type="text"
              value={Array.isArray(params[key]) ? params[key].join(",") : params[key]}
              onChange={(e) => {
                const val = e.target.value.split(",").map(Number)
                handleParamChange(key, Array.isArray(params[key]) ? val : Number(e.target.value))
              }}
              className={`px-2 py-1 rounded border text-sm
                ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-300"}`}
            />
          </div>
        ))}

        <label className="text-sm font-medium">Nombre de rayons</label>
        <input
          type="number"
          value={rayCount}
          onChange={(e) => setRayCount(Number(e.target.value))}
          className={`px-2 py-1 rounded border text-sm
            ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-300"}`}
        />

        <button
          onClick={handleAddSource}
          className={`mt-4 px-3 py-2 rounded font-medium text-sm
          ${darkMode
            ? "bg-orange-600 hover:bg-orange-500 text-white"
            : "bg-orange-500 hover:bg-orange-400 text-white"}`}
        >
          Ajouter la source
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
