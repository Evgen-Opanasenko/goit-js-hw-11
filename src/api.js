import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '?key=25755464-ef89def2b889cc3a3e49dbf0b';
const parametrList = 'image_type=photo&orientation=horizontal&safesearch=true.';
const perPage = 40;

function getPhotoArr(inputValue, pageStart) {
  return axios
    .get(`${API_KEY}&q=${inputValue}&${parametrList}&page=${pageStart}&per_page=${perPage}`)
    .then(res => {
      return res.data;
    }); //   надо-ли???
}

export { getPhotoArr, perPage };
