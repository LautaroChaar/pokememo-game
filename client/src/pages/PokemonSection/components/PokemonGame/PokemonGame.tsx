import { Box } from '@mui/material';
import { gamesContext } from '../../../../context/GamesContext/GamesContext';
import { useContext } from 'react';
import { Pokeball } from '../Pokeball';
import { GamesContextType } from '../../../../models';
import { PokemonGameProps } from '../../models';


const PokemonGame: React.FC<PokemonGameProps> = ({ getSecondCard, getFirstCard, updateSelectCard, updateFirstUrl, updateSecondUrl, pokeball, selectCard }) => {

  const { dificulty } = useContext(gamesContext) as GamesContextType;

  let id = 1;
  
  return (
    <Box sx={{
      display: 'flex',
      width: '90%',
      perspective: '200px',
      backdropFilter: 'blur(4px)',
      minHeight: '106px',
      justifyContent: 'center',
      flexWrap: 'wrap',
      mt: 0,
      maxWidth: dificulty === 'Hard' ? { xs: 260, sm: 300, md: 488} : { xs: 200, sm: 260, md: 326}
    }}>
      { pokeball.map( (image: string, index: number) => (
        <Pokeball 
        key={index + 1} 
        image={image}
        id={id++} 
        selectCard={selectCard} 
        updateFirstUrl={updateFirstUrl} 
        updateSecondUrl={updateSecondUrl}
        updateSelectCard={updateSelectCard} 
        getFirstCard={getFirstCard}
        getSecondCard={getSecondCard}
        />
      )) }
    </Box>
  )
}

export default PokemonGame;