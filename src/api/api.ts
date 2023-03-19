
import { Repo, ErrorRepo } from '../types';
import axios from 'axios';


export const Api = {
  fetchRepos: async (name: string): Promise<Repo[] | ErrorRepo> => {
    const response = await axios.get<Repo[]>(`https://api.github.com/users/${name}/repos`);
    return response.data;
  },
};

export async function fetchRepos(name: string): Promise<Repo[]> {
  const response = await axios.get(`https://api.github.com/users/${name}/repos`);
  return response.data;
}


export async function getRepos(name: string) {
  try {
    const { data, status } = await axios.get<Repo[] | ErrorRepo>(
      `https://api.github.com/users/${name}/repos`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    console.log(JSON.stringify(data, null, 4));
    console.log('response status is: ', status);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}