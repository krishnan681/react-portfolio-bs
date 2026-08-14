import { useParams } from "react-router-dom";
import BroadwayDesign from "../designs/BroadwayDesign";
import AarthiDesign from "../designs/AarthiDesign";
import ThatsYFoodDesign from "../designs/ThatsYFoodDesign";
import TheCrimsonDesign from "../designs/TheCrimsonDesign";
import GigglesTwirlsDesign from "../designs/GigglesTwirlsDesign";
import NewCityDevelopersDesign from "../designs/NewCityDevelopersDesign";
import PavizhamJewellersDesign from "../designs/PavizhamJewellersDesign";

export default function ProjectPage() {
  const { slug } = useParams();

  switch (slug) {
    case "broadway-cinemas":
      return <BroadwayDesign />;
    case "aarthi-grand-cineplex":
      return <AarthiDesign />;
    case "thats-y-food":
      return <ThatsYFoodDesign />;
    case "the-crimson":
      return <TheCrimsonDesign />;
    case "giggles-and-twirls":
      return <GigglesTwirlsDesign />;
    case "new-city-developers":
      return <NewCityDevelopersDesign />;
    case "pavizham-jewellers":
      return <PavizhamJewellersDesign />;
    default:
      return <BroadwayDesign />;
  }
}