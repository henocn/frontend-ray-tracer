import React, { forwardRef } from "react";
import Cylindric from "./geometries/Cylindric";
import Parabolic from "./geometries/Parabolic";
import RingArray from "./geometries/RingArray";
import GenericEquationSurface from "./geometries/GenericEquationSurface";

const Geometry = forwardRef(({ geom }, ref) => {
  if (!geom) return null;

  const { type, params, equation, boundaries } = geom;

  switch (type) {
    case "Cylindric":
      return (
        <Cylindric
          ref={ref}
          params={params}
          equation={equation}
          boundaries={boundaries}
        />
      );

    case "Parabolic":
      return (
        <Parabolic
          ref={ref}
          params={params}
          equation={equation}
          boundaries={boundaries}
        />
      );

    case "RingArray":
      return (
        <RingArray
          ref={ref}
          params={params}
          equation={equation}
          boundaries={boundaries}
        />
      );

    case "Quelconque":
      return (
        <GenericEquationSurface
          ref={ref}
          equation={equation}
          boundaries={boundaries}
        />
      );

    default:
      return null;
  }
});

export default Geometry;
