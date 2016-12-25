import React from 'react'
import UserStore from '../stores/UserStore'
import ToggleShortcut from './ToggleShortcut.jsx'


let LoginInfo = React.createClass({
    getInitialState: function () {
        return {
            username : (window.localStorage.getItem("name"))?(window.localStorage.getItem("name")):("Username"),
            avatar : ""
        }
    },
    // componentWillMount: function () {
		// UserStore.listen(function (data) {
    //         this.setState(data)
    //     }.bind(this))
    // },
    componentWillReceiveProps : function(nextProps){

        this.setState({
            username : nextProps.username,
            avatar : nextProps.avatar
        }, function(){

        });
    },
  	render: function(){
  		return (

  			<div className="login-info">
  			    <span>
  			        <ToggleShortcut>
  			            <img src="styles/img/avatars/4.png" alt="me"
  							 className="online" /><span>{ this.state.username + " - " +  window.localStorage.getItem("title")}</span><i/>
  			        </ToggleShortcut>
  			     </span>
  			</div>
  		)
  	}
  });

export default LoginInfo
