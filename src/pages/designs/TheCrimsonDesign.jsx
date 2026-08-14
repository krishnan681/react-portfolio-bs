import DesignTemplate from "./DesignTemplate";
import { BRANDS } from "../../data/brands";

export default function TheCrimsonDesign() {
  const data = BRANDS.find((b) => b.slug === "the-crimson") || BRANDS[3];
  return <DesignTemplate data={data} />;
}
