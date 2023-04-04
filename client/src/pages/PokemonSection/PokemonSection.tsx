import { Box } from '@mui/material';
import { useState, useContext, useEffect } from 'react';
import { PokemonContainer } from './components';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { gamesContext } from '../../context/GamesContext/GamesContext';
import { userContext } from '../../context/UserContext/UserContext';
import { GamesContextType, ThemeContextType, UserContextType, UserInterface } from '../../models';
import { dataUserFetch } from '../../services';
import { getPokemonsImg, updatePokemonScore, updatePokemonScorePost } from './services';
import { themeContext } from '../../context/ThemeContext/ThemeContext';


const PokemonSection: React.FC = () => {

  const [pokeball, setPokeball] = useState<string[]>([]);
  const [selectCard, setSelectCard] = useState<number>(0);
  const [firstUrl, setFirstUrl] = useState<string | null>(null);
  const [secondUrl, setSecondUrl] = useState<string | null>(null);
  const [firstCard, setFirstCard] = useState<HTMLElement | null>(null);
  const [secondCard, setSecondCard] = useState<HTMLElement | null>(null);
  const [match, setMatch] = useState<number>(0);

  const { updateDisableSelect, dificulty,  newElements, startGame, deleteElements, updateMistakes, mistakes } = useContext(gamesContext) as GamesContextType;
  const { dataUser, getDataUser, validateLoading, isLogged } = useContext(userContext) as UserContextType;
  const { theme, firstColor } = useContext(themeContext) as ThemeContextType;
  
  const navigate = useNavigate();
  
  const getFirstCard = (firstCard: HTMLElement): void => {
    setFirstCard(firstCard);
  }

  const getSecondCard = (secondCard: HTMLElement): void => {
    setSecondCard(secondCard);
  }

  const updateSelectCard = (selectCard: number): void => {
    setSelectCard(selectCard + 1);
  }
  
  const updateMatch = (match: number): void => {
    setMatch(match + 1)
  } 

  const updateFirstUrl = (firstUrl: string | null): void => {
    setFirstUrl(firstUrl);
  }
  
  const updateSecondUrl = (secondCard: string | null): void => {
    setSecondUrl(secondCard);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user: string | null = localStorage.getItem('user');
        const response: Response = await dataUserFetch(user);
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

  useEffect(() => {
    const getPokemons = () => {
      const arr: Promise<string>[] = newElements.map( async (item: number) => 
        await getPokemonsImg(item)
        )
      arr.sort(() => Math.random() - 0.5);
      return arr;
    }
    try {
      const promise = getPokemons();
      Promise.all(promise).then((results) => setPokeball(results));
    } catch (error) {
      console.log(error);
    }
  }, [ newElements]);

  useEffect(() => {
    const validateSuccess = () => {
      if (firstUrl !== secondUrl && secondCard != null && firstCard != null ) {    
        setTimeout(() => {
          secondCard.classList.remove("rotate");
          firstCard.classList.remove("rotate");
          updateSelectCard(-1);
          updateFirstUrl(null);
          updateSecondUrl(null);
          updateMistakes(mistakes);
        }, 800);
      } else {
        updateSelectCard(-1);
        updateFirstUrl(null);
        updateSecondUrl(null);
        updateMatch(match);
      } 
    }
    if (secondUrl !== null && secondCard !== null) {
      validateSuccess()
    }
  }, [firstUrl, secondUrl, firstCard, secondCard, match, mistakes, updateMistakes]);

  useEffect( () => {
    const setScore = async () => {

      const newScore: {
        easy: number;
        medium: number;
        hard: number;
    } = updatePokemonScore(dataUser, dificulty);
      
      const newData: UserInterface = {
        name: dataUser.name,
        email: dataUser.email,
        trophies: Number(dataUser.trophies) + 1,
        games: [{ ...dataUser.games[1]}, {name: 'pokemon', dificulty: newScore}]
      }

      const response = await updatePokemonScorePost(newData);
      const content = await response.json();
      getDataUser(content);
    }
    
    const endPokemonGame = () => {
      startGame(false);
      deleteElements();
      updateMatch(-1);
      updateMistakes(-1);
      updateDisableSelect(false);
    }
    
    const alertWinPokemon = () => {
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
        setScore();
        endPokemonGame();
      }, 500); 
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
        endPokemonGame();
      }, 500);
    }

    if ( match > 0 && match === (newElements.length / 2) ) alertWinPokemon();
    if ( mistakes === 3 && dificulty === 'Easy' ) defeatAlert();
    if ( mistakes === 6 && dificulty === 'Medium' ) defeatAlert();
    if ( mistakes === 10 && dificulty === 'Hard' ) defeatAlert();
  }, [ match, newElements, deleteElements, startGame, getDataUser, dataUser, dificulty, mistakes, updateMistakes, updateDisableSelect ]);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      margin: '20px',
      borderRadius: '24px',
      alignItems: 'center',
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
        maxWidth: { xs: '336px', sm: '560px', md: '599px'}
      }} >
        <PokemonContainer 
        pokeball={pokeball}
        selectCard={selectCard}
        firstUrl={firstUrl}
        secondUrl={secondUrl}
        updateFirstUrl={updateFirstUrl}
        updateSecondUrl={updateSecondUrl}
        updateSelectCard={updateSelectCard} 
        getFirstCard={getFirstCard}
        firstCard={firstCard}
        getSecondCard={getSecondCard}
        secondCard={secondCard}
        updateMatch={updateMatch}
        />
      </Box>
    </Box>
  )
}

export default PokemonSection;