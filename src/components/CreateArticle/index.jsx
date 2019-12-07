import React from 'react';
import CreateArticleForm from './CreateArticleForm';
import PropTypes from 'prop-types';

class CreateArticle extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      image: null,
      Content: '',
      category: null,
      categories: [],
      errors: {}

    };
  }

  // eslint-disable-next-line camelcase
  async componentWillMount() {
    const categories = await this.props.getArticleCategories();
    //console.log(categories);
    this.setState({
      categories,
    });
  }
handleSubmit= async (event)=>{
    event.preventDefault();
    try {
      this.props.CreateArticle(this.state, this.props.token);
      this.props.history.push('/');
    }catch(errors){
      this.setState({
        errors
      })
    }
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
  CreateArticle :PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};
export default CreateArticle;