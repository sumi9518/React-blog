import React from 'react';
import CreateArticleForm from "./CreateArticleForm";

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

    async componentWillMount() {
        const categories = await this.props.getArticleCategories();
        console.log(categories);
    }

    handleInputChange = (event) => {
        console.log(event.target.files);
        this.setState({
            [event.target.name]: event.target.type === 'file' ? event.target.files[0] : event.target.value,

        });
    };

    render() {
        return (<CreateArticleForm
            handleInputChange={this.handleInputChange}
            Categories={this.state.Categories}

        />)
    }
}

export default CreateArticle;

