import { ConfigEnv } from "../../../config";
import { UserInterface } from "../../../models";

export const getPokemonsImg: (item: number) => Promise<string> = async (item: number) => {

  return await fetch(`${ConfigEnv.POKE_API}/${item}`)
  .then( res => res.json())
  .then( data => data.sprites.other.dream_world.front_default)
}

export const updatePokemonScorePost: (newData: UserInterface) => Promise<Response> =  (newData: UserInterface) => {

  return fetch(`${ConfigEnv.API_URL}/api/score/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newData)
  })
}

export const updatePokemonScore: (dataUser: UserInterface, dificulty: string) => {
  easy: number;
  medium: number;
  hard: number;
} = (dataUser: UserInterface, dificulty: string) => {
  let gamesData;
  if (dificulty === 'Easy') {
    gamesData = { ...dataUser.games[0].dificulty, easy: Number(dataUser.games[0].dificulty.easy) + 1 };
  } else if (dificulty === 'Medium') {
    gamesData = { ...dataUser.games[0].dificulty, medium: Number(dataUser.games[0].dificulty.medium) + 1 };
  } else {
    gamesData = { ...dataUser.games[0].dificulty, hard: Number(dataUser.games[0].dificulty.hard) + 1 };
  }
  return gamesData;
}