type PokemonGameProps = {
  pokeball: string[];
  selectCard: number;
  updateFirstUrl: (firstUrl: string | null) => void;
  updateSecondUrl: (secondCard: string | null) => void;
  updateSelectCard: (selectCard: number) => void;
  getFirstCard: (firstCard: HTMLElement) => void;
  getSecondCard: (secondCard: HTMLElement) => void;
}

export default PokemonGameProps;