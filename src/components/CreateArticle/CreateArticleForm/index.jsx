import React from 'react';
import PropTypes from 'prop-types';
import Banner from '../../Banner/index';

const CreateArticle = ({ handleInputChange, categories, handleSubmit }) => (
  <div>

    <Banner
      backgroundImage={`url(${process.env.PUBLIC_URL}/assets/img/bg-laptop.jpg)`}
      title="Write an article"
    />

    <main className="main-content">
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-12">
              <form className="p-30 bg-gray rounded" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="form-group col-md-12 my-5">
                    <input
                      type="file"
                      name="image"
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-12 col-md-6">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      name="title"
                      onChange={handleInputChange}
                      placeholder="Title"
                    />
                  </div>
                  <div className="form-group col-12 col-md-6">
                    <select
                      name="channel"
                      onChange={handleInputChange}
                      className="form-control form-control-lg"
                    >
                      <option value>Select category</option>
                      {categories && categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows={4}
                    placeholder="Content"
                    name="Content"
                    onChange={handleInputChange}
                    defaultValue=""
                  />
                </div>
                <div className="text-center">
                  <button className="btn btn-lg btn-primary" type="submit">Create Article</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
);


CreateArticle.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};
export default CreateArticle;
