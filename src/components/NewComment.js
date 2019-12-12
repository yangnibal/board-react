import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import axios from 'axios';

@inject('store')
@observer
class NewComment extends React.Component{
    @observable comment = ""
    @action handleChange = (e) => {
        const { name, value } = e.target
        this[name] = value
    }
    @action handlePostComment = () => {
        const { store } = this.props;
        axios.post("http://localhost:8000/comments/", ({
            message: this.comment
        }), {
            headers: {
                Authorization: "Token " + store.token
            }
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }
    render() {
        const { store } = this.props;
        return (
            <div className="newcomment-container">
                <div className="newcomment-wrapper">
                    <div className="newcomment-num">
                        {store.commentcount}개의 댓글
                    </div>
                    <div className="newcomment-input">
                        <input className="newcomment" value={this.comment} onChange={this.handleChange} type="text" name="comment"/>
                    </div>
                    <div className="newcomment-btn-wrapper">
                        <div className="newcomment-btn" onClick={() => this.handlePostComment()}>댓글 작성</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewComment