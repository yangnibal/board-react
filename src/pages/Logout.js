import { observer } from "mobx-react";
import useStores from '../store/useStores';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Logout = observer(() => {
    const { store } = useStores()
    useEffect(() => {
       store.handleLogout()
    }, [])
    return (
        <div>
            <p>성공적으로 로그아웃 되었습니다.</p>
            <Link to="/">홈으로</Link>
        </div>
    )
})

export default Logout