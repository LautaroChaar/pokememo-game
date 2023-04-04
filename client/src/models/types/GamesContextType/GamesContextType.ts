import { Location } from "react-router-dom";

type GamesContextType = {
  newElements: number[];
  dificulty: string;
  elements: number[];
  start: boolean;
  mistakes: number;
  disableSelect: boolean;
  location: Location;
  updateDisableSelect: (disableSelect: boolean) => void;
  updateMistakes: (mistakes: number) => void;
  startGame: (boolean: boolean) => void;
  selectDificulty: (dificulty: string) => void;
  generateNewElements: (newElements: number[], n: number) => void;
  deleteElements: () => void;
  generateElements: () => void;
};

export default GamesContextType;