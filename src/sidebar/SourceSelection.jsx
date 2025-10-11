import React from "react";

const SourceSelection = ({sectionClass, labelClass, inputClass, sourceType, setSourceType, sourcePos, setSourcePos, sourceSize, setSourceSize}) => {
  return (
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
  );
};

export default SourceSelection;
