interface UserInterface {
  email: string;
  name: string;
  games: {name: string, dificulty: { easy: number, medium: number, hard: number }}[];
  trophies: number;
}

export default UserInterface;