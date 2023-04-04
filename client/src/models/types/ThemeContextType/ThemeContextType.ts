type ThemeContextType = {
  theme: number;
  firstColor: {
    [theme: number]: string,
  };
  secondColor: {
    [theme: number]: string,
  };
  thirdColor: {
    [theme: number]: string,
  };
  thirdColorOpacity: {
    [theme: number]: string,
  };
  formImg: {
    [theme: number]: string,
  };
  faceImg: {
    [theme: number]: string,
  };
  changeTheme: (number: number) => void;
};

export default ThemeContextType;