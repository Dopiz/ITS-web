import React, { Component, PropTypes } from 'react'

import UiValidate from '../../../components/forms/validation/UiValidate.jsx'
import {HTTPService} from '../../../services/index.js'

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email : "",
            password : ""
        };
    }
    handleSubmitForm(e){

        e.preventDefault();
        if(this.state.email == "")
            return ;
        else if(this.state.password == "")
            return ;

        //HTTPService.post('')



    }
    handleChange(item_name, event) {
        /*根據item_name 更改值*/
        var nextState = {};
        nextState[item_name] = event.target.value;
        this.setState(nextState);
    }
    render() {
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
                                    <UiValidate>
                                    <form onSubmit={this.handleSubmitForm.bind(this)} action="#/issue/AllIssues" id="login-form" className="smart-form client-form">
                                        <header>
                                            Sign In
                                        </header>
                                        <fieldset>
                                            <section>
                                                <label className="label">E-Mail</label>
                                                <label className="input"> <i className="icon-append fa fa-user"/>
                                                    <input type="email" name="email"
                                                        data-smart-validate-input="" data-required=""
                                                        data-email=""
                                                        value = {this.state.email}
                                                        onChange={this.handleChange.bind(this, 'email')}
                                                        data-message-required="Please enter your email address"
                                                        data-message-email="Please enter a VALID email address"/>
                                                    <b className="tooltip tooltip-top-right"><i className="fa fa-user txt-color-teal"/>
                                                        Please enter email address/username</b></label>
                                            </section>
                                            <section>
                                                <label className="label">Password</label>
                                                <label className="input"> <i className="icon-append fa fa-lock"/>
                                                    <input
                                                        type="password" name="password"
                                                        value={this.state.password}
                                                        onChange={this.handleChange.bind(this, 'password')}
                                                        data-smart-validate-input="" data-required="" data-minlength="3" data-maxnlength="20"
                                                        data-message="Please enter your email password"/>
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
