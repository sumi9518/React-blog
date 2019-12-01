import React from 'react';
import Banner from "../../Banner/Index";
import PropTypes from 'prop-types';


const CreateArticleForm = ({ handleInputChange, Categories }) => {
  return (
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
                <form className="p-30 bg-gray rounded" method="POST" data-form="mailer">
                  <div className="row">
                    <div className="form-group col-md-12 my-5">
                      <input type="file" name="image " onChange={handleInputChange}
                             className="form-control" />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <input className="form-control form-control-lg" type="text" name="title"
                             onChange={handleInputChange} placeholder="Title" />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <select name="channel" onChange={handleInputChange}
                              className="form-control form-control-lg">
                        <option value>Select category</option>
                        {Categories.map(category =>
                          <option key={category.id}
                                  value={category.id}>{category.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                                        <textarea className="form-control form-control-lg" rows={4}
                                                  placeholder="Content" name="Content" onChange={handleInputChange}
                                                  defaultValue={""} />
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

  )
};

CreateArticleForm.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  getArticleCategories: PropTypes.func.isRequired,
};
export default CreateArticleForm;