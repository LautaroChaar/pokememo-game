import { Box, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { FormInputProps, ThemeContextType } from '../../models';
import { themeContext } from '../../context/ThemeContext/ThemeContext';

const FormInput: React.FC<FormInputProps> = ({ validationRegex, label, type, placeholder, onChange, condition }) => {

  const [error, setError] = useState(false);
  const { theme, secondColor, thirdColor, thirdColorOpacity } = useContext(themeContext) as ThemeContextType;

  const onInputChange = (value: string) => {
    if (value !== "" && validationRegex.test(value)) {
      onChange(value);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& .formLabel': { color: `${thirdColor[theme]}` },
      '& .formInput': { borderBottom: `2px solid ${secondColor[theme]}` },
      '& .formInput:focus': { borderBottom: `2px solid ${thirdColor[theme]}` },
    }} >
      <label className="formLabel">{label}</label>
      <input
        className="formInput"
        type={type}
        placeholder={placeholder}
        required
        onChange={(e) => onInputChange(e.target.value)}
      />
      <Typography variant='inherit' sx={{
        color: `${secondColor[theme]}`,
        fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.9rem' }
      }} >
        {condition}
      </Typography>
      {error && <Typography sx={{
        fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.9rem' },
        color: `${thirdColor[theme]}`,
      }}>Invalid field.</Typography>}
    </Box>
  );
}

export default FormInput;