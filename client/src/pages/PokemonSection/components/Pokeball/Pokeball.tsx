import { Box } from '@mui/material';
import { useRef } from 'react';
import { PokeballProps } from '../../models';

const Pokeball: React.FC<PokeballProps> = ({ getSecondCard, getFirstCard, updateSelectCard, updateFirstUrl, updateSecondUrl, image, id, selectCard  }) => {

  const card = useRef<any>(null);
  const pokeImage = useRef<any | null>(null);
  
  const handleOnClickCard = () => {
    selectCard === 0 && selectFirstCard();
    selectCard === 1 && selectSecondCard();
  }

  const selectFirstCard = () => {
    if (!card.current.classList.contains('rotate')){
      card.current.classList.add('rotate');
      card.current.classList.add('fisrtCard');
      pokeImage.current.classList.add('firstImg');
      updateFirstUrl(pokeImage.current.src);
      getFirstCard(card.current);
      updateSelectCard(selectCard);
    }
  }

  const selectSecondCard = () => {
    if (!card.current.classList.contains('rotate')){
      card.current.classList.add('rotate');
      card.current.classList.add('fisrtCard');
      pokeImage.current.classList.add('secondImg');
      updateSecondUrl(pokeImage.current.src);
      getSecondCard(card.current);
      updateSelectCard(selectCard);
    }
  }

  return (
    <Box  className='cardGame' id={String(id)} ref={card} onClick={ () => { handleOnClickCard() } } sx={{
      width: { xs: '44px', sm: '50px', md: '60px'},
      height: { xs: '44px', sm: '50px', md: '60px'},
      position: 'relative',
      margin: '6px',
      transformStyle: 'preserve-3d',
      boxShadow: '#000000cc 0px 5px 15px',
      border: 'none',
      borderRadius: '110px',
      transition: '.3s',
      cursor: 'pointer',
      backgroundColor: '#b0b0b047'
    }} >
      <Box className='frontCard' sx={{
        position: 'absolute',
        backfaceVisibility: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: '.3s',
      }} >
        <img src='' alt='' className='pokeballImg' />
      </Box>
      <Box className='backCard' sx={{
        position: 'absolute',
        backfaceVisibility: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        transform: 'rotateY(-180deg)',
        borderRadius: '110px',
        transition: '.3s',
      }} >
        <img src={image} alt='' className='pokeImg' ref={pokeImage} />
      </Box>
    </Box>
  )
}

export default Pokeball;