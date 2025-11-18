import CowboyIcon from "../../../../../assets/img/svg/person/CowboyIcon";
import FishermanIcon from "../../../../../assets/img/svg/person/FishermanIcon";
import TrailerParkResidentIcon from "../../../../../assets/img/svg/person/TrailerParkResidentIcon";
import TravelerIcon from "../../../../../assets/img/svg/person/TravelerIcon";

export const PRESET_OPTIONS = [
  { value: "traveler", label: "RV Traveler", description: "Truck + Traveler Trailer", icon: TravelerIcon },
  { value: "cowboy", label: "Cowboy", description: "Truck + Fifth Wheel", disabled: true, icon: CowboyIcon },
  {
    value: "resident",
    label: "Trailer Park Resident",
    description: "Motor Home",
    disabled: true,
    icon: TrailerParkResidentIcon,
  },
  { value: "fisherman", label: "Fisherman", description: "Truck + Boat", disabled: true, icon: FishermanIcon },
];
