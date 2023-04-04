type GamesFormProps = {
  updateUncoverNumber?: (uncoverNumber: number) => void;
  updateMatch?: (match: number) => void; 
  updateFirstUrl?: (firstUrl: string | null) => void; 
  updateSecondUrl?: (secondCard: string | null) => void;
  updateSelectCard?: (selectCard: number) => void;
}

export default GamesFormProps;