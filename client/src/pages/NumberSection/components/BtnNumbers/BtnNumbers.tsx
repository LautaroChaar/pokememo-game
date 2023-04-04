import { Button } from '@mui/material';
import { useState, useRef, useContext, useEffect } from 'react';
import { gamesContext } from '../../../../context/GamesContext/GamesContext';
import { GamesContextType, ThemeContextType } from '../../../../models';
import { BtnNumbersProps } from '../../models';
import { themeContext } from '../../../../context/ThemeContext/ThemeContext';


const BtnNumbers: React.FC<BtnNumbersProps> = ({ id, value, updateUncoverNumber, uncoverNumber }) => {

  const [btnValue, setBtnValue] = useState<string>(value);
  const [success, setSuccess] = useState<boolean>(false);

  const { dificulty, updateMistakes, mistakes } = useContext(gamesContext) as GamesContextType;
  const { theme, faceImg } = useContext(themeContext) as ThemeContextType; 

  const btnRef = useRef<any>(null);

  useEffect( () => {
    setSuccess(true);
    if (dificulty === "Easy") {
      setTimeout(() => {
        setBtnValue(' ');
        setSuccess(false);
      }, 4000);
    } else if (dificulty === "Medium") {
      setTimeout(() => {
        setBtnValue(' ');
        setSuccess(false);
      }, 7000);
    } else {
      setTimeout(() => {
        setBtnValue(' ');
        setSuccess(false);
      }, 11000);
    }
  }, [dificulty]);

  const handleNumbersBtnClick = () => {
    btnRef.current.style.background = 'transparent';
    uncover();
    setBtnValue(id);
    
  }

  const uncover = () => {
    if (uncoverNumber + 1 === Number(id)) {
      updateUncoverNumber(uncoverNumber);
      setSuccess(true);
    } else {
      updateMistakes(mistakes);
      btnRef.current.style.color = '#d35f62';
      setTimeout(() => {
        btnRef.current.style.background = `url(${faceImg[theme]})`;
        btnRef.current.style.backgroundSize = '34px',
        btnRef.current.style.backgroundPosition = 'center',
        btnRef.current.style.backgroundRepeat = 'no-repeat',
        btnRef.current.style.color = '#242424';
        setBtnValue(' ');
      }, 800);
    }
  }

  return (
    <Button 
    sx={{
      ':disabled': {
        background: 'transparent',
        color: '#242424'
      },
      color: '#242424',
      background: `url(${faceImg[theme]})`,
      backgroundSize: '34px',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      border: '1px solid #242424',
      fontWeight: 'bolder',
      fontFamily:'Ubuntu, sans-serif',
      my: 1,
      mx: 1,
      fontSize: '1.2rem',
      minHeight: 48,
      minWidth: 50,
      '&:hover': { background: '#2424249e'},
    }}
    id={id}
    ref={btnRef}
    onClick={ () => { handleNumbersBtnClick() }} 
    disabled={ success ? true : false} > 
    {btnValue} 
    </Button>
  )
}

export default BtnNumbers;