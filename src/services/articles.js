import Axios from 'axios';
import config from '../config';

export default class ArticleServices {

  async getArticleCategories() { /*step 3 */
    const response = await Axios.get(`${config.apiUrl}/categories`);
   // console.log(response);
    return response.data.categories;
  }

   CreateArticle = async (data, token) => { //token can also be get from local but not preferred
     const image = await this.uploadToCloudinary(data.image);
       try{
         const response = await Axios.post(`${config.apiUrl}/articles`, {
           title: data.title,
           content: data.Content,
           category_id: data.category,
           imageUrl: image.secure_url,
       }, {
         headers: {
           Authorization: `Bearer${token}`, //attach token to data to know which user created this data
         },
       });
         console.log(response);
         return response.data;
     }catch(errors) {
    console.log(errors);
    return errors.response.data;
  }
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


