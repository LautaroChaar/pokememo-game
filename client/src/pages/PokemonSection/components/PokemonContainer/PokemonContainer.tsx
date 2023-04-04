import { Box, Typography } from '@mui/material';
import { PokemonGame } from '../PokemonGame';
import { GamesForm } from '../../../../components';
import { PokemonContainerProps } from '../../models';
import { useContext } from 'react';
import { gamesContext } from '../../../../context/GamesContext/GamesContext';
import { GamesContextType, ThemeContextType } from '../../../../models';
import { themeContext } from '../../../../context/ThemeContext/ThemeContext';

const PokemonContainer: React.FC<PokemonContainerProps> = ({ updateMatch, getSecondCard, getFirstCard, updateSelectCard, updateFirstUrl, updateSecondUrl, selectCard, pokeball }) => {

  const { mistakes } = useContext(gamesContext) as GamesContextType;
  const { theme, secondColor, thirdColor } = useContext(themeContext) as ThemeContextType;

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row'},
      justifyContent: { sm: 'space-around' },
      alignItems: 'center'
    }}>
      <Typography variant='h1' sx={{ 
          fontFamily:'Ubuntu, sans-serif', 
          fontWeight: 'bold', 
          writingMode: {sm: 'vertical-lr'},
          textOrientation: {sm: 'upright'},
          fontSize: {xs: '1.2rem', sm: '1.3rem', md: '1.4rem'},
          margin: { xs: '12px 0', md: '0 12px'},
          color: `${secondColor[theme]}`,
          position: 'relative'
        }} >
            POKEMEMO
      </Typography>
      <Box>
        <GamesForm 
        updateSelectCard={updateSelectCard}
        updateFirstUrl={updateFirstUrl}
        updateSecondUrl={updateSecondUrl}
        updateMatch={updateMatch}
        />
        <Typography variant='h3' sx={{
			  color: `${secondColor[theme]}`,
        marginBottom: '12px',
        fontFamily: 'Ubuntu, Sans serif',
	      fontSize: {xs: '1rem', sm: '1.1rem', md: '1.2rem'}
			}} >
        <Typography variant='inherit' sx={{ 
          fontSize: {xs: '1rem', sm: '1.1rem', md: '1.2rem'}, 
          marginRight: {md: '6px'} , 
          display: 'inline-block',
          color: `${thirdColor[theme]}`
        }} > 
          Mistakes: 
        </Typography> 
          {` ${mistakes}`}
      </Typography>
      </Box>
      <PokemonGame 
      pokeball={pokeball}
      selectCard={selectCard}
      updateFirstUrl={updateFirstUrl}
      updateSecondUrl={updateSecondUrl}
      updateSelectCard={updateSelectCard} 
      getFirstCard={getFirstCard}
      getSecondCard={getSecondCard}
      /> 
    </Box>
  )
}

export default PokemonContainer;