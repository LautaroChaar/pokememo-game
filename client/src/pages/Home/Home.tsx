import { Box, Typography, CircularProgress } from '@mui/material';
import { userContext } from '../../context/UserContext/UserContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContextType, UserContextType, UserInterface } from '../../models';
import { dataUserFetch } from '../../services';
import { themeContext } from '../../context/ThemeContext/ThemeContext';


const Home: React.FC = () => {

  const { dataUser, isLogged, isLoading, validateLoading, getDataUser } = useContext(userContext) as UserContextType;
  const { theme, firstColor, secondColor, thirdColor } = useContext(themeContext) as ThemeContextType;

  const navigate = useNavigate();
  
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


  if (isLoading) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: {xs: 'calc(100vh - 196px)', sm:'calc(100vh - 172px)', md: 'calc(100vh - 172.5px)'},
        backgroundColor: '#4f4f4fa8',
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '80%',
          backgroundColor: '#ffef8b',
          margin: '20px 0',
          alignItems: 'center',
          borderRadius: '20px',
          padding:{ xs: '20px 10px', sm: '40px 10px', md: '60px 30px' },
          maxWidth: { xs: '336px', sm: '560px', md: '800px'},
          '& .pokemonImg': { 
            margin: '16px auto', 
            height: '60px', 
            filter: 'filter: contrast(0.5)'
          }
        }} >
          <Typography variant="h1" sx={{ 
            fontFamily:'Ubuntu, sans-serif', 
            fontSize: {xs: '1.2rem', sm: '1.5rem', md: '2rem'}, 
            margin: '10px', 
            fontWeight: 'bold', 
            color: '#515151', 
            }} >
              Loading...
            </Typography>
          <CircularProgress sx={{ margin: '16px'}} />
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={{
      display: 'flex',
      margin: '20px',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: '24px',
      justifyContent: 'space-evenly',
      minHeight: { xs: 'calc(100vh - 236px)', sm: 'calc(100vh - 212px)', md: 'calc(100vh - 212.5px)'},
      backgroundColor: '#4f4f4fa8',
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        boxShadow: '3px 3px 1px #24242496',
        backgroundColor: `${firstColor[theme]}`,
        margin: '20px 0',
        borderRadius: '20px',
        padding: '20px',
        maxWidth: { xs: '336px', sm: '560px', md: '90%'}
      }}>
        <Typography variant="h1" sx={{ 
          fontFamily:'Ubuntu, sans-serif', 
          fontSize: {xs: '1.2rem', sm: '1.5rem', md: '2rem'}, 
          margin: '10px', 
          fontWeight: 'bold', 
          color: `${secondColor[theme]}` 
          }} > { `Welcome `} 
          <Typography variant='inherit' sx={{ 
          color: `${thirdColor[theme]}`,
          display: 'inline-block' 
          }} >
            {dataUser.name}
          </Typography>
        </Typography>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }
        }}>
          <Box sx={{
            p: 2
          }}>
            <Typography variant="h2" sx={{ 
              fontFamily:'Ubuntu, sans-serif', 
              fontSize: {xs: '1rem', sm: '1.1rem', md: '1.2rem'}, 
              margin: '10px', 
              color: `${thirdColor[theme]}`, 
              textDecoration: 'underline', 
              fontWeight: 'bold' 
              }} >
              "Numbers" section 
            </Typography>
            <Typography variant='subtitle2' sx={{ 
              fontFamily:'Ubuntu, sans-serif', 
              fontSize: {xs: '1rem', sm: '1.1rem', md: '1.2rem'}, 
              margin: '10px', 
              color: `${secondColor[theme]}` 
              }} >
              In the game "Numbers" some buttons will be generated with a number printed on each one. They'll be displayed for a few seconds and then they'll disappear. You have to find them from smallest to largest ( 1 - 2 - 3... ). If you make 5 mistakes you lose the game.
            </Typography>
          </Box>
          <Box sx={{
            p: 2
          }}>
            <Typography variant="h2" sx={{
              fontFamily:'Ubuntu, sans-serif', 
              fontSize: {xs: '1rem', sm: '1.1rem', md: '1.2rem'}, 
              margin: '10px', 
              color: `${thirdColor[theme]}`,
              textDecoration: 'underline', 
              fontWeight: 'bold'
              }} >
              "Pokemon" section 
            </Typography>
            <Typography variant="subtitle2" sx={{ 
              fontFamily:'Ubuntu, sans-serif',
              fontSize: {xs: '1rem', sm: '1.1rem', md: '1.2rem'}, 
              margin: '10px', 
              color: `${secondColor[theme]}` 
            }} >
              In the game 'Pokememo' you will have to find the two identical pokemons. You must rotate the pokeballs to see which pokemon contains. If you rotate two pokeballs and the pokemons doesn't match, they will hide again. If you make 3 ( easy ), 6 ( medium ) or 10 ( hard ) mistakes you lose the game.
            </Typography>
          </Box>
        </Box>
        <Typography variant="h3" sx={{ 
          fontFamily:'Ubuntu, sans-serif', 
          fontSize: {xs: '1rem', sm: '1.1rem', md: '1.2rem'}, 
          margin: '10px', color: `${thirdColor[theme]}`, 
          fontWeight: 'bold' 
        }} >
          Enjoy and train your brain!
        </Typography>
      </Box>
    </Box>
  );
}

export default Home;