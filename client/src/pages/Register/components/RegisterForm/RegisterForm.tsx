import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useState, useContext } from 'react';
import { FormInput } from '../../../../components';
import { userContext } from '../../../../context/UserContext/UserContext';
import { ThemeContextType, UserContextType } from '../../../../models';
import { registerPost } from '../../services';
import { themeContext } from '../../../../context/ThemeContext/ThemeContext';


const RegisterForm: React.FC = () => {

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  const { userLoggedIn } = useContext(userContext) as UserContextType;
  const { theme, firstColor, secondColor, thirdColor, thirdColorOpacity, formImg } = useContext(themeContext) as ThemeContextType; 

  const navigate = useNavigate();

  const handleClickRegister: () => Promise<void> = async () => {
    const user = {
      name,
      email,
      password
    };
    try {
      const response = await registerPost(user);
      const content = await response.json();
      const { token } = content;
      token && localStorage.setItem('access_token', token);
      localStorage.setItem('isLogged', 'true');
      localStorage.setItem('user', email);
      userLoggedIn();
      navigate('/home');
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Ups :(',
        html:`
        <p style='color: #b7b7b7; font-weight: bold;' class="scoreTitle">User already exist.</p>
        `,
        color: '#d35f62',
        background: '#242424',
        confirmButtonText: 'Close',
        confirmButtonColor: '#2a2731'
      });
    }
  }

  const registerFormConditions = name !== "" && email !== "" && password !== "";

  const validateRegister = (): void => { 
    if (registerFormConditions) handleClickRegister();
  }

  const goToLogin = (): void => {
    navigate('/login');
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: {xs: 'column', md: 'row'},
      justifyContent: {xs: 'center', md: 'space-evenly'},
      alignItems: {xs: 'center'},
      width: '100%',
      '& .registerForm': { backgroundColor: `${firstColor[theme]}` },
    }}>
      <form className="registerForm" >
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
            REGISTER
        </Typography>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }} >
          <img src={`${formImg[theme]}`} className='pokemonImg' alt="pokemon-image" />
          <Box sx={{
            display: 'flex',
            flexDirection: {xs: 'column', md: 'row'},
            flexWrap: { md: 'wrap'},
            width: { md: '600px'},
            justifyContent: 'space-evenly',
            margin: '10px',
          }} >
            <FormInput
            condition='Must contain 8-20 characters long characters'
            label="Username"
            type="text"
            placeholder="Username"
            onChange={setName}
            validationRegex={/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/}
            />
            <FormInput
            label="Email"
            type="email"
            placeholder="Example@example.com"
            onChange={setEmail}
            validationRegex={/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}
            />
            <FormInput
            condition='Must contain minimum eight characters, at least one letter and one number'
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
              onClick={validateRegister}>
              Sign up
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
              onClick={goToLogin}>
                Sign in
              </Button>
            </Box>
          </Box>
      </form>
    </Box>
  );
}

export default RegisterForm;