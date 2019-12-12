import React from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react';
import showdown from 'showdown'
import '../scss/Post.scss'

const Post = ({author, thumbnail, content, title, postkey, posted_date, getPostDetail}) => {
    var posted_date = posted_date.split("T")
    var postdate = posted_date[0]
    const converter = new showdown.Converter();
    var html = converter.makeHtml(content)
    return (
        <div className="post-container">
            <div className="post-wrapper">
                {thumbnail!=null ?
                <div className="post-img-wrapper">
                    <img className="post-img" src={thumbnail} alt={thumbnail}/>
                </div>
                :
                null
                }
                <div className="post-author-wrapper">
                    <Link to={`/users/${author}`} className="post-author">{author}</Link>
                </div>
                <div className="post-title-wrapper">
                    <Link to={`/posts/${postkey}`} className="post-title" onClick={() => getPostDetail(postkey)}>{title}</Link>
                </div>
                <div className="post-date-wrapper">
                    <div className="post-date">{postdate}</div>
                </div>
                <div className="post-content-wrapper">
                    <div className="post-content" dangerouslySetInnerHTML={{ __html: html }} />
                </div>
            </div>
        </div>
    )
}

export default inject(({ store }) => ({
    getPostDetail: store.getPostDetail
}))(observer(Post));