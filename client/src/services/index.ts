import { ConfigEnv } from "../config";

export const dataUserFetch: (user: string | null) => Promise<Response> =  (user: string | null) => {

  return fetch(`${ConfigEnv.API_URL}/api/home/${user}`, {
    method: 'GET',
    headers: {
      'authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
  });
}