import { requestAwait } from './await';

export const API_HOST =
  process.env.NODE_ENV == 'development'
    ? 'http://localhost:7070'
    : 'https://animalwatch.codingkelvin.fun';

export async function getUserFromDB(openId: string): Promise<any> {
  const result = await requestAwait('GET', `${API_HOST}/api/users/${openId}`);
  return result;
}

export async function getOpenId(code: string): Promise<string> {
  const { data } = (await requestAwait(
    'GET',
    `${API_HOST}/api/jscode2session?js_code=${code}`
  )) as { data: { openid: string; session_key: string } };
  return data.openid;
}
