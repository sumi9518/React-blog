import React from 'react';
import PropTypes from 'prop-types';
import Banner from '../../Banner';
import Article from '../../Article';

const Articles = (
  {
    articles, handlePagination, prevUrl, nextUrl,
  },
) => ((
  <div>
    <Banner
      backgroundImage="url(assets/img/bg-gift.jpg)"
      title="Latest Blog Posts"
      subtitle="Read and get updated on how we progress."
    />
    <main className="main-content bg-gray">
      <div className="row">
        <div className="col-12 col-lg-6 offset-lg-3">
          {articles && articles.map((article) => (
            <div key={article.id}>
              <Article article={article} />
              <hr />
            </div>
          ))}
          <nav className="flexbox mt-50 mb-50">
            <button
              type="button"
              className={`btn btn-white ${prevUrl ? '' : 'disabled'}`}
              onClick={() => handlePagination(prevUrl)}
            >
              <i className="ti-arrow-left fs-9 ml-4" />
              Previous Page
            </button>
            <button
              type="button"
              className={`btn btn-white${nextUrl ? '' : 'disabled'}`}
              onClick={() => handlePagination(nextUrl)}
            >
              Next Page
              <i className="ti-arrow-right fs-9 mr-4" />
            </button>
          </nav>
        </div>
      </div>
    </main>
  </div>
));
Articles.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  handlePagination: PropTypes.func.isRequired,
  nextUrl: PropTypes.string.isRequired,
  prevUrl: PropTypes.string.isRequired,
};

export default Articles;
