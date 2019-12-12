import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import axios from 'axios'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Posts from './pages/Posts';
import Postnew from './pages/Postnew';
import NoMatch from './pages/NoMatch';
import PostDetail from './pages/PostDetail';

@inject('store')
@observer
class App extends React.Component{
	UNSAFE_componentWillMount(){
		const { store } = this.props;
		const username = localStorage.getItem("username")
		const password = localStorage.getItem("password")
		if(!username&&!password) return;

		const path =  window.location.href.split("/")

		const detailpath = window.location.pathname

		axios.post("http://localhost:8000/users/login/", ({
			username: username,
			password: password
		}))
		.then(response => {
			store.token = response.data['token']
			store.username = username
			store.isLogin = true
			console.log(response)
			
			if (path[1]==null){
				store.getNotices()
			} else if(path[1]=="posts"&&path[2]==null) {
				store.getPosts()
			} else{
				store.getPostDetail(detailpath)
			} 
		})
		.catch(error => {
			console.log(error)
		})
	}
	render(){
		return (
			<div>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route exact path="/account/login" component={Login}/>
					<Route exact path="/account/signup" component={Signup}/>
					<Route exact path="/posts" component={Posts}/>
					<Route exact path="/posts/new" component={Postnew}/>
					<Route exact path="/posts/:postkey" component={PostDetail}/>
					<Route component={NoMatch}/>
				</Switch>
			</div>
		)
	}
}

export default App;
