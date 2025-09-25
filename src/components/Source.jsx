import PointSource from "./sources/PointSource";
import LargeSource from "./sources/LargeSource";

const Source = ({ source }) => {
  switch (source.type) {
    case "Point":
      return <PointSource params={source.params} />;
    case "Large":
      return <LargeSource params={source.params} />;
    default:
      return null;
  }
}

export default Source;

