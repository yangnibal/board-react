import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../scss/Account.scss';

@inject('store')
@observer
class Login extends React.Component{
    @observable username = ""
    @observable password = ""
    @action handleChange = (e) => {
        const { name, value } = e.target
        this[name] = value;
    }
    @action handleLogin = (username, password) => {
        const { store } = this.props;
        axios.post("http://localhost:8000/users/login/", ({
            username: username,
            password: password
        }))
        .then(response => {
            store.isLogin = true;
            store.token = response.data['token']
            store.username = username
            localStorage.setItem("username", username)
            localStorage.setItem("password", password)
            this.username = ""
            this.password = ""
            this.props.history.push("/")
        })
        .catch(error => {
            alert("login failed");
            console.log(error)
            this.username = ""
            this.password = ""
            console.log(localStorage)
        })
    }

    componentWillMount(){
        const { store } = this.props
        store.handleLogout();
    }

    render() {
        return (
            <div className="login-container">
                <div className="login-right-wrapper">
                    <div className="login-right-title">
                        
                    </div>
                </div>
                <div className="login-left-wrapper">
                    <div className="login-left-title">
                        Octolog
                    </div>
                    <div className="login-content-wrapper">
                        <div className="login-username">
                            <input type="text" className="login-username-input" value={this.username} onChange={this.handleChange} name="username" placeholder="사용자 이름을 입력해주세요."/>
                        </div>
                        <div className="login-password">
                            <input type="password" className="login-password-input" value={this.password} onChange={this.handleChange} name="password" placeholder="비밀번호를 입력해주세요."/>
                        </div>
                        <div className="login-btn">
                            <div className="login-login-btn" onClick={() => this.handleLogin(this.username, this.password)}>로그인</div>
                            <Link className="login-signup-btn" to="/account/signup">회원가입</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login