import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import PostHeader from '../components/PostHeader';
import PostContent from '../components/PostContent';
import axios from 'axios';
import '../scss/Postnew.scss';

@inject('store')
@observer
class Postnew extends React.Component{
    @observable thumbnail = []
    @observable title = ""
    
    @observable content = ""
    
    @action handleChange = (e) => {
        const { name, value } = e.target
        this[name] = value
    }
    @action handleFileChange = (e) => {
        const { name } = e.target
        this[name] = e.target.files[0]
        console.log(e.target.files[0])
    }

    @action handleEditorChange = (e) => {
        const { name, value } = e.target
        this[name] = value
        localStorage.setItem("content", value)
    }

    @action handleModal = () => {
        const { store } = this.props;
        store.isModalOn = !store.isModalOn
    }

    @action handlePost = (title, content, thumbnail) => {
        const { store } = this.props;
        var formData = new FormData()
        formData.append("title", title)
        formData.append("content", content)
        formData.append("thumbnail", thumbnail)
        axios.post("http://localhost:8000/posts/", formData, {
            headers: {
                Authorization: "Token " + store.token
            }
        })
        .then(response => {
            console.log(response)
            this.content = ""
        })
        .catch(error => {
            console.log(error)
        })
    }

    UNSAFE_componentWillMount(){
        if(localStorage.content){
            this.content = localStorage.getItem("content")
        }
    }

    render() {
        return (
            <div className="postnew-container">
                <PostHeader 
                    handleChange={this.handleChange} 
                    title={this.title} 
                    handleFileChange={this.handleFileChange} 
                    content={this.content} 
                    thumbnail={this.thumbnail} 
                    handleModal={this.handleModal}
                    handlePost={this.handlePost}
                />
                <PostContent 
                    handleEditorChange={this.handleEditorChange} 
                    content={this.content}
                />
            </div>
        )
    }
}

export default Postnew;