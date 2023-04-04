import { Box } from '@mui/material';
import { useContext } from 'react';
import { gamesContext } from '../../context/GamesContext/GamesContext';
import { FormSelectProps, GamesContextType, ThemeContextType } from '../../models';
import { themeContext } from '../../context/ThemeContext/ThemeContext';


const FormSelect: React.FC<FormSelectProps> = ({ label, onChange, options }) => {
  
  const { disableSelect } = useContext(gamesContext) as GamesContextType;
  const { thirdColor, secondColor, theme } = useContext(themeContext) as ThemeContextType;

  const onSelectChange = (value: string) => {
    if (value !== "" ) {
      onChange(value);
    } 
  };

  return (
    <Box sx={{
      '& .selectLabel': { color: `${thirdColor[theme]}` },
      '& .selectInput': { borderBottom: `2px solid ${secondColor[theme]}`, color: `${secondColor[theme]}` },
    }}>
      <label className="selectLabel" >{label}</label>
      <select 
      disabled={ disableSelect ? true : false }
      className="selectInput"
      onChange={(e) => onSelectChange(e.target.value)}
      >
      {options}
      </select>
    </Box>
  );
}

export default FormSelect;