import axios from 'axios';
import { API_KEY, PER_PAGE } from 'consts';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getPhotos = async (query, page) => {
  const { data } = await axios(
    `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
  );
  console.log('data: ', data);
  return data;
};
