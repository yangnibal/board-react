import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import { Link } from 'react-router-dom';
import Post from '../components/Post';
import axios from 'axios';
import Header from '../components/Header';
import '../scss/Post.scss';

@inject('store')
@observer
class Posts extends React.Component{

    UNSAFE_componentWillMount(){
        localStorage.removeItem("content")
        const { store } = this.props;
		const username = localStorage.getItem("username")
		const password = localStorage.getItem("password")
		if(!username&&!password) return;

		axios.post("http://localhost:8000/users/login/", ({
			username: username,
			password: password
		}))
		.then(response => {
			store.token = response.data['token']
			store.username = username
			store.isLogin = true
            console.log(response)
            store.getPosts()
		})
		.catch(error => {
			console.log(error)
		})
		console.log(localStorage)
		console.log(store.token)
    }

    render() {
        const { store } = this.props;

        
        
        const postlist = store.posts.map(post => (
            <Post
                author={post.author}
                posted_date={post.posted_date}
                content={post.content}
                title={post.title}
                postkey={post.postkey}
                thumbnail={post.thumbnail}
                key={post.postkey}
            />
        ))
        return (
            <div className="posts-container"> 
                <Header/>
                <div className="posts-wrapper">
                    <Link to="/posts/new" className="post-container">
                        <div className="post-wrapper">
                            <div className="post-plus-wrapper">
                                <i className="fas fa-plus"></i>
                                <div className="post-plus">새 글 쓰기</div>
                            </div>
                        </div>
                    </Link>
                    {postlist.reverse()}
                </div>
            </div>
        )
    }
}

export default Posts;