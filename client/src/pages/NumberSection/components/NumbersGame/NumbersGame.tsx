import { Box } from '@mui/material';
import { useState, useContext, useEffect } from 'react';
import { gamesContext } from '../../../../context/GamesContext/GamesContext';
import { GamesContextType } from '../../../../models';
import { NumbersGameProps } from '../../models';
import { BtnNumbers } from '../BtnNumbers';


const NumbersGame: React.FC<NumbersGameProps> = ({ updateUncoverNumber, uncoverNumber }) => {

  const[sortArray, setSortArray] = useState<number[]>([]);
  
  const { newElements, dificulty } = useContext(gamesContext) as GamesContextType;

  useEffect( () => {
    setSortArray(newElements.sort(() => Math.random() - 0.5));
  }, [newElements]);

  return (
    <Box sx={{
      display: 'flex',
      width: { xs: '80%', md: '82%'},
      justifyContent: 'center',
      flexWrap: 'wrap',
      maxWidth: dificulty === 'Hard' ? { xs: '273px', sm: 300, md: 488} : '261px'
    }}>
      { sortArray.map( n => (
        <BtnNumbers 
        key={n} 
        id={String(n)} 
        value={String(n)} 
        updateUncoverNumber={updateUncoverNumber} 
        uncoverNumber={uncoverNumber} 
        />
      )) }
    </Box> 
  )
}

export default NumbersGame;