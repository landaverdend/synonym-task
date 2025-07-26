import { saveUsers } from './db';
import { User } from './definitions';

const API_URL = 'https://randomuser.me/api/';

type APIResponse = {
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
  results: User[];
};

export async function callAPI(params: { page: number; results: number }) {
  const url = new URL(API_URL);
  url.searchParams.set('page', params.page.toString());
  url.searchParams.set('results', params.results.toString());

  const response = await fetch(url);

  const data = (await response.json()) as APIResponse;
  return data;
}

export async function fetchAndSaveUsers(page: number, results: number) {
  const data = await callAPI({ page, results });
  await saveUsers(data.results);
}
