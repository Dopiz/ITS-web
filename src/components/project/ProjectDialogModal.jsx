import React, { Component, PropTypes } from 'react'

import _ from 'lodash'
import JarvisWidget from '../layout/widgets/JarvisWidget.jsx'
import UiValidate from '../forms/validation/UiValidate.jsx'
import WidgetGrid from '../layout/widgets/WidgetGrid.jsx'
import BigBreadcrumbs from '../layout/navigation/components/BigBreadcrumbs.jsx'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {HTTPService} from '../../services/index.js'
import Select from 'react-select'
import Dropzone from 'react-dropzone'

export default class ProjectDialogModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            project_id : "",
            project_name : "",
            project_description : "",
            formClassName : "input",
            formTextareaClassName : "textarea"
        };
    }

    componentWillReceiveProps(nextProps){

        switch(nextProps.dialogState){
            case 'NEW' :
                this.setState({
                    project_id : "",
                    project_name : "",
                    project_description : "",
                    formClassName : "none",
                    formTextareaClassName : "none"
                }, function(){
                      this.hideErrorMessage();
                });
            break;
            case 'EDIT' :
                var data = JSON.parse(nextProps.data);
                this.setState({
                    project_id : data.id,
                    project_name : data.project_name,
                    project_description : data.project_description,
                    formClassName : "none",
                    formTextareaClassName : "none"
                }, function(){
                      this.hideErrorMessage();
                });
            break;
        }
    }

    hideErrorMessage(){

        /*隱藏驗證文字跟把顏色框框拿掉*/
        this.setState({
            formClassName : "input",
            formTextareaClassName : "textarea"
        }, function(){
            if(document.getElementById( "project_name-error"))
                document.getElementById( "project_name-error").style.display = "none";
            if(document.getElementById( "project_description-error"))
                document.getElementById( "project_description-error").style.display = "none";
        })
    }

    handleSubmitForm(e) {

        e.preventDefault();

        if(this.state.project_name == "")
            return ;
        else if(this.state.project_description == "")
            return ;

        var body = {
            id : this.state.project_id,
            project_name : this.state.project_name,
            project_description : this.state.project_description
        };

        if(this.props.dialogState == "NEW"){

            HTTPService.post('project/addProject', body, function(res){
                $('#ProjectDialogModal').modal('hide');
                this.props.fetchData();
            }.bind(this));

        }else if(this.props.dialogState == "EDIT"){

            HTTPService.post('project/updateProject', body, function(res){

                $('#ProjectDialogModal').modal('hide');
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

    render(){


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

        var options = [
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' }
        ];

        return (
            <div>
                <div className="modal fade" id="ProjectDialogModal" tabIndex="-1" role="dialog" aria-labelledby="ProjectDialogModal" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content" style={{padding:"10px"}}>
                            <WidgetGrid>
                            <UiValidate options={validationOptions}>
                                <form className="smart-form" noValidate="noValidate" onSubmit={this.handleSubmitForm.bind(this)}>

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
                                                  onChange={this.handleChange.bind(this, 'project_name')}
                                                  placeholder="Project Name"/>
                                                <b className="tooltip tooltip-bottom-right">Enter Project Name</b>
                                            </label>
                                        </section>

                                        <section>
                                            <label className="label">Description</label>
                                            <label className={this.state.formTextareaClassName} >
                                                <textarea rows="3"  type="text" id='project_description' name='project_description' value={this.state.project_description}
                                                  onChange={this.handleChange.bind(this, 'project_description')}
                                                  placeholder="Description"/>
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
}
