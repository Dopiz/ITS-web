import React, { Component, PropTypes } from 'react'

import _ from 'lodash'
import JarvisWidget from '../layout/widgets/JarvisWidget.jsx'
import UiValidate from '../forms/validation/UiValidate.jsx'
import WidgetGrid from '../layout/widgets/WidgetGrid.jsx'
import BigBreadcrumbs from '../layout/navigation/components/BigBreadcrumbs.jsx'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import Select from 'react-select'
import Dropzone from 'react-dropzone'

let IssueDialogModal = React.createClass({

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

        var options = [
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' }
        ];

        return (
            <div>
                <div className="modal fade" id="IssueDialogModal" tabIndex="-1" role="dialog" aria-labelledby="IssueDialogModal" aria-hidden="true">
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
                                            Create Issue
                                        </h1>
                                    </header>

                                    <fieldset>
                                        <section>
                                            <label className="label">Issue Title</label>
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
                                            <label className="label">Priority</label>
                                            <label className={this.state.formClassName}>
                                                <select name="priority" id='priority' className="form-control"
                                                    value={this.state.priority}
                                                    onChange={this.handleChange(this, 'priority')}
                                                    disabled={this.state.isViewState || (this.props.dialogState === "EDIT")}>
                                                        <option disabled hidden value="">Choose here...</option>
                                                        <option value="Low">Low</option>
                                                        <option value="Medium">Medium</option>
                                                        <option value="High">High</option>
                                                        <option value="Critical">Critical</option>
                                                </select>
                                            </label>
                                        </section>

                                        <section>
                                            <label className="label">Type</label>
                                            <label className={this.state.formClassName}>
                                                <select name="priority" id='priority' className="form-control"
                                                    value={this.state.priority}
                                                    onChange={this.handleChange(this, 'priority')}
                                                    disabled={this.state.isViewState || (this.props.dialogState === "EDIT")}>
                                                        <option disabled hidden value="">Choose here...</option>
                                                        <option value="Bug">Bug</option>
                                                        <option value="Task">Task</option>
                                                        <option value="Feature">Feature</option>
                                                </select>
                                            </label>
                                        </section>

                                        <section>
                                            <label className="label">Developer</label>
                                            <label className={this.state.formClassName}>
                                                <select name="priority" id='priority' className="form-control"
                                                    value={this.state.priority}
                                                    onChange={this.handleChange(this, 'priority')}
                                                    disabled={this.state.isViewState || (this.props.dialogState === "EDIT")}>
                                                        <option disabled hidden value="">Choose here...</option>
                                                        <option value="Dev1">Dev1</option>
                                                        <option value="Dev2">Dev2</option>
                                                        <option value="Dev3">Dev3</option>
                                                        <option value="Dev4">Dev4</option>
                                                </select>
                                            </label>
                                        </section>

                                        <section>
                                            <label className="label">Tester</label>
                                              <label className={this.state.formClassName}>
                                              <select name="priority" id='priority' className="form-control"
                                                  value={this.state.priority}
                                                  onChange={this.handleChange(this, 'priority')}
                                                  disabled={this.state.isViewState || (this.props.dialogState === "EDIT")}>
                                                      <option disabled hidden value="">Choose here...</option>
                                                      <option value="Tester1">Tester1</option>
                                                      <option value="Tester2">Tester2</option>
                                                      <option value="Tester3">Tester3</option>
                                                      <option value="Tester4">Tester4</option>
                                              </select>
                                          </label>
                                        </section>

                                        <section>
                                            <label className="label">Description</label>
                                            <label className="textarea {this.state.formClassName}" >
                                                <textarea rows="3"  type="text" id='application_name' name='application_name' value={this.state.application_name}
                                                  onChange={this.handleChange(this, 'title')}
                                                  placeholder="Description"
                                                  disabled={this.state.isViewState}
                                                  style={input_style}/>
                                                <b className="tooltip tooltip-bottom-right">Enter Issue Title</b>
                                            </label>
                                        </section>

                                        <section>
                                            <label className="label">Due Date</label>
                                              <label className="input state-success"> <i className="icon-append fa fa-calendar"></i>
                          											<input type="text" name="finishdate" id="finishdate" placeholder="Expected finish date" className="hasDatepicker valid"/>
                          										</label>
                                        </section>


                                        <section>
                                            <label className="label">Picture</label>
                                            <Dropzone  ref="dropzone"  multiple={false} >
                                                DropZone
                                            </Dropzone>
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

export default IssueDialogModal
