type PokemonContainerProps = {
  pokeball: string[];
  selectCard: number;
  firstUrl: string | null;
  secondUrl: string | null;
  updateFirstUrl: (firstUrl: string | null) => void;
  updateSecondUrl: (secondCard: string | null) => void;
  updateSelectCard: (selectCard: number) => void;
  getFirstCard: (firstCard: HTMLElement) => void;
  firstCard: HTMLElement | null;
  getSecondCard: (secondCard: HTMLElement) => void;
  secondCard: HTMLElement | null;
  updateMatch: (match: number) => void;
}

export default PokemonContainerProps;