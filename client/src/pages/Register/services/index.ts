import { ConfigEnv } from "../../../config";

export const registerPost: (user: { name: string, email: string, password: string }) => Promise<Response> = (user: { name: string, email: string, password: string }) => {

  return fetch(`${ConfigEnv.API_URL}/api/register`, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
}
