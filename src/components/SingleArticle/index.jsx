import React from 'react'
import PropTypes from "prop-types";
import SingleArticle from "./Article";

class SingleArticleContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      article: null,
      loading: true,
    }
  }

  async componentWillMount() {
    let article = this.props.articles.find(article => article.slug === this.props.match.params.slug);
    if (article) {
      this.setState({ article, loading: false });
    } else {
      const article = await this.props.getArticle(this.props.match.params.slug);
      this.setState({ article, loading: false });
    }
  }

  render() {
    return (
      <div>
        {
          !this.state.loading &&
          <SingleArticle
            article={this.state.article}
          /> //received data as props and stored in state
        }
        {
          this.state.loading &&
          <p className="text-center">Loading...</p>
        }
      </div>
    );
  }
}

SingleArticleContainer.propTypes = {
  getArticles: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default SingleArticleContainer;