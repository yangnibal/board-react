import React from 'react'
import { inject, observer } from 'mobx-react'
import Comment from './Comment';

@inject('store')
@observer
class CommentList extends React.Component{
    UNSAFE_componentWillMount(){
        const { store } = this.props
    }
    render() {
        const { store } = this.props;
        const path = window.location.pathname.split("/")[2]
        const commentlist = store.comments.map(comment => (
            <Comment
                author={comment.author}
                commented_date={comment.commented_date.split("T")[0]}
                content={comment.message}
                key={comment.commentkey}
            />
        )) 
        return (
            <div>
                {commentlist.reverse()}
            </div>
        )
    }
}

export default CommentList