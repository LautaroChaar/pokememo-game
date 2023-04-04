import { Box, Typography, Button } from '@mui/material';
import { gamesContext } from '../../context/GamesContext/GamesContext';
import { FormSelect } from '../FormSelect';
import { useContext } from 'react';
import { GamesFormProps, GamesContextType, ThemeContextType } from '../../models';
import { themeContext } from '../../context/ThemeContext/ThemeContext';

const GamesForm: React.FC<GamesFormProps> = ({ updateUncoverNumber, updateMatch, updateFirstUrl, updateSecondUrl, updateSelectCard }) => {

  const options = [
    {value: 'Easy', text: 'Easy'},
    {value: 'Medium', text: 'Medium'},
    {value: 'Hard', text: 'Hard'}
  ];

  const { updateDisableSelect, elements, location, dificulty, selectDificulty, generateNewElements, generateElements, deleteElements, startGame, start, updateMistakes } = useContext(gamesContext) as GamesContextType;
  const { theme, firstColor, secondColor, thirdColor, thirdColorOpacity } = useContext(themeContext) as ThemeContextType;

  const handleStartClick = () => {
    sliceNumbers();
    updateDisableSelect(true);
    startGame(true);
  }

  const handleRestartClick = () => {
    startGame(false);
    updateDisableSelect(false);
    if (location.pathname === '/numbers' && updateUncoverNumber != undefined) {
      deleteElements();
      updateUncoverNumber(-1);
    } else {
      if ( updateMatch != undefined && updateFirstUrl != undefined && updateSecondUrl != undefined && updateSelectCard != undefined) {
        deleteElements();
        updateSelectCard(-1);
        updateFirstUrl(null);
        updateSecondUrl(null);
        updateMatch(-1);
      }
    }
    updateMistakes(-1);
  }

  const sliceNumbers = () => {
    generateElements();
    if (location.pathname === '/numbers') {
      if (dificulty === "Easy") {
        generateNewElements(elements, 6);
      } else if (dificulty === "Medium") {
        generateNewElements(elements, 9);
      } else {
        generateNewElements(elements, 12);
      }
    } else {
      elements.sort(() => Math.random() - 0.5);
      if (dificulty === "Easy") { 
        generateNewElements(elements, 3);
      } else if (dificulty === "Medium") {
        generateNewElements(elements, 6);
      } else {
        generateNewElements(elements, 9);
      }
    }
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      margin: '10px'
    }}>
      <Typography variant="h2" sx={{ 
        fontFamily:'Ubuntu, sans-serif', 
        fontSize: {xs: '1rem', sm: '1.1rem', md: '1.2rem'}, 
        margin: '10px', 
        fontWeight:'bold' , 
        color: `${thirdColor[theme]}`
        }} >
      Settings
      </Typography>
      <form className="orderForm" >
        <FormSelect
        label="Dificulty"
        onChange={selectDificulty}
        options={
          options.map( option => (
            <option key={option.value} value={option.value}>
            {option.text}
            </option>
          ))} 
          />
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly'
        }} >
          <Button 
          sx={{
            width: 'fit-content',
            background: 'none',
            color: `${thirdColorOpacity[theme]}`,
            fontSize: {xs: '.9rem', sm: '1rem', md: '1.1rem'},
            '&:hover': { 
              backgroundColor: 'transparent', 
              color: `${thirdColor[theme]}`, 
              transition: 'color .3s ease-in-out'
            },
            fontFamily: 'Ubuntu, sans-serif',
            textTransform: 'capitalize'
          }} 
          type="button"
          onClick={()=> { handleStartClick() }}
          disabled={ start ? true : false }
          >
          Start
          </Button>
          <Button 
          sx={{
            width: 'fit-content',
            background: 'none',
            color: `${thirdColorOpacity[theme]}`,
            fontSize: {xs: '.9rem', sm: '1rem', md: '1.1rem'},
            '&:hover': { 
              backgroundColor: 'transparent',
              color: `${thirdColor[theme]}`, 
              transition: 'color .3s ease-in-out'
            },
            fontFamily: 'Ubuntu, sans-serif',
            textTransform: 'capitalize'
          }} 
          onClick={() => { handleRestartClick() }}
          type="button">
          Restart  
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default GamesForm;