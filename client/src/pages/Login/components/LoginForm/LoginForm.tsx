import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { FormInput } from '../../../../components';
import { userContext } from '../../../../context/UserContext/UserContext';
import { ThemeContextType, UserContextType } from '../../../../models';
import { loginPost } from '../../services';
import { themeContext } from '../../../../context/ThemeContext/ThemeContext';

const LoginForm: React.FC = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { userLoggedIn } = useContext(userContext) as UserContextType;
  const { theme, firstColor, secondColor, thirdColor, thirdColorOpacity, formImg } = useContext(themeContext) as ThemeContextType;
  
  const navigate = useNavigate();

  const handleClickLogin: () => Promise<void> = async () => {
    const user = {
      email,
      password
    };
    try {
      const response: Response = await loginPost(user);
      const content = await response.json();
      const { token } = content;
      token && localStorage.setItem('access_token', token);
      localStorage.setItem('user', email);
      localStorage.setItem('isLogged', 'true');
      userLoggedIn();
      navigate('/home');
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Ups :(',
        html:`
        <p style='color: #b7b7b7; font-weight: bold;' class="scoreTitle">Invalid credentials</p>
        `,
        color: '#d35f62',
        background: '#242424',
        confirmButtonText: 'Close',
        confirmButtonColor: '#2a2731'
      });
    }
  }

  const loginFormConditions = email !== "" && password !== "";

  const validateLogin = (): void => { 
    if (loginFormConditions) handleClickLogin();
  }

  const goToRegister = (): void => {
    navigate('/register');
  }

  useEffect(() => {
    
  }, [theme]); 

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: {xs: 'column', md: 'row'},
      justifyContent: {xs: 'center', md: 'space-evenly'},
      alignItems: {xs: 'center'},
      width: '100%',
      '& .loginForm': { backgroundColor: `${firstColor[theme]}` },
    }}>
      <form className="loginForm"  >
        <Typography variant="h1" sx={{ 
          writingMode: {md: 'vertical-lr'},
          textOrientation: {md: 'upright'},
          fontFamily:'Ubuntu, sans-serif',
          fontSize: {xs: '1.2rem', sm: '1.3rem', md: '1.4rem'},
          margin: { xs: '12px 0', md: '0 12px'},
          fontWeight: 'bold',
          color: `${secondColor[theme]}`,
          position: 'relative'
          }} >
            LOGIN
        </Typography>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <img src={`${formImg[theme]}`} className='pikachuImg' alt="pikachu" />
          <Box sx={{
            display: 'flex',
            flexDirection: {xs: 'column', md: 'row'},
            justifyContent: 'space-evenly',
            margin: '10px',
          }} >
            <FormInput
              label="Email"
              type="email"
              placeholder="Example@example.com"
              onChange={setEmail}
              validationRegex={/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}
            />
            <FormInput
              label="Password"
              type="password"
              placeholder="************"
              onChange={setPassword}
              validationRegex={/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/}
            />
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly'
          }}>
            <Button 
            sx={{
              textDecoration: 'none',
              fontFamily: 'Ubuntu, sans-serif',
              color: `${thirdColorOpacity[theme]}`,
              fontSize: {xs: '1rem', sm: '1.1rem', md: '1.2rem'},
              textTransform: 'capitalize',
              width: 'fit-content',
              background: 'none',
              '&:hover': { backgroundColor: 'transparent', color: `${thirdColor[theme]}`, transition: 'color .3s ease-in-out'}
            }} 
            type="button"
            onClick={validateLogin}>
              Sign in
            </Button>
            <Button 
            sx={{
              textDecoration: 'none',
              fontFamily: 'Ubuntu, sans-serif',
              color: `${thirdColorOpacity[theme]}`,
              fontSize: {xs: '1rem', sm: '1.1rem', md: '1.2rem'},
              textTransform: 'capitalize',
              width: 'fit-content',
              background: 'none',
              '&:hover': { backgroundColor: 'transparent', color: `${thirdColor[theme]}`, transition: 'color .3s ease-in-out'}
            }} 
            type="button"
            onClick={goToRegister}>
              Sign up
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default LoginForm;