import PointSource from "./sources/PointSource";
import LargeSource from "./sources/LargeSource";

const Source = ({ src }) => {
  switch (src.type) {
    case "Point":
      return <PointSource params={src.params} />;
    case "Large":
      return <LargeSource params={src.params} />;
    default:
      return null;
  }
}

export default Source;

