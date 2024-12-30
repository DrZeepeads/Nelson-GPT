import { nutritionDrugs } from "./drug-categories/nutritionDrugs";
import { endocrineDrugs } from "./drug-categories/endocrineDrugs";
import { rheumaticDrugs } from "./drug-categories/rheumaticDrugs";
import { metabolicDrugs } from "./drug-categories/metabolicDrugs";
import { fluidElectrolyteDrugs } from "./drug-categories/fluidElectrolyteDrugs";
import { geneticDrugs } from "./drug-categories/geneticDrugs";
import { skinDrugs } from "./drug-categories/skinDrugs";
import { boneDrugs } from "./drug-categories/boneDrugs";
import { infectiousDrugs } from "./drug-categories/infectiousDrugs";
import { emergencyDrugs } from "./drug-categories/emergencyDrugs";
import { bloodDrugs } from "./drug-categories/bloodDrugs";

export interface Drug {
  name: string;
  dose: string;
}

export {
  nutritionDrugs,
  endocrineDrugs,
  rheumaticDrugs,
  metabolicDrugs,
  fluidElectrolyteDrugs,
  geneticDrugs,
  skinDrugs,
  boneDrugs,
  infectiousDrugs,
  emergencyDrugs,
  bloodDrugs,
};