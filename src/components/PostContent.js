import React from 'react'
import { inject, observer } from 'mobx-react';
import Postmodal from '../components/Postmodal';
import showdown from 'showdown';

const PostContent = ({ isModalOn, handleEditorChange, content }) => {
    const converter = new showdown.Converter();
    const html = converter.makeHtml(content)
    return (
        <div className="postnew-wrapper">
            <div className="postnew-content">
                <textarea placeholder="내용을 입력해주세요..." type="text" className="postnew-content-input" onChange={handleEditorChange} value={content} name="content"/>
            </div>
            <div className="postnew-replybox">
                <div className="postnew-reply" dangerouslySetInnerHTML={{ __html: html }}/>
                {isModalOn==true ? <Postmodal/> : null}
            </div>
        </div>
    )
}

export default inject(({ store }) => ({
    isModalOn: store.isModalOn,
}))(observer(PostContent));