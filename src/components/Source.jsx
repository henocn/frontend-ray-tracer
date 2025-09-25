import PointSource from "./sources/PointSource";
import LargeSource from "./sources/LargeSource";

const Source = ({ src }) => {
  switch (src.type) {
    case "Point":
      const component = <PointSource params={src.params} />;
      console.log(component);
      return component;
    case "Large":
      const largeComponent = <LargeSource params={src.params} />;
      console.log(largeComponent);
      return largeComponent;
    default:
      return null;
  }
}

export default Source;

