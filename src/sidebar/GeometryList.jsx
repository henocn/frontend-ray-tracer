import React from "react";
import { Trash2 } from "lucide-react";

const GeometryList = ({ geometries, onRemoveGeometry, darkMode }) => {
  return (
    <>
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
    </>
  );
};

export default GeometryList;
