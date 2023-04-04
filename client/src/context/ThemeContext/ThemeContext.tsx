import { createContext, useState } from 'react';
import { ContextProps } from '../../models';

export const themeContext = createContext({});

const ThemeContext: React.FC<ContextProps> = ({ children }) => {

  const [theme, setTheme] = useState<number>(0);

  const changeTheme: (number: number) => void = (number: number) => {
    setTheme(number)
  }

  const firstColor: {
    0: string;
    1: string;
    2: string;
    3: string;
} = {
    0: '#ffef8b',
    1: '#ffde98',
    2: '#cef79f',
    3: '#93c8d0',
  }

  const secondColor: {
    0: string;
    1: string;
    2: string;
    3: string;
} = {
    0: '#515151',
    1: '#de5138',
    2: '#378e8e',
    3: '#297383',
  }

  const thirdColorOpacity: {
    0: string;
    1: string;
    2: string;
    3: string;
} = {
    0: '#d35f62c4',
    1: '#fe944196',
    2: '#2a513fa6',
    3: '#b7814999',
  }

  const thirdColor: {
    0: string;
    1: string;
    2: string;
    3: string;
} = {
    0: '#d35f62',
    1: '#fe9441',
    2: '#2a513f',
    3: '#b78149',
  }

  const formImg: {
    0: string;
    1: string;
    2: string;
    3: string;
} = {
    0: './pikachuPng.png',
    1: './charmanderPng.png',
    2: './bulbasaurPng.png',
    3: './squirtlePng.png',
  }

  const faceImg: {
    0: string;
    1: string;
    2: string;
    3: string;
} = {
    0: './pikachuFace.png',
    1: './charmanderFace.png',
    2: './bulbasaurFace.png',
    3: './squirtleFace.png',
  }


  return (
    <>
      <themeContext.Provider 
      value={{ 
        changeTheme,
        theme,
        firstColor,
        secondColor,
        thirdColor,
        thirdColorOpacity,
        formImg,
        faceImg
        }}>
        {children}
      </themeContext.Provider>
    </>
  );
}

export default ThemeContext;