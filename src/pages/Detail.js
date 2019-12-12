import React, { useState } from 'react'
import useStores from '../store/useStores';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import Comment from '../components/Comment';

const Detail = observer(() => {
    const { store } = useStores()
    const [ comment, setComment ] = useState("")


    const path = document.location.href.split('/')

    const commentlist = store.comments.map(comment => {
        if(comment.postkey===path[4]){
            return (<Comment
                message={comment.message}
                author={comment.author}
                key={comment.commentkey}
                commentkey={comment.commentkey}
            />)
        }
    });


    return (
        <div>
            <div>
                제목: {store.title}
            </div>
            <div>
                내용: {store.content}
            </div>
            <div>
                <img src={'http://localhost:8000' + store.thumbnail + '/'} width="20%" alt={store.thumbnail}/>
            </div>
            <div>
                작성자: {store.author}
            </div>
            <div>
                <Link to="/posts" onClick={() => store.deletePost(path[4])}>글 삭제하기</Link>
            </div>
            <div>
                <p>댓글</p>
                {commentlist}
            </div>
            <div>
                <input value={comment} onChange={e => setComment(e.target.value)} type="text" placeholder="댓글" name="comment"/>
                <button onClick={() => store.uploadComment(path[4], comment)}>댓글 달기</button>
            </div>
            <Link to="/posts" onClick={store.getPosts()}>포스트</Link>
            <Link to="/" onClick={store.getNotices}>홈으로</Link>
        </div>
    )
})

export default Detail