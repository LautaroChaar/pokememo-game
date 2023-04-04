import GitHubIcon from '@mui/icons-material/GitHub';
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {

	return (
	<footer>
		<Box sx={{
			display: 'flex',
			flexDirection: {xs: 'column', sm: 'row'},
			justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: '#242424',
      padding: '20px'
		}} >
			<Typography variant='h4' sx={{
				color: '#b7b7b7',
        m: 2,
				fontSize: '1rem',
				fontWeight: 'bold',
				fontFamily: 'Ubuntu, sans-serif'
			}}>Created by Lautaro Chaar</Typography>
			<Box >
				<a referrerPolicy='no-referrer' rel='noreferrer' href='https://github.com/LautaroChaar' target='_blank' ><GitHubIcon sx={{display: 'block', color: '#b7b7b7', '&:hover': {color: '#dddddd'}}} /></a>
			</Box>
		</Box>
	</footer>
  )
}

export default Footer;