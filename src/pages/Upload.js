import React, { useState } from 'react'
import useStores from '../store/useStores';
import useFormInput from '../utils/utils';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

const Upload = observer(() => {
    const { store } = useStores()
    const title = useFormInput()
    const content = useFormInput()
    const [ file, setFile ] = useState(null)
    return (
        <div>
            <div>
                <input {...title} type="text" placeholder="제목"/>
            </div>
            <div>
                <input {...content} type="text" placeholder="내용"/>
            </div>
            <div>
                <input type="file" placeholder="파일 업로드" onChange={(e) => setFile(e.target.files[0])}/>
            </div>
            <button type="submit" onClick={() => store.handleUpload(title.value, content.value, file)}>업로드</button>
            <div>
                <Link to="/">홈으로</Link>
            </div>
        </div>
    )
})

export default Upload