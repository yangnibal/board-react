import React from 'react'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { action } from 'mobx';
import '../scss/Header.scss';

@inject('store')
@observer
class Header extends React.Component{
    render() {
        const { store } = this.props;
        return (
            <div className="header-container">
                <div className="left-header">
                    <div className="header-username">
                        octolog
                    </div>
                </div>
                <div className="right-header">
                    <div className="notice-count">
                        {store.noticecount}
                    </div>
                    <Link to="/posts" className="link-blog">
                        blog
                    </Link>
                    {store.isLogin==true ? 
                    <Link to="/account/login" className="login-or-logout">
                        {store.username}
                    </Link>
                    :
                    <Link to="/account/login" className="headermodal">
                        <i className="fas fa-user"></i> 
                    </Link>
                    }
                </div>
            </div>
        )
    }
}

export default Header;