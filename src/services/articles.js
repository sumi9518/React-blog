import Axios from 'axios';
import config from '../config';

export default class ArticleServices {

  async getArticleCategories() { /*step 3 */
    const response = await Axios.get(`${config.apiUrl}/categories`);
   // console.log(response);
    return response.data.categories;
  }

   CreateArticle = async (data) =>{
    await this.uploadToCloudinary(data.image);
  }
  async uploadToCloudinary(image){
    const form = new FormData();
    form.append('file',image);
    form.append('upload_preset','blogImage');
    const response = await Axios.post('https://api.cloudinary.com/v1_1/sumiy/image/upload',form);
    console.log(response);
    return response.data;
  }
}


