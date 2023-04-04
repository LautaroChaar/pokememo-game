import { ConfigEnv } from "../../../config";


export const loginPost: (user: { email: string, password: string }) => Promise<Response> = (user: { email: string, password: string }) => {

  return fetch(`${ConfigEnv.API_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
}
    