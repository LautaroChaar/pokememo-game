import { Box, Button, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../context/UserContext/UserContext';
import { UserContextType } from '../../models';
import { themeContext } from '../../context/ThemeContext/ThemeContext';
import ThemeContextType from '../../models/types/ThemeContextType/ThemeContextType';


const LandingPage: React.FC = () => {

  const { isLogged } = useContext(userContext) as UserContextType;
  const { theme, firstColor, secondColor, thirdColor, thirdColorOpacity } = useContext(themeContext) as ThemeContextType;

  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate(`/home`);
    } 
  }, [isLogged]);


  return (
    <Box sx={{
      minHeight: {xs: 'calc(100vh - 235.75px)', sm: 'calc(100vh - 213.75px)'},
      backgroundColor: '#4f4f4fa8',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '24px',
      margin: '20px'
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        backgroundColor: `${firstColor[theme]}`,
        margin: '20px 0',
        borderRadius: '20px',
        padding:{ xs: '20px 10px', sm: '40px 10px', md: '60px 30px' },
        maxWidth: { xs: '336px', sm: '560px', md: '800px'}
      }}>
        <Typography className='opacityAnimation' variant="h1" sx={{ 
          fontFamily: 'Ubuntu, sans-serif', 
          fontSize: {xs: '1.2rem', sm: '1.5rem', md: '2rem'}, 
          margin: '10px', 
          fontWeight: 'bolder', 
          color: `${secondColor[theme]}`,
          
          }}>
            Welcome to Pokememo
        </Typography>
        <Typography className='opacityAnimation' variant="h2" sx={{ 
          fontFamily: 'Ubuntu, sans-serif', 
          fontSize: {xs: '1rem', sm: '1.3rem', md: '1.8rem'}, 
          margin: '10px', 
          color: `${secondColor[theme]}`,
          fontWeight: 400
          }}>
            This memotest has two differents styles of game and three difficulties for each one.
        </Typography>
        <Box className='opacityAnimation' sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly'
        }}>
          <Button sx={{
            width: 'fit-content',
            background: 'none',
            marginTop: '20px',
            color: '#000',
            '&:hover': { backgroundColor: 'transparent'},
            '&:active': { backgroundColor: 'transparent'},
            '& .linkForm': { color: `${thirdColorOpacity[theme]}`},
            '& .linkForm:hover': { color: `${thirdColor[theme]}`},
          }} 
          type="button"
          >
            <Link to={'/login'} className='linkForm' >Sign in</Link>
          </Button>
          <Button sx={{
            width: 'fit-content',
            background: 'none',
            marginTop: '20px',
            fontStyle: 'normal', 
            color: '#000',
            '&:hover': { backgroundColor: 'transparent'},
            '&:active': { backgroundColor: 'transparent'},
            '& .linkForm': { color: `${thirdColorOpacity[theme]}`},
            '& .linkForm:hover': { color: `${thirdColor[theme]}`},
          }} 
          type="button">
            <Link to={'/register'} className='linkForm' >Sign up</Link>  
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default LandingPage;