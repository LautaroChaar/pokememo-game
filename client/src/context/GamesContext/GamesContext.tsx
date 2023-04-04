import { Location, useLocation } from 'react-router-dom';
import { createContext, useState } from 'react';
import { ContextProps } from '../../models';

export const gamesContext = createContext({});

const GamesContext: React.FC<ContextProps> = ({ children }) => {

  const [newElements, setNewElements] = useState<number[]>([]);
  const [dificulty, setDificulty] = useState<string>('Easy');
  const [elements, setElements] = useState<number[]>([]);
  const [start, setStart] = useState<boolean>(false);
  const [mistakes, setMistakes] = useState<number>(0);
  const [disableSelect, setDisableSelect] = useState<boolean>(false);
  
  const location: Location = useLocation();

  const updateDisableSelect = (disableSelect: boolean): void => {
    setDisableSelect(disableSelect);
  }

  const updateMistakes = (mistakes: number): void => {
    setMistakes(mistakes + 1);
  }

  const startGame = (boolean: boolean): void => {
    setStart(boolean);
  }

  const selectDificulty = (dificulty: string): void => {
    setDificulty(dificulty);
  }

  const generateNewElements = (newElements: number[], n: number): void => {
    const arr = newElements.slice(0, n);
    location.pathname === '/pokemon' ? setNewElements([...arr, ...arr]) : setNewElements(arr);
  }

  const deleteElements = (): void => {
    setNewElements([]);
    setElements([]);
  }

  const generateElements = (): void => {
    for (let i: number = 1; i <= 150; i++) {
      elements.push(i);
    }
    setElements(elements);
  }

  return (
    <>
      <gamesContext.Provider 
      value={{ 
        updateDisableSelect,
        disableSelect,
        mistakes,
        updateMistakes,
        start,
        startGame,
        selectDificulty,
        dificulty,
        generateNewElements,
        deleteElements,
        generateElements,
        newElements,
        location,
        elements 
        }}>
        {children}
      </gamesContext.Provider>
    </>
  );
}

export default GamesContext;