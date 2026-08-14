import DesignTemplate from "./DesignTemplate";
import { BRANDS } from "../../data/brands";

export default function BroadwayDesign() {
  const data = BRANDS.find((b) => b.slug === "broadway-cinemas") || BRANDS[0];
  return <DesignTemplate data={data} />;
}
