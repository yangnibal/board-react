import axios from 'axios'
import { observable, action } from 'mobx'

export default class Store {
    @observable username = "";
    @observable noticecount = "0"
    @observable token = ""
    @observable isLogin = false;

    @observable posts = [];
    @observable comments = [];

    @observable content = ""


    @action handleLogout = () => {
        axios.get("http://localhost:8000/users/logout/", {
            headers: {
                Authorization: "Token " + this.token
            }
        })
        .then(response => {
            localStorage.clear()
            this.isLogin = false;
            this.username = ""
        })
        .catch(error => {
            console.log(error)
        })
    }

    @action getPosts = () => {
        axios.get("http://localhost:8000/posts/", {
            headers: {
                Authorization: "Token " + this.token
            }
        })
        .then(response => {
            this.posts = response.data.results
        })
        .catch(error => {
            console.log(error)
        })
    }

    @observable isModalOn = false;
    @action canclePost = () => {

    }

    @action getNotices = () => {
        axios.get("http://localhost:8000/notices/", {
            headers: {
                Authorization: "Token " + this.token
            }
        })
        .then(response => {
            this.noticecount = response.data.length
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }

    @observable thumbnail = ""
    @observable title = ""
    @observable content = ""
    @observable author = ""
    @observable posted_date = ""
    @observable like = ""
    @observable postkey = ""

    @action getPostDetail = (path) => {
        axios.get("http://localhost:8000" + path + "/", {
            headers: {
                Authorization: "Token " + this.token
            }
        })
        .then(response => {
            this.thumbnail = response.data['thumbnail']
            this.title = response.data['title']
            this.content = response.data['content']
            this.author = response.data['author']
            this.posted_date = response.data['posted_date'].split("T")[0]
            this.like = response.data['like']
            this.postkey = response.data['postkey']
            console.log(response)
        })
        .catch(error => {
        })
    }
    

}