import React from 'react';
import Banner from '../Banner/Index';
import CreateArticleForm from './CreateArticleForm';

class CreateArticle extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      image: null,
      content: '',
      channel: null,
      errors: {}

    };
  }

  // eslint-disable-next-line camelcase
  async UNSAFE_componentWillMount() {
    const categories = await this.props.getArticleCategories();
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.type === 'file' ? event.target.files[0] : event.target.value,

    });
  };

  render() {
    return (
      <CreateArticleForm
        handleInputChange={this.handleInputChange}
        categories={this.state.categories}
      />
    );
  }
}

export default CreateArticle;