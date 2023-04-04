import { Box } from '@mui/material';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gamesContext } from '../../context/GamesContext/GamesContext';
import { NumbersContainer } from './components';
import Swal from 'sweetalert2';
import { userContext } from '../../context/UserContext/UserContext';
import { GamesContextType, ThemeContextType, UserContextType, UserInterface } from '../../models';
import { dataUserFetch } from '../../services';
import { updateNumberScore, updateNumberScorePost } from './services';
import { themeContext } from '../../context/ThemeContext/ThemeContext';


const NumberSection: React.FC = () => {

  const [uncoverNumber, setUncoverNumber] = useState<number>(0);
  const { updateDisableSelect, newElements, startGame, deleteElements, dificulty, mistakes, updateMistakes } = useContext(gamesContext) as GamesContextType;
  
  const { getDataUser, validateLoading, isLogged, dataUser } = useContext(userContext) as UserContextType;
  const { theme, firstColor } = useContext(themeContext) as ThemeContextType; 

  const navigate = useNavigate();
  
  const updateUncoverNumber = (uncoverNumber: number): void => {
    setUncoverNumber(uncoverNumber + 1);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user: string | null = localStorage.getItem('user');
        const response = await dataUserFetch(user);
        const data: UserInterface = await response.json();
        getDataUser(data);
        validateLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      !isLogged ? navigate(`/`) : fetchData();
    } catch (error) {
      console.log(error);
    }
    }, [isLogged]);

  useEffect( () => {
    const setScore = async () => {

      const newScore: {
        easy: number;
        medium: number;
        hard: number;
    } = updateNumberScore(dataUser, dificulty);
      
      const newData: UserInterface = {
        name: dataUser.name,
        email: dataUser.email,
        trophies: Number(dataUser.trophies) + 1,
        games: [{ ...dataUser.games[0]}, {name: 'numbers', dificulty: newScore}]
      }

      const response = await updateNumberScorePost(newData);
      const content = await response.json();
      getDataUser(content);
    }
      
    const endNumbersGame = () => {
      startGame(false);
      deleteElements();
      updateUncoverNumber(-1);
      updateMistakes(-1);
      updateDisableSelect(false);
    }

    const defeatAlert = () => {
      setTimeout(function () {
        Swal.fire({
          title: 'Defeat :(',
          html:`
          <p style='color: #b7b7b7; font-weight: bold;' class="scoreTitle">Don't give up and try again. Good luck!</p>
          `,
          color: '#d35f62',
          background: '#242424',
          confirmButtonText: 'Close',
          confirmButtonColor: '#2a2731'
        });
        endNumbersGame();
      }, 800);
    }

    const alertWinNumbers = () => {
      setTimeout(function () {
        Swal.fire({
          title: 'Victory :D',
          html: `
          <p style='color: #b7b7b7; font-weight: bold;' class="scoreTitle">You won a trophy. Congrats!</p>
          `,
          color: '#ffef8b',
          background: '#242424',
          confirmButtonText: 'Close',
          confirmButtonColor: '#2a2731'
        });
        endNumbersGame();
        setScore();
      }, 500);
    }

    if ( uncoverNumber > 0 && uncoverNumber === newElements.length ) alertWinNumbers();
    mistakes === 5 && defeatAlert();
  }, [uncoverNumber, newElements, deleteElements, startGame, dataUser, dificulty, getDataUser, mistakes, updateMistakes, updateDisableSelect ]);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '20px',
      borderRadius: '24px',
      justifyContent: 'center',
      minHeight: { xs: 'calc(100vh - 239px)', sm: 'calc(100vh - 212px)', md: 'calc(100vh - 212.5px)'},
      backgroundColor: '#4f4f4fa8',
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: {xs: 'column', md: 'row'},
        width: '80%',
        boxShadow: '3px 3px 1px #24242496',
        backgroundColor: `${firstColor[theme]}`,
        margin: '20px 0',
        borderRadius: '20px',
        padding: '20px',
        maxWidth: { xs: '336px', sm: '535px'}
      }} >
        <NumbersContainer 
        updateUncoverNumber={updateUncoverNumber} 
        uncoverNumber={uncoverNumber}
        />
      </Box>
    </Box>
  )
}

export default NumberSection;