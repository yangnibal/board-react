import React from 'react'
import { inject, observer } from 'mobx-react';
import showdown from 'showdown'
import { Link } from 'react-router-dom';

const PostHeader = ({ isModalOn, canclePost, handleChange, title, handleFileChange, content, thumbnail, handleModal, handlePost }) => {
    const converter = new showdown.Converter();
    const html = converter.makeHtml(content)
    return (
        <div className="postnew-header">
            <Link to="/posts" onClick={canclePost} className="postnew-backicon"><i className="fas fa-arrow-left back"></i></Link>
            <div className="postnew-title">
                <input placeholder="제목을 입력해주세요" type="text" className="postnew-title-input" onChange={handleChange} value={title} name="title"/>
            </div>
            <div className="postnew-right">
                <div className="postnew-thumbnail">
                    <label className="postnew-thumbnail-label" htmlFor="file">업로드</label>
                    <input type="file" id="file" className="postnew-thumbnail-input" onChange={handleFileChange} name="thumbnail"/>
                </div>
                <div className="postnew-save">
                    <Link className="postnew-save-btn" to="/posts" onClick={() => handlePost(title, html, thumbnail)}>저장하기</Link>
                </div>
                {isModalOn==false ?
                <i className="fas fa-ellipsis-v postnew-layout-menu" onClick={handleModal}></i>
                :
                <i className="fas fa-times postnew-layout-menu" onClick={handleModal}></i>
                }
            </div>
        </div>
    )
}

export default inject(({ store }) => ({
    isModalOn: store.isModalOn,
    canclePost: store.canclePost
}))(observer(PostHeader));