import Cylindric from "./geometries/Cylindric";
import Parabolic from "./geometries/Parabolic";
import RingArray from "./geometries/RingArray";
import React from "react";

const Geometry = ({ geom }) => {
  switch (geom.type) {
    case "Cylindric":
      return <Cylindric params={geom.params} />;
    case "Parabolic":
      return <Parabolic params={geom.params} />;
    case "RingArray":
      return <RingArray params={geom.params} />;
    default:
      return null;
  }
}

export default Geometry;

