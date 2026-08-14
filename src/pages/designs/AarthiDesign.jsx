import DesignTemplate from "./DesignTemplate";
import { BRANDS } from "../../data/brands";

export default function AarthiDesign() {
  const data = BRANDS.find((b) => b.slug === "aarthi-grand-cineplex") || BRANDS[1];
  return <DesignTemplate data={data} />;
}