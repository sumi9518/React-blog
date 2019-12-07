import Axios from 'axios';
import config from '../config';

export default class ArticleServices {

  async getArticleCategories() { /*step 3 */
    const response = await Axios.get(`${config.apiUrl}/categories`);
    return response.data.categories;
  }
}


