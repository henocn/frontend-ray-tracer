import React, { useState } from "react"

const Sidebar = ({ darkMode, onApplyConfig }) => {
  const [sourceType, setSourceType] = useState("Pointue")
  const [sourcePos, setSourcePos] = useState("0,3,0")
  const [sourceSize, setSourceSize] = useState({ width: 1, height: 1 })

  const [geometryType, setGeometryType] = useState("Cylindrique")
  const [geometryParams, setGeometryParams] = useState({
    size: 2,
    height: 1.5,
    position: "0,0,0",
  })
  const [geometryEquation, setGeometryEquation] = useState("z = x² + y²")

  const [rayCount, setRayCount] = useState(5000)

  const handleApply = () => {
    const parsedSourcePos = sourcePos.split(",").map(Number)
    const parsedGeoPos = geometryParams.position
      .split(",")
      .map((v) => Number(v.trim()))

    const config = {
      source: {
        type: sourceType,
        position: parsedSourcePos,
        ...(sourceType === "Large" ? sourceSize : {}),
      },
      geometry: {
        type: geometryType,
        params: { ...geometryParams, position: parsedGeoPos },
        equation: geometryEquation,
      },
      rayCount,
    }

    if (onApplyConfig) onApplyConfig(config)
  }

  const sectionClass = `rounded-xl p-3 mb-4 border ${
    darkMode
      ? "bg-slate-800 border-slate-700"
      : "bg-white border-slate-300 shadow-sm"
  }`

  const labelClass = "text-sm font-medium mb-1"
  const inputClass = `px-2 py-1 rounded border text-sm w-full ${
    darkMode ? "bg-slate-700 border-slate-600" : "bg-white border-slate-300"
  }`

  return (
    <aside
      className={`w-72 h-full flex flex-col p-4 border-r overflow-y-auto transition-all duration-300
      ${
        darkMode
          ? "bg-slate-900 border-slate-800 text-slate-200"
          : "bg-slate-100 border-slate-300 text-slate-800"
      }`}
    >
      <h2 className="text-lg font-semibold mb-4 text-orange-400">
        Configuration
      </h2>

      {/* SECTION 1 : SOURCE */}
      <div className={sectionClass}>
        <h3 className="text-md font-semibold text-orange-500 mb-2">
          Source
        </h3>

        <label className={labelClass}>Type de source</label>
        <select
          value={sourceType}
          onChange={(e) => setSourceType(e.target.value)}
          className={inputClass}
        >
          <option value="Pointue">Pointue</option>
          <option value="Large">Large</option>
        </select>

        <label className={labelClass} style={{ marginTop: "0.5rem" }}>
          Position (x, y, z)
        </label>
        <input
          type="text"
          value={sourcePos}
          onChange={(e) => setSourcePos(e.target.value)}
          placeholder="ex: 0,3,0"
          className={inputClass}
        />

        {sourceType === "Large" && (
          <div className="flex gap-2 mt-2">
            <div className="flex-1">
              <label className={labelClass}>Largeur</label>
              <input
                type="number"
                value={sourceSize.width}
                onChange={(e) =>
                  setSourceSize({ ...sourceSize, width: Number(e.target.value) })
                }
                className={inputClass}
              />
            </div>
            <div className="flex-1">
              <label className={labelClass}>Hauteur</label>
              <input
                type="number"
                value={sourceSize.height}
                onChange={(e) =>
                  setSourceSize({
                    ...sourceSize,
                    height: Number(e.target.value),
                  })
                }
                className={inputClass}
              />
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2 : GÉOMÉTRIE */}
      <div className={sectionClass}>
        <h3 className="text-md font-semibold text-orange-500 mb-2">
          Géométrie
        </h3>

        <label className={labelClass}>Type</label>
        <select
          value={geometryType}
          onChange={(e) => setGeometryType(e.target.value)}
          className={inputClass}
        >
          <option value="Cylindrique">Cylindrique</option>
          <option value="Sphérique">Sphérique</option>
          <option value="RingArray">RingArray</option>
          <option value="Quelconque">Quelconque</option>
        </select>

        <div className="mt-2 flex flex-col gap-2">
          {Object.entries(geometryParams).map(([key, value]) => (
            <div key={key}>
              <label className={labelClass}>{key}</label>
              <input
                type="text"
                value={
                  Array.isArray(value) ? value.join(",") : String(value)
                }
                onChange={(e) =>
                  setGeometryParams({
                    ...geometryParams,
                    [key]: e.target.value,
                  })
                }
                className={inputClass}
              />
            </div>
          ))}
        </div>

        <label className={labelClass} style={{ marginTop: "0.5rem" }}>
          Équation
        </label>
        <input
          type="text"
          value={geometryEquation}
          onChange={(e) => setGeometryEquation(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* SECTION 3 : RAYONS */}
      <div className={sectionClass}>
        <h3 className="text-md font-semibold text-orange-500 mb-2">
          Rayons
        </h3>

        <label className={labelClass}>Nombre de rayons</label>
        <input
          type="number"
          value={rayCount}
          onChange={(e) => setRayCount(Number(e.target.value))}
          className={inputClass}
        />
      </div>

      {/* BOUTON APPLIQUER */}
      <button
        onClick={handleApply}
        className={`mt-2 px-3 py-2 rounded font-medium text-sm
        ${
          darkMode
            ? "bg-orange-600 hover:bg-orange-500 text-white"
            : "bg-orange-500 hover:bg-orange-400 text-white"
        }`}
      >
        Appliquer la configuration
      </button>
    </aside>
  )
}

export default Sidebar
