import React from 'react'
import { observer, inject } from 'mobx-react'
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import Post from '../components/Post';
import '../scss/Home.scss';
import '../scss/Post.scss';

@inject('store')
@observer
class Home extends React.Component{

    render() {  
        const { store } = this.props;
        return (
            <Layout>
                <div className="home-background">
                    <div className="home-name-wrapper">
                        {/*<div className="home-name">WONJUN.</div>
                        <div className="home-subname">full-stack developer.</div>*/}
                    </div>
                    <div className="home-works-wrapper">
                        <div className="home-works">Works</div>
                        <i className="fas fa-arrow-down icon-down"></i>
                    </div>
                </div>
                <div className="home-contents">
                    <div className="contents-blogs">
                        <Link to="/posts" className="contents-blogs-title">Blogs</Link>
                        <div className="home-post-container">
                            <Post
                                author="admin"
                                posted_date="2019-10-12"
                                content=""
                                title="2019 회고"
                                postkey="postkey"
                                thumbnail="http://localhost:8000/media/2019.png"
                                key="postkey"
                            />
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Home;