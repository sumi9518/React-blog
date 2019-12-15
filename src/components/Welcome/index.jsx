import React from 'react';
import Articles from './Articles';
import PropTypes from 'prop-types';

class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {
      articles: {},
    };
  }

  async componentWillMount() {
    const articles = await this.props.getArticles();
    this.setState({ articles });
    this.props.setArticles(articles.data);
  }

  handlePagination = async (url) => {
    const articles = await this.props.getArticles(url);
    this.setState({ articles });
    this.props.setArticles(articles.data);

  }

  render() {
    return (
      <Articles
        articles={this.state.articles.data}
        nextUrl={this.state.articles.next_page_url}
        prevUrl={this.state.articles.prev_page_url}
        handlePagination={this.handlePagination}
      />
    )
  }
}

Welcome.propTypes = {
  getArticles: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
export default Welcome;
