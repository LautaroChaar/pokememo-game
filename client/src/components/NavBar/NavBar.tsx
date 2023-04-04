import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, ListItemIcon, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import Swal from 'sweetalert2';
import PaletteIcon from '@mui/icons-material/Palette';
import { pokememoSvg, pokemomeSvgPhone } from '../../assets/pokememo';
import { gamesContext } from '../../context/GamesContext/GamesContext';
import { userContext } from '../../context/UserContext/UserContext';
import { GamesContextType, UserContextType } from '../../models';
import { themeContext } from '../../context/ThemeContext/ThemeContext';
import ThemeContextType from '../../models/types/ThemeContextType/ThemeContextType';


const pages = [ 'Home', 'Pokemon', 'Numbers'];

const NavBar: React.FC  = () => {

  const { selectDificulty, startGame, deleteElements, updateMistakes } = useContext(gamesContext) as GamesContextType;
  const { dataUser, userLoggedOut, isLogged } = useContext(userContext) as UserContextType;
  const { changeTheme } = useContext(themeContext) as ThemeContextType;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [themeSettings, setThemeSettings] = useState<null | HTMLElement>(null);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const openSettings = Boolean(anchorEl);
  const openThemeSettings = Boolean(themeSettings);

  const handleThemePikachu = () => {
    changeTheme(0);
    setThemeSettings(null);
	}

  const handleThemeCharmander = () => {
    changeTheme(1);
    setThemeSettings(null);
	}

  const handleThemeBulbasaur  = () => {
    changeTheme(2);
    setThemeSettings(null);
	}
  
  const handleThemeSquirtle = () => {
    changeTheme(3);
    setThemeSettings(null);
	}

  const handleOpenSettings = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenThemeSettings = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
    setThemeSettings(event.currentTarget);
  };

  const handleCloseSettings = () => {
    setAnchorEl(null);
  };

  const handleCloseThemeSettings = () => {
    setThemeSettings(null);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

	const handleStatisticsClick = () => {
    setAnchorEl(null);
    Swal.fire({
      title: 'Statistics',
      color: '#d35f62',
      html: `
      <p style='color: #b7b7b7; font-weight: bold; font-family: Ubuntu, sans-serif;' class="trofeos">You have <span style='color: #ffef8b' >${dataUser.trophies}</span> trophies</p>
      <p style='color: #d35f62; font-weight: bold; font-family: Ubuntu, sans-serif;' class="scoreTitle">Numbers trophies</p>
      <div class="dificulty" style='color: #b7b7b7; font-weight: bold; font-family: Ubuntu, sans-serif;'>
      <p>Easy: <span style='color: #ffef8b'>${dataUser.games[1].dificulty.easy}</span></p><p> Medium: <span style='color: #ffef8b'>${dataUser.games[1].dificulty.medium}</span></p><p> Hard: <span style='color: #ffef8b'>${dataUser.games[1].dificulty.hard}</span></p>
      </div>
      <p class="scoreTitle" style='color: #d35f62; font-weight: bold; font-family: Ubuntu, sans-serif;'>Pokememo trophies</p>
      <div class="dificulty" style='color: #b7b7b7; font-weight: bold; font-family: Ubuntu, sans-serif;'>
      <p>Easy: <span style='color: #ffef8b'>${dataUser.games[0].dificulty.easy}</span></p><p> Medium: <span style='color: #ffef8b'>${dataUser.games[0].dificulty.medium}</span></p><p> Hard: <span style='color: #ffef8b'>${dataUser.games[0].dificulty.hard}</span></p>
      </div>
      `,
      background: '#242424',
      confirmButtonText: 'Close',
      confirmButtonColor: '#2a2731'
    });
  }

  const handlePagesClick = () => {
    startGame(false);
    deleteElements();
    selectDificulty('Easy');
    updateMistakes(-1);
	}

  const handleLoggedOutClick = () => {
    Swal.fire({
      title: `Good bye ${dataUser.name}`,
      html: `
      <p style='color: #ffef8b; font-weight: bold; font-family: Ubuntu, sans-serif;'>Come back to play soon!</p>`,
      text: 'Come back to play soon!',
      timer: 1500,
      color: '#b7b7b7',
      background: '#242424',
      timerProgressBar: true,
      showCancelButton: false,
      showConfirmButton: false,
    })
    setAnchorEl(null);
    localStorage.setItem('isLogged', 'false');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setTimeout(() => {
      userLoggedOut();
    }, 1500);
  }

	if (!isLogged) {
    return (
    	<AppBar position="static" sx={{
        backgroundColor: '#242424',
        height: 80,
        display: 'flex',
        justifyContent: 'center',
        }} >
    	  <Container maxWidth="xl" >
    	    <Toolbar disableGutters sx={{
            justifyContent: 'space-between'
          }}>
            <Box sx={{
              width: '48px'
            }}/>
    	      <Typography
    	      variant="inherit"
    	      noWrap
    	      sx={{
    	        display: { xs: 'none', sm: 'flex' },
    	      }}
    	      >
    	        <Link to={'/'} className='logo'>
    	          <img src={pokememoSvg} height="40px" alt="logo-pokememo" />
    	        </Link> 
    	      </Typography>
    	      <Typography
    	      variant="h6"
    	      noWrap
    	      sx={{
    	        display: { xs: 'flex', sm: 'none' },
    	        justifyContent: {xs: 'center', sm: 'start'},
    	        flexGrow: 1,
    	      }}
    	      >
    	        <Link to={'/'} className='logo'>
    	          <img src={pokemomeSvgPhone}  height="45px" alt="logo-pokememo" />
    	        </Link> 
    	      </Typography>
            <Box sx={{ 
              display: 'flex',
              width: '48px'
              }}>
              <IconButton 
              size="large" 
              id="demo-positioned-button" 
              color="inherit" 
              aria-controls={openSettings ? 'demo-positioned-menu' : undefined} 
              aria-expanded={openSettings ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleOpenSettings} sx={{ color: '#b7b7b7', '&:hover': {color: '#dddddd'} }} >
                <SettingsIcon />
              </IconButton>
            </Box>
            <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={openSettings}
            onClose={handleCloseSettings}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }} 
            sx={{
              display: 'block',
              '& .MuiPaper-root': {
              width: '200px',
              borderBottomLeftRadius: '20px',
              backgroundColor: '#242424',
              right: '0px !important',
              top: '78px !important',
              left: 'unset !important',
              boxShadow: '-1px 3px 5px 1px rgba(0,0,0,0.2), 0px 5px 5px 3px rgba(0,0,0,0.12)'
              },
              '& .MuiList-root': {
              height: '100%',
              padding: '0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly'
              },
              '& .MuiMenuItem-root': {
                fontFamily: 'Ubuntu, Sans serif',
                fontWeight: 'bold',
                justifyContent: 'center',
              }
            }} >
              <MenuItem onClick={ handleOpenThemeSettings } sx={{
                margin: '10px 0',
                color: '#b7b7b7',
                '&:hover': {
                  color: '#dddddd'
                } 
              }} >
                <ListItemIcon>
                  <PaletteIcon fontSize="medium" sx={{ color: '#b7b7b7' }} />
                </ListItemIcon>
                Theme
              </MenuItem>
            </Menu>
            <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={themeSettings}
            open={openThemeSettings}
            onClose={handleCloseThemeSettings}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }} 
            sx={{
              display: 'block',
              '& .MuiPaper-root': {
              width: '200px',
              borderBottomLeftRadius: '20px',
              backgroundColor: '#242424',
              right: '0px !important',
              top: '78px !important',
              left: 'unset !important',
              boxShadow: '-1px 3px 5px 1px rgba(0,0,0,0.2), 0px 5px 5px 3px rgba(0,0,0,0.12)'
              },
              '& .MuiList-root': {
              height: '100%',
              padding: '0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly'
              },
              '& .MuiMenuItem-root': {
                fontFamily: 'Ubuntu, Sans serif',
                fontWeight: 'bold',
                justifyContent: 'center',
              }
            }} >
              <MenuItem onClick={ () => { handleThemePikachu() } } sx={{
                margin: '10px 0',
                color: '#b7b7b7',
                '&:hover': {
                  color: '#ffef8b'
                } 
              }} >Pikachu</MenuItem>
              <MenuItem onClick={ () => { handleThemeCharmander() } } sx={{
                margin: '10px 0',
                color: '#b7b7b7',
                '&:hover': {
                  color: '#fe944196'
                } 
              }} >Charmander</MenuItem>
              <MenuItem onClick={ () => { handleThemeBulbasaur() } } sx={{
                margin: '10px 0',
                color: '#b7b7b7',
                '&:hover': {
                  color: '#cef79f'
                } 
              }} >Bulbasaur</MenuItem>
              <MenuItem onClick={ () => { handleThemeSquirtle() } } sx={{
                margin: '10px 0',
                color: '#b7b7b7',
                '&:hover': {
                  color: '#297383'
                } 
              }} >Squirtle</MenuItem>
            </Menu>
    	    </Toolbar>
    	  </Container>
    	</AppBar>
		)
  }

	return (
    <AppBar position="static" sx={{
      backgroundColor: '#242424',
      height: 80,
      display: 'flex',
      justifyContent: 'center',
      }} >
      <Container maxWidth="xl" >
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'center' }} >
          <Typography
          variant="inherit"
          noWrap
          sx={{
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'Ubuntu',
            fontSize: '1.5rem',
            fontWeight: 700
          }}
          >
            <Link to={'/'} className='logo'>
              <img src={pokememoSvg}  height="45px" alt="logo-pokememo" />
            </Link> 
          </Typography>
          <Box sx={{ 
            display: { xs: 'flex', md: 'none' }, 
            width: '80px'
            }}>
            <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
            >
              <MenuIcon sx={{ 
                color: '#b7b7b7',
                '&:hover': { color: '#dddddd' } }} />
            </IconButton>
            <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiPaper-root': {
              height: '100vh',
              width: '40vw',
              backgroundColor: '#242424',
              boxShadow: 'none',
              left: '0px !important',
              top: '78px !important'
              },
              '& .MuiList-root': {
              height: '100%',
              padding: '0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly'
              },
              '& .MuiMenuItem-root': {
              textTransform: 'uppercase',
              justifyContent: 'center',
              height: '50%',
              }
            }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography >
                    <Link to={`/${page.toLowerCase()}`} className='linkPages' onClick={ () => { handlePagesClick() } }>
                      {page}
                    </Link> 
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
          variant="inherit"
          noWrap
          sx={{
            display: { xs: 'flex', md: 'none' },
            justifyContent: {xs: 'center', md: 'star'},
            flexGrow: 1,
            fontFamily: 'Ubuntu',
            fontSize: '1.5rem',
            fontWeight: 700
          }}
          >
            <Link to={'/home'} className='logo'>
              <img src={pokemomeSvgPhone}  height="50px" alt="logo-pokememo" />
            </Link> 
          </Typography>
          <Box sx={{ 
            flexGrow: 1, 
            display: { xs: 'none', md: 'flex' }, 
            justifyContent: 'space-evenly' 
            }} >
            {pages.map((page) => (
              <Button
              key={page}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to={`/${page.toLowerCase()}`} className='linkPages' onClick={ () => { handlePagesClick() } }>
                  {page}
                </Link>
              </Button>
            ))}
          </Box>
          <Box sx={{ 
              display: 'flex',
              width: '48px'
              }}>
              <IconButton 
              size="large" 
              id="demo-positioned-button" 
              color="inherit" 
              aria-controls={openSettings ? 'demo-positioned-menu' : undefined} 
              aria-expanded={openSettings ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleOpenSettings} sx={{ color: '#b7b7b7', '&:hover': {color: '#dddddd'} }} >
                <SettingsIcon />
              </IconButton>
            </Box>
            <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={openSettings}
            onClose={handleCloseSettings}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }} 
            sx={{
              display: 'block',
              justifyContent: 'flex-start',
              '& .MuiPaper-root': {
              width: '200px',
              borderBottomLeftRadius: '20px',
              backgroundColor: '#242424',
              right: '0px !important',
              top: '78px !important',
              left: 'unset !important',
              boxShadow: '-1px 3px 5px 1px rgba(0,0,0,0.2), 0px 5px 5px 3px rgba(0,0,0,0.12)'
              },
              '& .MuiList-root': {
              height: '100%',
              padding: '0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly'
              },
              '& .MuiMenuItem-root': {
                fontFamily: 'Ubuntu, Sans serif',
                fontWeight: 'bold',
                paddingLeft: '30px',
              }
            }} >
              <MenuItem onClick={ handleOpenThemeSettings } sx={{
                margin: '10px 0',
                color: '#b7b7b7',
                '&:hover': {
                  color: '#dddddd'
                },
                '&:hover .paletteIcon': {
                  color: '#dddddd'
                } 
              }} >
                <ListItemIcon>
                  <PaletteIcon className='paletteIcon' fontSize="medium" sx={{ color: '#b7b7b7' }} />
                </ListItemIcon>
                Theme
              </MenuItem>
              <MenuItem onClick={ () => { handleStatisticsClick() }} sx={{
                margin: '10px 0',
                color: '#b7b7b7',
                '&:hover': {
                  color: '#ffef8b'
                },
                '&:hover .trophiesIcon': {
                  color: '#ffef8b'
                }  
              }} >
                <ListItemIcon>
                  <EmojiEventsIcon fontSize="medium" className='trophiesIcon' sx={{ color: '#b7b7b7' }} />
                </ListItemIcon>
                Trophies
              </MenuItem>
              <MenuItem onClick={ () => {handleLoggedOutClick() }} sx={{
                margin: '10px 0',
                color: '#b7b7b7',
                '&:hover': {
                  color: '#d35f62'
                },
                '&:hover .logoutIcon': {
                  color: '#d35f62'
                }  
              }} >
                <ListItemIcon>
                  <LogoutIcon fontSize="medium" className='logoutIcon' sx={{ color: '#b7b7b7' }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
            <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={themeSettings}
            open={openThemeSettings}
            onClose={handleCloseThemeSettings}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }} 
            sx={{
              display: 'block',
              justifyContent: 'flex-start',
              '& .MuiPaper-root': {
              width: '200px',
              borderBottomLeftRadius: '20px',
              backgroundColor: '#242424',
              right: '0px !important',
              top: '78px !important',
              left: 'unset !important',
              boxShadow: '-1px 3px 5px 1px rgba(0,0,0,0.2), 0px 5px 5px 3px rgba(0,0,0,0.12)'
              },
              '& .MuiList-root': {
              height: '100%',
              padding: '0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly'
              },
              '& .MuiMenuItem-root': {
                fontFamily: 'Ubuntu, Sans serif',
                fontWeight: 'bold',
                paddingLeft: '30px',
              }
            }} >
              <MenuItem onClick={ () => { handleThemePikachu() } } sx={{
                margin: '10px 0',
                color: '#b7b7b7',
                '&:hover': {
                  color: '#ffef8b'
                } 
              }} >Pikachu</MenuItem>
              <MenuItem onClick={ () => { handleThemeCharmander() } } sx={{
                margin: '10px 0',
                color: '#b7b7b7',
                '&:hover': {
                  color: '#fe944196'
                } 
              }} >Charmander</MenuItem>
              <MenuItem onClick={ () => { handleThemeBulbasaur() } } sx={{
                margin: '10px 0',
                color: '#b7b7b7',
                '&:hover': {
                  color: '#cef79f'
                } 
              }} >Bulbasaur</MenuItem>
              <MenuItem onClick={ () => { handleThemeSquirtle() } } sx={{
                margin: '10px 0',
                color: '#b7b7b7',
                '&:hover': {
                  color: '#297383'
                } 
              }} >Squirtle</MenuItem>
            </Menu>
        </Toolbar>
      </Container>
    </AppBar>
	)
}

export default NavBar;