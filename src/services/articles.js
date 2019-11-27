import Axios from 'axios';
import config from '../config';

export default class ArticleServices {

    async getArticleCategories() { /*step 3 */
        const {Categories} = await Axios.get(`${config.apiUrl}/categories`);
        return Categories; /*step 4 */
    }
}