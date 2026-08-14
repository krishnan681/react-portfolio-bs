import DesignTemplate from "./DesignTemplate";
import { BRANDS } from "../../data/brands";

export default function GigglesTwirlsDesign() {
  const data = BRANDS.find((b) => b.slug === "giggles-and-twirls") || BRANDS[4];
  return <DesignTemplate data={data} />;
}
