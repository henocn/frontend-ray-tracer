import React, { useState } from "react";
import GeometrySelection from "../sidebar/GeometrySelection";
import SourceSelection from "../sidebar/SourceSelection";
import ExecutionMode from "../sidebar/ExecutionMode";
import AnalysisType from "../sidebar/AnalysisType";
import RaysInput from "../sidebar/RaysInput";
import axiosInstance from "../axiosApi";



// ---- Définition des géométries disponibles ----
const geometryDefinitions = {
  Parabolic: { f_x: 0.5, f_y: 0.8, size: 3, position: "0,1.4,0" },
  Cylindric: { size: 2, height: 1.5, position: "0,0,0" },
  RingArray: { innerRadius: 1, outerRadius: 2, count: 8, position: "0,0,0" },
  Quelconque: { equation: "x*x + y*y", position: "0,0,0" },
};

const Sidebar = ({ darkMode, onApplyConfig }) => {
  // ---- États principaux ----
  const [sourceType, setSourceType] = useState("Pointue");
  const [sourcePos, setSourcePos] = useState("0,30000000,-150000000");
  const [sourceSize, setSourceSize] = useState({ width: 1, height: 1 });
  const [geometryType, setGeometryType] = useState("Parabolic");
  const [geometryParams, setGeometryParams] = useState(geometryDefinitions["Parabolic"]);
  const [geometryEquation, setGeometryEquation] = useState("x*x + y*y");
  const [geometries, setGeometries] = useState([]);
  const [rayCount, setRayCount] = useState(30);
  const [analysisType, setAnalysisType] = useState("Plan");
  const [planType, setPlanType] = useState("XY");
  const [planPosition, setPlanPosition] = useState("0");
  const [mode, setMode] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ---- GESTION GÉOMÉTRIE ----
  const handleGeometryTypeChange = (e) => {
    const newType = e.target.value;
    setGeometryType(newType);
    setGeometryParams(geometryDefinitions[newType] || {});
    if (newType === "Quelconque") setGeometryEquation("x*x + y*y");
  };

  const handleParamChange = (key, value) => {
    setGeometryParams({ ...geometryParams, [key]: value });
  };

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

  const handleRemoveGeometry = (id) => {
    setGeometries((prev) => prev.filter((g) => g.id !== id));
  };

  // ---- Construction du JSON (format simplifié) ----
  const buildConfig = () => {
    const parsedSourcePos = sourcePos.split(",").map((v) => Number(v.trim()));

    // Normaliser les paramètres numériques dans les géométries
    const normalizeParams = (params = {}) => {
      const out = {};
      Object.entries(params).forEach(([k, v]) => {
        if (typeof v === "string") {
          // position special-case (csv)
          if (v.includes(",") && v.split(",").every((s) => s.trim() !== "")) {
            out[k] = v.split(",").map((x) => Number(x.trim()));
          } else {
            const n = Number(v);
            out[k] = Number.isNaN(n) ? v : n;
          }
        } else out[k] = v;
      });
      return out;
    };

    return {
      // on standardise le format : { scene: { geometries: [...] }, source: { params: {} }, rays: [...] }
      scene: {
        geometries: geometries.map((geo) => ({
          type: geo.type,
          params: {
            ...normalizeParams(geo.params),
            position: geo.params?.position
              ? geo.params.position
                  .toString()
                  .split(",")
                  .map((v) => Number(v.trim()))
              : [0, 0, 0],
          },
          equation: geo.equation || null,
        })),
      },
      source: {
        type: sourceType === "Pointue" ? "Point" : "Large",
        params: {
          position: parsedSourcePos,
          ...(sourceType === "Large" ? { size: sourceSize } : {}),
        },
      },
      rayCount: rayCount,
      analysis: {
        type: analysisType,
        plan: planType,
        position: planPosition.split(",").map((v) => Number(v.trim())),
      },
      mode, // 1 = séquentiel, 0 = parallèle
    };
  };


  // ---- Envoi manuel (si nécessaire) ----
  const handleApply = () => {
    const data = buildConfig();
    setLoading(true);
    setError(null);
    axiosInstance
      .post("/simulation/", data)
      .then((response) => {
        console.log("Réponse du serveur :", response.data);
        if (onApplyConfig) onApplyConfig(response.data || data);
      })
      .catch((err) => {
        console.error("Erreur lors de l'envoi :", err);
        setError(err?.message || String(err));
      })
      .finally(() => setLoading(false));
  };

  // ---- Styles ----
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
      ${darkMode ? "bg-slate-900 border-slate-800 text-slate-200" : "bg-slate-100 border-slate-300 text-slate-800"}
      `}
    >
      <h2 className="text-lg font-semibold mb-4 text-orange-400">Configuration</h2>

      <AnalysisType
        sectionClass={sectionClass}
        analysisType={analysisType}
        setAnalysisType={setAnalysisType}
        planType={planType}
        setPlanType={setPlanType}
        planPosition={planPosition}
        setPlanPosition={setPlanPosition}
        labelClass={labelClass}
        inputClass={inputClass}
      />

      <ExecutionMode sectionClass={sectionClass} mode={mode} setMode={setMode} />

      <SourceSelection
        sectionClass={sectionClass}
        labelClass={labelClass}
        inputClass={inputClass}
        sourceType={sourceType}
        setSourceType={setSourceType}
        sourcePos={sourcePos}
        setSourcePos={setSourcePos}
        sourceSize={sourceSize}
        setSourceSize={setSourceSize}
      />

      <GeometrySelection
        labelClass={labelClass}
        inputClass={inputClass}
        sectionClass={sectionClass}
        geometryType={geometryType}
        handleGeometryTypeChange={handleGeometryTypeChange}
        geometryDefinitions={geometryDefinitions}
        geometryParams={geometryParams}
        handleParamChange={handleParamChange}
        geometryEquation={geometryEquation}
        setGeometryEquation={setGeometryEquation}
        handleAddGeometry={handleAddGeometry}
        darkMode={darkMode}
        geometries={geometries}
        onRemoveGeometry={handleRemoveGeometry}
      />

      <RaysInput
        sectionClass={sectionClass}
        labelClass={labelClass}
        inputClass={inputClass}
        rayCount={rayCount}
        setRayCount={setRayCount}
      />

      <div className="mt-2">
        <button
          onClick={handleApply}
          disabled={loading}
          className={`w-full px-3 py-2 rounded font-medium text-sm ${
            darkMode ? "bg-orange-600 hover:bg-orange-500 text-white" : "bg-orange-500 hover:bg-orange-400 text-white"
          } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          {loading ? "Envoi..." : "Appliquer la configuration"}
        </button>
  {error && <p className="text-sm text-red-400 mt-2">Erreur: {String(error)}</p>}
      </div>
    </aside>
  );
};

export default Sidebar;
