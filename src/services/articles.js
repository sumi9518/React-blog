import Axios from 'axios';
import config from '../config';

export default class ArticleServices {
  async getArticleCategories() {
    const categories = await Axios.get(`${config.apiUrl}/categories`);
    return categories;
  }
};