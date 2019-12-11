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
  }

  handlePagination = (url) => {
    const articles = this.props.getArticles(url);
    this.setState({ articles });
  };

  render() {
    return (
      <Articles
        articles={this.state.articles.data}
        nextUrl={this.state.articles.next_page_url}
        prevUrl={this.state.articles.prev_page_url}
        handlePagination={this.handlePagination}
      />
    );
  }
}

Welcome.propTypes = {
  getArticles: PropTypes.func.isRequired,
};

export default Welcome;
