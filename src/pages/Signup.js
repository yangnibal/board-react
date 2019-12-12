import React from 'react'
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { action, observable } from 'mobx';
import '../scss/Account.scss';

@inject('store')
@observer
class Signup extends React.Component{
    @observable first_name = ""
    @observable last_name = ""
    @observable username = ""
    @observable email = ""
    @observable password = ""
    @action handleSignup = (first_name, last_name, username, email, password) => {
        const { store } = this.props;
        axios.post("http://localhost:8000/users/", ({
            first_name: first_name,
            last_name: last_name,
            username: username,
            email: email,
            password: password  
        }))
        .then(response => {
            store.token = response.data['token']
            store.username = username
            localStorage.setItem({
                "username": username,
                "password": password
            })
            this.first_name = ""
            this.last_name = ""
            this.username = ""
            this.email = ""
            this.password = ""
            this.props.history.push("/")
        })
        .catch(error => {
            console.log(error)
        })
    }
    @action handleChange = (e) => {
        const { name, value } = e.target
        this[name] = value
    }
    render() {
        const { store } = this.props;
        return (
            <div className="signup-container">
                <div className="signup-wrapper">
                    <div className="signup-title">
                        SIGNUP
                    </div>
                    <div className="signup-name">
                        <div className="signup-firstname">
                            <input type="text" className="signup-firstname-input" value={this.first_name} onChange={this.handleChange} name="first_name" placeholder="성"/>
                        </div>
                        <div className="signup-lastname">
                            <input type="text" className="signup-lastname-input" value={this.last_name} onChange={this.handleChange} name="last_name" placeholder="이름"/>
                        </div>
                    </div>
                    <div className="signup-username">
                        <input type="text" className="signup-username-input" value={this.username} onChange={this.handleChange} name="username" placeholder="닉네임"/>
                    </div>
                    <div className="signup-email">
                        <input type="text" className="signup-email-input" value={this.email} onChange={this.handleChange} name="email" placeholder="이메일"/>
                    </div>
                    <div className="signup-password">
                        <input type="password" className="signup-password-input" value={this.password} onChange={this.handleChange} name="password" placeholder="비밀번호"/>
                    </div>
                    <div className="signup-btn">
                        <Link className="signup-signup-btn" onClick={() => this.handleSignup(this.first_name, this.last_name, this.username, this.email, this.password)}>회원가입</Link>
                        <Link className="signup-cancle-btn" to="/">취소</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup