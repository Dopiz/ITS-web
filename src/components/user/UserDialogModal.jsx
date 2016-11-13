import React, { Component, PropTypes } from 'react'

import _ from 'lodash'
import JarvisWidget from '../layout/widgets/JarvisWidget.jsx'
import UiValidate from '../forms/validation/UiValidate.jsx'
import WidgetGrid from '../layout/widgets/WidgetGrid.jsx'
import BigBreadcrumbs from '../layout/navigation/components/BigBreadcrumbs.jsx'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import Select from 'react-select'
import Dropzone from 'react-dropzone'

let UserDialogModal = React.createClass({

    getInitialState: function() {
        return {
            title : "",
            isViewState : false,
            formClassName : "input",
            projectOptions : [
              {value: 'Project1', label: 'Project1'},
              {value: 'Project2', label: 'Project2'},
              {value: 'Project3', label: 'Project3'}
            ]
        };
    },
    componentWillMount: function() {

    },
    handleSubmitForm : function(){

    },
    handleChange : function(item_name, event){

    },
    render: function () {

        var validationOptions = {
            rules: {
                title : {
                    required: true
                }
            },
            messages: {
                title: {
                    required: 'title required'
                }
            }
        };

        var input_style = {
            backgroundColor:(this.state.isViewState)?("#f9f9f9") : ("")
        }

        return (
            <div>
                <div className="modal fade" id="UserDialogModal" tabIndex="-1" role="dialog" aria-labelledby="UserDialogModal" aria-hidden="true">
                    <div className="modal-dialog" style={{width:"50%"}}>
                        <div className="modal-content" style={{padding:"10px"}}>
                            <WidgetGrid>
                                <UiValidate options={validationOptions}>
                                <form className="smart-form" noValidate="noValidate" onSubmit={this.handleSubmitForm()}>

                                    <header>
                                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                                            &times;
                                        </button>
                                        <h1 className="modal-title" id="myModalLabel">
                                            Create User
                                        </h1>
                                    </header>

                                    <fieldset>
                                        <section>
                                            <label className="label">Name</label>
                                            <label className={this.state.formClassName} >
                                                <input type="text" id='title' name='title'
                                                  value={this.state.title}
                                                  onChange={this.handleChange(this, 'title')}
                                                  placeholder="Issue Title"
                                                  disabled={this.state.isViewState}
                                                  style={input_style}/>
                                                <b className="tooltip tooltip-bottom-right">Enter Issue Title</b>
                                            </label>
                                        </section>

                                        <section>
                                            <label className="label">Project</label>
                                            <label className={this.state.formClassName}>
                                                <select name="priority" id='priority' className="form-control"
                                                    value={this.state.priority}
                                                    onChange={this.handleChange(this, 'priority')}
                                                    disabled={this.state.isViewState || (this.props.dialogState === "EDIT")}>
                                                        <option disabled hidden value="">Choose here...</option>
                                                        <option value="Project1">Project1</option>
                                                        <option value="Project2">Project2</option>
                                                        <option value="Project3">Project3</option>
                                                        <option value="Project4">Project4</option>
                                                </select>
                                            </label>
                                        </section>

                                        <section>
                                            <label className="label">Title</label>
                                            <label className={this.state.formClassName}>
                                                <select name="title" id='title' className="form-control"
                                                    value={this.state.priority}
                                                    onChange={this.handleChange(this, 'priority')}
                                                    disabled={this.state.isViewState || (this.props.dialogState === "EDIT")}>
                                                        <option disabled hidden value="">Choose here...</option>
                                                        <option value="PM">PM</option>
                                                        <option value="Developer">Developer</option>
                                                        <option value="QA">QA</option>
                                                        <option value="General ">General</option>
                                                </select>
                                            </label>
                                        </section>

                                        <section>
                                            <label className="label">Phone Number</label>
                                            <label className={this.state.formClassName} >
                                                <input type="text" id='title' name='title'
                                                  value={this.state.title}
                                                  onChange={this.handleChange(this, 'title')}
                                                  placeholder="Phone Number"
                                                  disabled={this.state.isViewState}
                                                  style={input_style}/>
                                                <b className="tooltip tooltip-bottom-right">Enter Phone Number</b>
                                            </label>
                                        </section>

                                        <section>
                                            <label className="label">Email</label>
                                            <label className={this.state.formClassName} >
                                                <input type="text" id='email' name='email'
                                                  value={this.state.title}
                                                  onChange={this.handleChange(this, 'title')}
                                                  placeholder="Email"
                                                  disabled={this.state.isViewState}
                                                  style={input_style}/>
                                                <b className="tooltip tooltip-bottom-right">Enter Email</b>
                                            </label>
                                        </section>

                                    </fieldset>

                                    <section>
                                        <footer style={{background:"#ffffff"}}>
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
});

export default UserDialogModal
