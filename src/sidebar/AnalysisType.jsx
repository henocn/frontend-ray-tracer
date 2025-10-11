import React from "react";

const AnalysisType = ({ sectionClass, analysisType, setAnalysisType, planType, setPlanType, planPosition, setPlanPosition, analysisEquation, setAnalysisEquation, labelClass, inputClass }) => {
  return (
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
  );
};

export default AnalysisType;
