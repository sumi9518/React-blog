import React from 'react';
import Articles from "./Articles";
import PropTypes from 'prop-types';
class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: {},
    }
  }
  async componentWillMount() {
    const articles = await this.props.getArticles();
    this.setState({articles});
  }

  render() {
    return (
      <Articles
        articles = {this.state.articles.data}
      />
    )
  }
}
Welcome.propTypes = {
  getArticles: PropTypes.func.isRequired,
};
export default Welcome;
