import React, { useState } from "react";
import GeometrySelection from "../sidebar/GeometrySelection";
import SourceSelection from "../sidebar/SourceSelection";
import ExecutionMode from "../sidebar/ExecutionMode";
import AnalysisType from "../sidebar/AnalysisType";
import RaysInput from "../sidebar/RaysInput";

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
  const [sourcePos, setSourcePos] = useState("0,30000000,-150000000");
  const [sourceSize, setSourceSize] = useState({ width: 1, height: 1 });

  // ---- GÉOMÉTRIE ----
  const [geometryType, setGeometryType] = useState("Parabolic");
  const [geometryParams, setGeometryParams] = useState(
    geometryDefinitions["Parabolic"]
  );
  const [geometryEquation, setGeometryEquation] = useState("x*x + y*y");
  const [geometries, setGeometries] = useState([]);

  // ---- RAYONS ----
  const [rayCount, setRayCount] = useState(3000);

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
      <AnalysisType
        sectionClass={sectionClass}
        analysisType={analysisType}
        setAnalysisType={setAnalysisType}
        planType={planType}
        setPlanType={setPlanType}
        planPosition={planPosition}
        setPlanPosition={setPlanPosition}
        analysisEquation={analysisEquation}
        setAnalysisEquation={setAnalysisEquation}
        labelClass={labelClass}
        inputClass={inputClass}
      />

      {/* ---- EXECUTION MODE ---- */}
      <ExecutionMode
        sectionClass={sectionClass}
        mode={mode}
        setMode={setMode}
      />


      {/* ---- SOURCE ---- */}
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

      {/* ---- GÉOMÉTRIE ---- */}
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

      {/* ---- RAYONS ---- */}
      <RaysInput
        sectionClass={sectionClass}
        labelClass={labelClass}
        inputClass={inputClass}
        rayCount={rayCount}
        setRayCount={setRayCount}
      />

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
