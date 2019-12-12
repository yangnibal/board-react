import React from 'react'
import { inject, observer } from 'mobx-react';
import showdown from 'showdown'
import CommentList from '../components/CommentList';
import NewComment from '../components/NewComment';
import '../scss/PostDetail.scss';

@inject('store')
@observer
class PostDetail extends React.Component{
    UNSAFE_componentWillMount(){
        const { store } = this.props;
        const path = window.location.pathname
        store.getPostDetail(path)
    }

    componentWillUnmount(){
        const { store } = this.props
        store.author = ""
        store.title = ""
        store.date = ""
        store.thumbnail = ""
        store.content = ""
    }

    render() {
        const { store } = this.props;
        const converter = new showdown.Converter();
        const html = converter.makeHtml(store.content)
        return (
            <div className="postdetail-container">
                <div className="postdetail-header">
                    <div className="postdetail-title-wrapper">
                        <div className="postdetail-header-title">
                            My story time
                        </div>
                    </div>
                    <div className="postdetail-user-wrapper">
                        <div className="postdetail-header-user">
                            {store.username}
                        </div>
                    </div>
                </div>
                <div className="postdetail-wrapper">
                    <div className="postdetail-username-wrapper">
                        <div className="postdetail-username">
                            {store.author}
                        </div>
                    </div>
                    <div className="postdetail-title-wrapper">
                        <div className="postdetail-title">
                            {store.title}
                        </div>
                    </div>
                    <div className="postdetail-date-like">
                        <div className="postdetail-date-wrapper">
                            <div className="postdetail-date">
                                {store.posted_date}
                            </div>
                        </div>
                    </div>
                    <div className="sep"></div>
                    {store.thumbnail!=null ?
                    <div className="postdetail-thumbnail-wrapper">
                        <img className="postdetail-thumbnail" src={"http://localhost:8000" + store.thumbnail} alt={store.thumbnail}/>
                    </div>
                    :
                    <div></div>
                    }
                    <div className="postdetail-content-wrapper">
                        <div className="postdetail-content" dangerouslySetInnerHTML={{ __html:html }}/>
                    </div>
                    <NewComment/>
                    <CommentList/>
                </div>
            </div>
        )
    }
}

export default PostDetail