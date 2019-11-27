import Axios from 'axios';
import config from '../config';

export default class ArticleServices {

    async getArticleCategories() { /*step 3 */
        alert(`${config.apiUrl}/categories`);
        const {categories} = await Axios.get(`${config.apiUrl}/categories`);
        console.log(categories);
        return categories; /*step 4 */
    }
}