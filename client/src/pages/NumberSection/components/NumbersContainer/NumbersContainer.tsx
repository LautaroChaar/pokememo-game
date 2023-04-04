import { Box, Typography } from '@mui/material';
import { GamesForm } from '../../../../components';
import { NumbersContainerProps } from '../../models';
import { NumbersGame } from '../NumbersGame';
import { useContext } from 'react';
import { gamesContext } from '../../../../context/GamesContext/GamesContext';
import { GamesContextType, ThemeContextType } from '../../../../models';
import { themeContext } from '../../../../context/ThemeContext/ThemeContext';

const NumbersContainer: React.FC<NumbersContainerProps> = ({ updateUncoverNumber, uncoverNumber }) => {

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
      }} 
        >
          NUMBERS
      </Typography>
      <Box>
        <GamesForm  
        updateUncoverNumber={updateUncoverNumber} 
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
      <NumbersGame
      updateUncoverNumber={updateUncoverNumber} 
      uncoverNumber={uncoverNumber} 
      />
    </Box>
  )
}

export default NumbersContainer;