import axios from 'axios';
const API_KEY = '45093842-7b9ddf19bc3b802955880273e';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImg = async (query, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: false,
        page: page,
        per_page: 20,
      },
    });
    console.log('API RESPONSE', response.data);
    return response.data;
  } catch (error) {
    console.log('erorr', error);
    throw error;
  }
};
