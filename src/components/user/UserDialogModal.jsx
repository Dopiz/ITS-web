import React, {Component, PropTypes} from 'react'

import _ from 'lodash'
import JarvisWidget from '../layout/widgets/JarvisWidget.jsx'
import UiValidate from '../forms/validation/UiValidate.jsx'
import WidgetGrid from '../layout/widgets/WidgetGrid.jsx'
import BigBreadcrumbs from '../layout/navigation/components/BigBreadcrumbs.jsx'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import Select from 'react-select'
import Dropzone from 'react-dropzone'
import {HTTPService} from '../../services/index.js'

export default class UserDialogModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user_id: "",
            user_name: "",
            user_email: "",
            user_title: "",
            user_phone: "",
            user_project: "",
            user_password: "",
            formClassName: "input",
            formTextareaClassName: "textarea",
            projectOptions: []
        };
    }

    componentWillReceiveProps(nextProps) {

        switch (nextProps.dialogState) {
            case 'NEW':
                this.setState({
                    user_id: "",
                    user_name: "",
                    user_email: "",
                    user_title: "",
                    user_phone: "",
                    user_project: "",
                    user_password: "",
                    formClassName: "none",
                    formTextareaClassName: "none"
                }, function() {
                    this.hideErrorMessage();
                });
                break;
            case 'EDIT':
                var data = JSON.parse(nextProps.data);
                console.log();
                this.setState({
                    user_id: data.id,
                    user_name: data.name,
                    user_email: data.email,
                    user_title: data.title,
                    user_phone: data.phone,
                    user_project: data.project,
                    user_password: data.password,
                    formClassName: "none",
                    formTextareaClassName: "none"
                }, function() {
                    this.hideErrorMessage();
                });
                break;
        }
    }

    hideErrorMessage() {

        /*隱藏驗證文字跟把顏色框框拿掉*/
        this.setState({
            formClassName: "input",
            formTextareaClassName: "textarea"
        }, function() {
            // if(document.getElementById( "user_name-error"))
            //     document.getElementById( "user_name-error").style.display = "none";
            // if(document.getElementById( "user_description-error"))
            //     document.getElementById( "user_description-error").style.display = "none";
        })
    }

    handleSubmitForm(e) {

        e.preventDefault();

        // if(this.state.user_name == "")
        //     return ;
        // else if(this.state.user_description == "")
        //     return ;

        var body = {
            id: this.state.user_id,
            user_name: this.state.user_name,
            user_description: this.state.user_description
        };

        if (this.props.dialogState == "NEW") {

            HTTPService.post('user/addUser', body, function(res) {
                this.props.fetchData();
            }.bind(this));

        } else if (this.props.dialogState == "EDIT") {
            console.log(body);
            HTTPService.post('user/updateUser', body, function(res) {
                $('#UserDialogModal').modal('hide');
                this.props.fetchData();
            }.bind(this));
        }

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
                user_name: {
                    required: true
                },
                user_description: {
                    required: true
                }
            },
            messages: {
                user_name: {
                    required: "user_name required"
                },
                user_description: {
                    required: "user_description required"
                }
            }
        };

        return (
            <div>
                <div className="modal fade" id="UserDialogModal" tabIndex="-1" role="dialog" aria-labelledby="UserDialogModal" aria-hidden="true">
                    <div className="modal-dialog" style={{
                        width: "50%"
                    }}>
                        <div className="modal-content" style={{
                            padding: "10px"
                        }}>
                            <WidgetGrid>
                                <UiValidate options={validationOptions}>
                                    <form className="smart-form" noValidate="noValidate" onSubmit={this.handleSubmitForm.bind(this)}>

                                        <header>
                                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                                                &times;
                                            </button>
                                            <h1 className="modal-title" id="myModalLabel">
                                                {(this.props.dialogState == "NEW") ? ("Create User") : ("Edit User")}
                                            </h1>
                                        </header>

                                        <fieldset>
                                            <section>
                                                <label className="label">User Name</label>
                                                <label className={this.state.formClassName}>
                                                    <input type="text" id='user_name' name='user_name' value={this.state.user_name} onChange={this.handleChange.bind(this, 'user_name')} placeholder="user_name"/>
                                                    <b className="tooltip tooltip-bottom-right">Enter User Name</b>
                                                </label>
                                            </section>

                                            <section>
                                                <label className="label">E-Mail</label>
                                                <label className={this.state.formClassName}>
                                                    <input type="text" id='user_email' name='user_email' value={this.state.user_email} onChange={this.handleChange.bind(this, 'user_email')} placeholder="user_email"/>
                                                    <b className="tooltip tooltip-bottom-right">Enter User E-Mail</b>
                                                </label>
                                            </section>

                                            <section>
                                                <label className="label">Password</label>
                                                <label className={this.state.formClassName}>
                                                    <input type="password" id='user_password' name='user_password' value={this.state.user_password} onChange={this.handleChange.bind(this, 'user_password')} placeholder="user_password"/>
                                                    <b className="tooltip tooltip-bottom-right">Enter User Password</b>
                                                </label>
                                            </section>

                                            <section>
                                                <label className="label">Phone Number</label>
                                                <label className={this.state.formClassName}>
                                                    <input type="text" id='user_phone' name='user_phone' value={this.state.user_phone} onChange={this.handleChange.bind(this, 'user_phone')} placeholder="user_phone"/>
                                                    <b className="tooltip tooltip-bottom-right">Enter User Phone Number</b>
                                                </label>
                                            </section>

                                            <section>
                                                <label className="label">Project</label>
                                                <label className={this.state.formClassName}>
                                                    <select name="project" id='project' className="form-control" value={this.state.project}>
                                                        <option disabled hidden value="">Choose here...</option>
                                                        {this.state.projectOptions.map((item, index) => (
                                                            <option value={item.value} key={index}>{item.label}</option>
                                                        ))}
                                                    </select>
                                                </label>
                                            </section>

                                        </fieldset>

                                        <section>
                                            <footer style={{
                                                background: "#ffffff"
                                            }}>
                                                <div className="form-group pull-right">
                                                    <button type="button" className="btn btn-default " data-dismiss="modal">
                                                        Cancel
                                                    </button>
                                                    <button type="submit" className="btn btn-success">
                                                        Save
                                                    </button>
                                                </div>
                                            </footer>
                                        </section>

                                    </form>
                                </UiValidate>
                            </WidgetGrid>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
