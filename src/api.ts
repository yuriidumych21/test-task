import axios from 'axios';
import { PexelsApiResponse } from './interfaces';
const pexelsApiKey = 'hZokcFuLdbX3U8XmQCGxTlzkgQ94Q00zBhcA8r3Ugn21ZjNIoGcjWZB0';

export const getImages = async (topic: string): Promise<PexelsApiResponse> => {
  const response = await axios.get<PexelsApiResponse>(`https://api.pexels.com/v1/search`, {
    headers: {
      Authorization: pexelsApiKey
    },
    params: { query: topic, per_page: 5 }
  });

  return response.data;
};
