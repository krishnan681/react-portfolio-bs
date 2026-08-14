import DesignTemplate from "./DesignTemplate";
import { BRANDS } from "../../data/brands";

export default function ThatsYFoodDesign() {
  const data = BRANDS.find((b) => b.slug === "thats-y-food") || BRANDS[2];
  return <DesignTemplate data={data} />;
}
