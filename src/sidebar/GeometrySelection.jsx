import React from "react";
import { Trash2 } from "lucide-react";

const GeometrySelection = ({
  labelClass,
  inputClass,
  sectionClass,
  geometryType,
  handleGeometryTypeChange,
  geometryDefinitions,
  geometryParams,
  handleParamChange,
  geometryEquation,
  setGeometryEquation,
  handleAddGeometry,
  darkMode,
  geometries,
  onRemoveGeometry,
}) => {
  return (
    <div className={sectionClass}>
      <h3 className="text-md font-semibold text-orange-500 mb-2">Géométrie</h3>
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

      {geometries.length > 0 && (
        <div className="mt-3">
          <h4 className="text-sm font-semibold mb-2 text-orange-400">
            Géométries ajoutées
          </h4>
          <ul className="space-y-1">
            {geometries.map((geo) => (
              <li
                key={geo.id}
                className={`flex items-center justify-between text-sm p-1 rounded ${
                  darkMode ? "bg-slate-700" : "bg-slate-200"
                }`}
              >
                <span>
                  {geo.type} #{geo.id}
                </span>
                <Trash2
                  size={16}
                  className="cursor-pointer text-red-400 hover:text-red-500"
                  onClick={() => onRemoveGeometry(geo.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GeometrySelection;
