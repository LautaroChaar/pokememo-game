import { Box, Typography, CircularProgress } from '@mui/material';
import { Header } from '../Header';
import { Footer } from '../Footer';


const Loading: React.FC = () => {

  return (
    <>
    <Header/>
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
    <Footer/>
    </>
    
  );
}

export default Loading;