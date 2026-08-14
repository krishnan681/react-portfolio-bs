import DesignTemplate from "./DesignTemplate";
import { BRANDS } from "../../data/brands";

export default function PavizhamJewellersDesign() {
  const data = BRANDS.find((b) => b.slug === "pavizham-jewellers") || BRANDS[6];
  return <DesignTemplate data={data} />;
}
