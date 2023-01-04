import axios from 'axios';

const KEY = '31223226-3ecae3b2f04fb3bb58e55d840';
const BASE = 'https://pixabay.com/api';

export const fetchGallery = async (query, page) => {
  const url = `${BASE}/?q=cat&page=1&key=${KEY}&q=${query}&page=${page}&per_page=12&image_type=photo&orientation=horizontal`;
  const { data } = await axios.get(url);
  return data;
};

export function queryValues(data) {
  return data.map(({ id, tags, largeImageURL, webformatURL }) => ({
    id,
    tags,
    largeImageURL,
    webformatURL,
  }));
}
