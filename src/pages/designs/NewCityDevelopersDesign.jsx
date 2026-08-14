import DesignTemplate from "./DesignTemplate";
import { BRANDS } from "../../data/brands";

export default function NewCityDevelopersDesign() {
  const data = BRANDS.find((b) => b.slug === "new-city-developers") || BRANDS[5];
  return <DesignTemplate data={data} />;
}
