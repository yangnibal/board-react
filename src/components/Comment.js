import React from 'react'

const Comment = ({author, commented_date, content}) => {
    return (
        <div className="comment-container">
            <div className="topbar"/>
            <div className="comment-author">
                {author}
            </div>  
            <div className="comment-date">
                {commented_date}
            </div>
            <div className="comment-content">
                {content}
            </div>
        </div>
    )
}

export default Comment