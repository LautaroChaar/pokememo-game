import { Box } from '@mui/material';
import { LoginForm } from './components';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { userContext } from '../../context/UserContext/UserContext';
import { UserContextType } from '../../models';

const Login: React.FC = () => {

  const { isLogged } = useContext(userContext) as UserContextType;

  const navigate = useNavigate()

  useEffect(() => {
    if (isLogged) {
      navigate(`/home`);
    }
  }, [isLogged]);

  return (
    <Box sx={{ 
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#4f4f4f8c',
      borderRadius: '24px',
      margin: '20px',
      minHeight: {xs: 'calc(100vh - 237.75px)', sm: 'calc(100vh - 213.75px)'}
    }}>
      <LoginForm/>
    </Box>
  )
}

export default Login;