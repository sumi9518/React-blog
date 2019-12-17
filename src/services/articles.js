import Axios from 'axios';
import config from '../config';
import { validateAll } from "indicative/validator";

export default class ArticleServices {

  async getArticles(url = `${config.apiUrl}/articles`) {
    const response = await Axios.get(url);

    return response.data.data;
  }

  async getArticle(slug) {
    const response = await Axios.get(`${config.apiUrl}/article/${slug}`);
    return response.data.data;
  }

  async getUserArticles(token, url = `${config.apiUrl}/user/articles`) {
    const response = await Axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  }

  async getArticleCategories() { /*step 3 */
    const categories = JSON.parse(localStorage.getItem('categories')); //optimising by storing categories in local storage
    if (categories) {
      return categories;
    }
    const response = await Axios.get(`${config.apiUrl}/categories`);
    localStorage.setItem('categories', JSON.stringify(response.data.categories));
    return response.data.categories;
  }

  CreateArticle = async (data, token) => { //token can also be get from local but not preferred
    if (!data.image) {
      return Promise.reject([{
        message: 'The image is required.',
      }])
    }
    try {
      const rules = {
        title: 'required',
        content: 'required',
        category: 'required',
      };
      const messages = {
        required: 'This {{field}} is required.',
      };
      await validateAll(data, rules, messages);

      const image = await this.uploadToCloudinary(data.image);
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
    } catch (errors) {
      if (errors.response) {
        return Promise.reject(errors.response.data);
      }
      return Promise.reject(errors);

    }
  }

  async uploadToCloudinary(image) {
    const form = new FormData();
    form.append('file', image);
    form.append('upload_preset', 'blogImage');
    const response = await Axios.post('https://api.cloudinary.com/v1_1/sumiy/image/upload', form);
    console.log(response);
    return response.data;
  }
}


