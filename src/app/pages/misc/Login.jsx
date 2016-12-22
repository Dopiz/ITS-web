import React, { Component, PropTypes } from 'react'

import UiValidate from '../../../components/forms/validation/UiValidate.jsx'
import {HTTPService} from '../../../services/index.js'

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email : "",
            password : "",
            formClassName : "input"
        };
    }
    componentWillReceiveProps(nextProps){

      this.setState({
          email : "",
          password : "",
          formClassName : "none"
      }, function(){
            this.hideErrorMessage();
      });
    }
    hideErrorMessage(){

        /*隱藏驗證文字跟把顏色框框拿掉*/
        this.setState({
            formClassName : "input"
        }, function(){
            if(document.getElementById( "email-error"))
                document.getElementById( "email-error").style.display = "none";
            if(document.getElementById( "password-error"))
                document.getElementById( "password-error").style.display = "none";
        })
    }
    handleSubmitForm(e){

        e.preventDefault();
        if(this.state.email == "")
            return ;
        else if(this.state.password == "")
            return ;

        var body = {
            email : this.state.email,
            password : this.state.password
        }

        HTTPService.post('user/login', body, function(res){
            window.localStorage.setItem("title", res.results[0]["title"]);
            window.localStorage.setItem("name", res.results[0]["name"]);

            if(res.results[0]["title"] == "Admin"){

                HTTPService.get('project/getProjects', function(res){

                    var projectOptions = [];

                    for(var i = 0 ; i < res.data.length ; i++){
                        var temp = {
                            value : res.data[i].id,
                            label : res.data[i].project_name
                        }
                        projectOptions.push(temp);
                    }

                    window.localStorage.setItem("project", JSON.stringify(projectOptions));


                }.bind(this));

            }else
                window.localStorage.setItem("project", res.results[0]["project"]);

            this.props.history.push('/issue/AllIssues');
        }.bind(this));

    }
    handleChange(item_name, event) {
        /*根據item_name 更改值*/
        var nextState = {};
        nextState[item_name] = event.target.value;
        this.setState(nextState);
    }
    render() {

        var validationOptions = {
            rules: {
                email : {
                    required: true
                },
                password : {
                    required: true
                }
            },
            messages: {
                email : {
                    required: "email required"
                },
                password : {
                    required: "password required"
                }
            }
        };

        return (
            <div id="extr-page" >
                <header id="header" className="animated fadeInDown">

                    <div id="logo-group">
                        <span id="logo"> <img src="styles/img/ITS_logo_black.png" style={{width:"100%"}} alt="SmartAdmin"/> </span>
                    </div>

                </header>
                <div id="main" role="main" className="animated fadeInDown">

                    <div id="content" className="container">
                        <div className="row">

                            <div className="col-md-offset-4 col-md-4">
                                <div className="well no-padding">
                                    <UiValidate options={validationOptions}>
                                    <form onSubmit={this.handleSubmitForm.bind(this)} action="#/issue/AllIssues" id="login-form" className="smart-form client-form">
                                        <header>
                                            Sign In
                                        </header>
                                        <fieldset>
                                            <section>
                                                <label className="label">E-Mail</label>
                                                <label className={this.state.formClassName}> <i className="icon-append fa fa-user"/>
                                                    <input  name="email"
                                                        value = {this.state.email}
                                                        onChange={this.handleChange.bind(this, 'email')}/>
                                                    <b className="tooltip tooltip-top-right"><i className="fa fa-user txt-color-teal"/>
                                                        Please enter email address/username</b></label>
                                            </section>
                                            <section>
                                                <label className="label">Password</label>
                                                <label className={this.state.formClassName}> <i className="icon-append fa fa-lock"/>
                                                    <input
                                                        type="password" name="password"
                                                        value={this.state.password}
                                                        onChange={this.handleChange.bind(this, 'password')}/>
                                                    <b className="tooltip tooltip-top-right"><i className="fa fa-lock txt-color-teal"/> Enter
                                                        your password</b> </label>
                                            </section>
                                            <section>
                                                <label className="checkbox">
                                                    <input type="checkbox" name="remember" defaultChecked={true}/>
                                                    <i/>Stay signed in</label>
                                            </section>
                                        </fieldset>
                                        <footer>
                                            <button type="submit" className="btn btn-primary">
                                                Sign in
                                            </button>
                                        </footer>
                                    </form></UiValidate>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
