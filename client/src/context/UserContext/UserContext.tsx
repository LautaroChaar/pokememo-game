import { createContext, useState } from 'react';
import { ContextProps, UserInterface } from '../../models';


export const userContext = createContext({});

const isLoggedStorage: boolean = JSON.parse(localStorage.getItem('isLogged') || 'false') || false;

const initialUser = {
  email: '',
  name: '',
  games: [
    {
      name: '',
      dificulty: {
        easy: 0,
        medium: 0,
        hard: 0
      }
    }
  ],
  trophies: 0,
}

const UserContext: React.FC<ContextProps> = ({ children }) => {

  const [isLogged, setIslogged] = useState<boolean>(isLoggedStorage);
  const [dataUser, setDataUser] = useState<UserInterface>(initialUser);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  const validateLoading = (isLoading: boolean): void => {
    setIsLoading(isLoading);
  }

  const getDataUser = (dataUser: UserInterface): void => {
    setDataUser(dataUser);
  }

  const userLoggedIn = (): void => {
    !isLogged && setIslogged(true);
  }

  const userLoggedOut = (): void => {
    setIslogged(false);
  }

  return (
    <>
      <userContext.Provider 
      value={{ 
        isLoading,
        dataUser, 
        validateLoading, 
        getDataUser,
        userLoggedOut, 
        userLoggedIn, 
        isLogged
        }}>
        {children}
      </userContext.Provider>
    </>
  );
}

export default UserContext;