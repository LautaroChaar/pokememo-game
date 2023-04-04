import { UserInterface } from "../../interfaces";

type UserContextType = {
  isLogged: boolean;
  dataUser: UserInterface;
  isLoading: boolean;
  validateLoading: (isLoading: boolean) => void;
  getDataUser: (dataUser: UserInterface) => void;
  userLoggedIn: () => void;
  userLoggedOut: () => void;
};

export default UserContextType;