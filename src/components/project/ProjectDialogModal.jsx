import React, { Component, PropTypes } from 'react'

import _ from 'lodash'
import JarvisWidget from '../layout/widgets/JarvisWidget.jsx'
import UiValidate from '../forms/validation/UiValidate.jsx'
import WidgetGrid from '../layout/widgets/WidgetGrid.jsx'
import BigBreadcrumbs from '../layout/navigation/components/BigBreadcrumbs.jsx'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import Select from 'react-select'
import Dropzone from 'react-dropzone'

let ProjectDialogModal = React.createClass({

    getInitialState: function() {
        return {
            project_name : "",
            project_description : "",
            isViewState : false,
            formClassName : "input",
            projectOptions : [
              {value: 'Project name', label: 'Project1'}
            ]
        };
    },
    componentWillMount: function() {

    },
    handleSubmitForm : function(){

        if(this.props.dialogState == "NEW"){
            console.log("new");
        }else if(this.props.dialogState == "EDIT"){
            console.log("edit");
        }

    },
    handleChange : function(item_name, event){

        switch (event) {
          case 'project_name':

            break;
          case 'project_description' :

            break;
        }
    },
    render: function () {

        var validationOptions = {
            rules: {
                project_name : {
                    required: true
                },
                project_description : {
                    required: true
                }
            },
            messages: {
                project_name : {
                    required: "project_name required"
                },
                project_description : {
                    required: "project_description required"
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
                <div className="modal fade" id="ProjectDialogModal" tabIndex="-1" role="dialog" aria-labelledby="ProjectDialogModal" aria-hidden="true">
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
                                            {(this.props.dialogState == "NEW")?("Create Project") : ("Edit Project")}
                                        </h1>
                                    </header>

                                    <fieldset>
                                        <section>
                                            <label className="label">Project Name</label>
                                            <label className={this.state.formClassName} >
                                                <input type="text" id='project_name' name='project_name'
                                                  value={this.state.project_name}
                                                  onChange={this.handleChange(this, 'project_name')}
                                                  placeholder="Project Name"
                                                  style={input_style}/>
                                                <b className="tooltip tooltip-bottom-right">Enter Project Name</b>
                                            </label>
                                        </section>

                                        <section>
                                            <label className="label">Description</label>
                                            <label className="textarea {this.state.formClassName}" >
                                                <textarea rows="3"  type="text" id='project_description' name='project_description' value={this.state.project_description}
                                                  onChange={this.handleChange(this, 'project_description')}
                                                  placeholder="Description"
                                                  style={input_style}/>
                                                <b className="tooltip tooltip-bottom-right">Enter Project Description</b>
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

export default ProjectDialogModal
