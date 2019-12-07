import React from 'react';
import CreateArticleForm from './CreateArticleForm';
import PropTypes from 'prop-types';

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
  async componentWillMount() {
    const categories = await this.props.getArticleCategories();
    this.setState({
      categories,
    });
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
        Categories={this.state.categories}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}
CreateArticle.propTypes = {
  getArticleCategories: PropTypes.func.isRequired,
  createArticle: PropTypes.func.isRequired,
};
export default CreateArticle;