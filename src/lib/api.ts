const API_URL = 'https://randomuser.me/api/';

export async function callAPI(params: { page: number; results: number }) {
  const url = new URL(API_URL);
  url.searchParams.set('page', params.page.toString());
  url.searchParams.set('results', params.results.toString());

  const response = await fetch(url);

  const data = await response.json();
  return data;
}
