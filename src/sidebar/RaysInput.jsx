import React from 'react'

const RaysInput = ({ sectionClass, labelClass, inputClass, rayCount, setRayCount }) => {
  return (
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
  )
}

export default RaysInput