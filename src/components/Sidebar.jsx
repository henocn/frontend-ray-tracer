import React, { useState } from "react";
import { Trash2 } from "lucide-react";

// Définitions des géométries et leurs paramètres par défaut
const geometryDefinitions = {
  Parabolic: { f_x: 0.5, f_y: 0.8, size: 3, position: "0,1.4,0" },
  Cylindric: { size: 2, height: 1.5, position: "0,0,0" },
  RingArray: { innerRadius: 1, outerRadius: 2, count: 8, position: "0,0,0" },
  Quelconque: { equation: "z = x*x + y*y" },
};

const Sidebar = ({ darkMode, onApplyConfig }) => {
  // Source
  const [sourceType, setSourceType] = useState("Pointue");
  const [sourcePos, setSourcePos] = useState("0,3,0");
  const [sourceSize, setSourceSize] = useState({ width: 1, height: 1 });

  // Géométrie
  const [geometryType, setGeometryType] = useState("Parabolic");
  const [geometryParams, setGeometryParams] = useState(
    geometryDefinitions["Parabolic"]
  );
  const [geometryEquation, setGeometryEquation] = useState("z = x*x + y*y");
  const [geometries, setGeometries] = useState([]);

  // Rayons
  const [rayCount, setRayCount] = useState(5000);

  // Changement type géométrie
  const handleGeometryTypeChange = (e) => {
    const newType = e.target.value;
    setGeometryType(newType);
    setGeometryParams(geometryDefinitions[newType] || {});
    if (newType === "Quelconque") setGeometryEquation("z = x*x + y*y");
  };

  // Changement paramètre
  const handleParamChange = (key, value) => {
    setGeometryParams({ ...geometryParams, [key]: value });
  };

  // Ajouter une géométrie
  const handleAddGeometry = () => {
    const id = Date.now();
    const newGeometry = {
      id,
      type: geometryType,
      params: geometryParams,
      equation: geometryType === "Quelconque" ? geometryEquation : undefined,
    };
    setGeometries((prev) => [...prev, newGeometry]);

    // Reset des champs pour nouvelle géométrie
    setGeometryType("Parabolic");
    setGeometryParams(geometryDefinitions["Parabolic"]);
    setGeometryEquation("z = x*x + y*y");
  };

  // Supprimer une géométrie
  const handleRemoveGeometry = (id) => {
    setGeometries((prev) => prev.filter((g) => g.id !== id));
  };

  // Appliquer la configuration et générer le JSON
  const handleApply = () => {
    const parsedSourcePos = sourcePos.split(",").map((v) => Number(v.trim()));

    const data = {
      scene: {
        geometries: geometries.map((geo) => {
          const parsedPos = geo.params.position
            ? geo.params.position.split(",").map((v) => Number(v.trim()))
            : [0, 0, 0];

          const cleanParams = { ...geo.params, position: parsedPos };
          if (geo.type === "Quelconque") cleanParams.equation = geo.equation;

          return { type: geo.type, params: cleanParams };
        }),
      },
      source: {
        type: sourceType === "Pointue" ? "Point" : "Large",
        params: {
          position: parsedSourcePos,
          intensity: 1,
          ...(sourceType === "Large" ? sourceSize : {}),
        },
      },
      rayCount,
    };

    console.log("🧩 Données JSON construites :", data);
    if (onApplyConfig) onApplyConfig(data);
  };

  // Styles
  const sectionClass = `rounded-xl p-3 mb-4 border ${
    darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-300 shadow-sm"
  }`;
  const labelClass = "text-sm font-medium mb-1";
  const inputClass = `px-2 py-1 rounded border text-sm w-full ${
    darkMode ? "bg-slate-700 border-slate-600" : "bg-white border-slate-300"
  }`;

  return (
    <aside
      className={`w-72 h-full flex flex-col p-4 border-r overflow-y-auto transition-all duration-300
      ${darkMode ? "bg-slate-900 border-slate-800 text-slate-200" : "bg-slate-100 border-slate-300 text-slate-800"}`}
    >
      <h2 className="text-lg font-semibold mb-4 text-orange-400">Configuration</h2>

      {/* SOURCE */}
      <div className={sectionClass}>
        <h3 className="text-md font-semibold text-orange-500 mb-2">Source</h3>
        <label className={labelClass}>Type de source</label>
        <select value={sourceType} onChange={(e) => setSourceType(e.target.value)} className={inputClass}>
          <option value="Pointue">Pointue</option>
          <option value="Large">Large</option>
        </select>

        <label className={labelClass} style={{ marginTop: "0.5rem" }}>Position (x, y, z)</label>
        <input type="text" value={sourcePos} onChange={(e) => setSourcePos(e.target.value)} placeholder="ex: 0,3,0" className={inputClass} />

        {sourceType === "Large" && (
          <div className="flex gap-2 mt-2">
            <div className="flex-1">
              <label className={labelClass}>Largeur</label>
              <input type="number" value={sourceSize.width} onChange={(e) => setSourceSize({ ...sourceSize, width: Number(e.target.value) })} className={inputClass} />
            </div>
            <div className="flex-1">
              <label className={labelClass}>Hauteur</label>
              <input type="number" value={sourceSize.height} onChange={(e) => setSourceSize({ ...sourceSize, height: Number(e.target.value) })} className={inputClass} />
            </div>
          </div>
        )}
      </div>

      {/* GÉOMÉTRIE */}
      <div className={sectionClass}>
        <h3 className="text-md font-semibold text-orange-500 mb-2">Géométrie</h3>
        <label className={labelClass}>Type</label>
        <select value={geometryType} onChange={handleGeometryTypeChange} className={inputClass}>
          {Object.keys(geometryDefinitions).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <div className="mt-2 flex flex-col gap-2">
          {Object.entries(geometryParams).map(([key, value]) => (
            <div key={key}>
              <label className={labelClass}>{key}</label>
              <input
                type="text"
                value={Array.isArray(value) ? value.join(",") : String(value)}
                onChange={(e) => handleParamChange(key, e.target.value)}
                className={inputClass}
              />
            </div>
          ))}
        </div>

        {geometryType === "Quelconque" && (
          <>
            <label className={labelClass} style={{ marginTop: "0.5rem" }}>Équation</label>
            <input type="text" value={geometryEquation} onChange={(e) => setGeometryEquation(e.target.value)} className={inputClass} />
          </>
        )}

        <button
          onClick={handleAddGeometry}
          className={`mt-3 w-full px-3 py-2 rounded font-medium text-sm ${
            darkMode ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-blue-500 hover:bg-blue-400 text-white"
          }`}
        >
          Ajouter la géométrie
        </button>

        {geometries.length > 0 && (
          <div className="mt-3">
            <h4 className="text-sm font-semibold mb-2 text-orange-400">Géométries ajoutées</h4>
            <ul className="space-y-1">
              {geometries.map((geo) => (
                <li key={geo.id} className={`flex items-center justify-between text-sm p-1 rounded ${darkMode ? "bg-slate-700" : "bg-slate-200"}`}>
                  <span>{geo.type} #{geo.id}</span>
                  <Trash2 size={16} className="cursor-pointer text-red-400 hover:text-red-500" onClick={() => handleRemoveGeometry(geo.id)} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* RAYONS */}
      <div className={sectionClass}>
        <h3 className="text-md font-semibold text-orange-500 mb-2">Rayons</h3>
        <label className={labelClass}>Nombre de rayons</label>
        <input type="number" value={rayCount} onChange={(e) => setRayCount(Number(e.target.value))} className={inputClass} />
      </div>

      <button
        onClick={handleApply}
        className={`mt-2 px-3 py-2 rounded font-medium text-sm ${
          darkMode ? "bg-orange-600 hover:bg-orange-500 text-white" : "bg-orange-500 hover:bg-orange-400 text-white"
        }`}
      >
        Appliquer la configuration
      </button>
    </aside>
  );
};

export default Sidebar;
