import React, { useState } from "react";
import GeometryList from "../sidebar/GeometryList";

// Définitions des géométries et leurs paramètres par défaut
const geometryDefinitions = {
  Parabolic: { f_x: 0.5, f_y: 0.8, size: 3, position: "0,1.4,0" },
  Cylindric: { size: 2, height: 1.5, position: "0,0,0" },
  RingArray: { innerRadius: 1, outerRadius: 2, count: 8, position: "0,0,0" },
  Quelconque: { equation: "x*x + y*y" },
};

const Sidebar = ({ darkMode, onApplyConfig }) => {
  // ---- SOURCE ----
  const [sourceType, setSourceType] = useState("Pointue");
  const [sourcePos, setSourcePos] = useState("0,3,-150000000");
  const [sourceSize, setSourceSize] = useState({ width: 1, height: 1 });

  // ---- GÉOMÉTRIE ----
  const [geometryType, setGeometryType] = useState("Parabolic");
  const [geometryParams, setGeometryParams] = useState(
    geometryDefinitions["Parabolic"]
  );
  const [geometryEquation, setGeometryEquation] = useState("x*x + y*y");
  const [geometries, setGeometries] = useState([]);

  // ---- RAYONS ----
  const [rayCount, setRayCount] = useState(500);

  // ---- ANALYSE ----
  const [analysisType, setAnalysisType] = useState("Plan");
  const [planType, setPlanType] = useState("XY");
  const [planPosition, setPlanPosition] = useState("0,0");
  const [analysisEquation, setAnalysisEquation] = useState("x*x + y*y");

  // ---- MODE (Séquentiel / Parallèle) ----
  const [mode, setMode] = useState(1); // 1 = Séquentiel, 0 = Parallèle

  // Changement type géométrie
  const handleGeometryTypeChange = (e) => {
    const newType = e.target.value;
    setGeometryType(newType);
    setGeometryParams(geometryDefinitions[newType] || {});
    if (newType === "Quelconque") setGeometryEquation("x*x + y*y");
  };

  // Changement paramètre géométrie
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
  };

  // Supprimer une géométrie
  const handleRemoveGeometry = (id) => {
    setGeometries((prev) => prev.filter((g) => g.id !== id));
  };

  // ---- Construire et envoyer le JSON ----
  const handleApply = () => {
    const parsedSourcePos = sourcePos.split(",").map((v) => Number(v.trim()));

    const data = {
      analysis: {
        type: analysisType,
        params:
          analysisType === "Plan"
            ? {
                plan: planType,
                position: planPosition.split(",").map((v) => Number(v.trim())),
              }
            : {
                equation: analysisEquation,
              },
      },
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
      mode, // 1 = séquentiel, 0 = parallèle
    };

    console.log("Débug : ", data);
    if (onApplyConfig) onApplyConfig(data);
  };

  // ---- Styles ----
  const sectionClass = `rounded-xl p-3 mb-4 border ${
    darkMode
      ? "bg-slate-800 border-slate-700"
      : "bg-white border-slate-300 shadow-sm"
  }`;
  const labelClass = "text-sm font-medium mb-1";
  const inputClass = `px-2 py-1 rounded border text-sm w-full ${
    darkMode ? "bg-slate-700 border-slate-600" : "bg-white border-slate-300"
  }`;

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

      {/* ---- TYPE D’ANALYSE ---- */}
      <div className={sectionClass}>
        <h3 className="text-md font-semibold text-orange-500 mb-2">
          Type d’analyse
        </h3>
        <select
          value={analysisType}
          onChange={(e) => setAnalysisType(e.target.value)}
          className={inputClass}
        >
          <option value="Plan">Plan</option>
          <option value="Géométrie quelconque">Géométrie quelconque</option>
        </select>

        {analysisType === "Plan" ? (
          <div className="mt-3 flex flex-col gap-2">
            <label className={labelClass}>Plan</label>
            <select
              value={planType}
              onChange={(e) => setPlanType(e.target.value)}
              className={inputClass}
            >
              <option value="XY">XY</option>
              <option value="YZ">YZ</option>
              <option value="XZ">XZ</option>
            </select>

            <label className={labelClass}>Position (n, m)</label>
            <input
              type="text"
              value={planPosition}
              onChange={(e) => setPlanPosition(e.target.value)}
              className={inputClass}
            />
          </div>
        ) : (
          <div className="mt-3">
            <label className={labelClass}>Équation</label>
            <input
              type="text"
              value={analysisEquation}
              onChange={(e) => setAnalysisEquation(e.target.value)}
              className={inputClass}
            />
          </div>
        )}
      </div>

      {/* ---- MODE ---- */}
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

      {/* ---- SOURCE ---- */}
      <div className={sectionClass}>
        <h3 className="text-md font-semibold text-orange-500 mb-2">Source</h3>
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
                  setSourceSize({
                    ...sourceSize,
                    width: Number(e.target.value),
                  })
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

      {/* ---- GÉOMÉTRIE ---- */}
      <div className={sectionClass}>
        <h3 className="text-md font-semibold text-orange-500 mb-2">
          Géométrie
        </h3>
        <label className={labelClass}>Type</label>
        <select
          value={geometryType}
          onChange={handleGeometryTypeChange}
          className={inputClass}
        >
          {Object.keys(geometryDefinitions).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <div className="mt-2 flex flex-col gap-2">
          {Object.entries(geometryParams).map(([key, value]) => (
            <div key={key}>
              <label className={labelClass}>{key}</label>
              <input
                type="text"
                value={String(value)}
                onChange={(e) => handleParamChange(key, e.target.value)}
                className={inputClass}
              />
            </div>
          ))}
        </div>

        {geometryType === "Quelconque" && (
          <>
            <label className={labelClass} style={{ marginTop: "0.5rem" }}>
              Équation
            </label>
            <input
              type="text"
              value={geometryEquation}
              onChange={(e) => setGeometryEquation(e.target.value)}
              className={inputClass}
            />
          </>
        )}

        <button
          onClick={handleAddGeometry}
          className={`mt-3 w-full px-3 py-2 rounded font-medium text-sm ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-500 text-white"
              : "bg-blue-500 hover:bg-blue-400 text-white"
          }`}
        >
          Ajouter la géométrie
        </button>

        <GeometryList
          darkMode={darkMode}
          geometries={geometries}
          onRemoveGeometry={handleRemoveGeometry}
        />
      </div>

      {/* ---- RAYONS ---- */}
      <div className={sectionClass}>
        <h3 className="text-md font-semibold text-orange-500 mb-2">Rayons</h3>
        <label className={labelClass}>Nombre de rayons</label>
        <input
          type="number"
          value={rayCount}
          onChange={(e) => setRayCount(Number(e.target.value))}
          className={inputClass}
        />
      </div>

      {/* ---- APPLY ---- */}
      <button
        onClick={handleApply}
        className={`mt-2 px-3 py-2 rounded font-medium text-sm ${
          darkMode
            ? "bg-orange-600 hover:bg-orange-500 text-white"
            : "bg-orange-500 hover:bg-orange-400 text-white"
        }`}
      >
        Appliquer la configuration
      </button>
    </aside>
  );
};

export default Sidebar;
