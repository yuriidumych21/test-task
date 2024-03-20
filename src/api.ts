import axios from 'axios';
import { PexelsApiResponse } from './interfaces';

export const getImages = async (topic: string): Promise<PexelsApiResponse> => {
  const response = await axios.get<PexelsApiResponse>(`https://api.pexels.com/v1/search`, {
    headers: {
      Authorization: process.env.REACT_APP_PEXELS_API_KEY
    },
    params: { query: topic, per_page: 5 }
  });

  return response.data;
};
