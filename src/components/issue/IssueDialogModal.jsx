import React, {Component, PropTypes} from 'react'

import _ from 'lodash'
import JarvisWidget from '../layout/widgets/JarvisWidget.jsx'
import UiValidate from '../forms/validation/UiValidate.jsx'
import WidgetGrid from '../layout/widgets/WidgetGrid.jsx'
import BigBreadcrumbs from '../layout/navigation/components/BigBreadcrumbs.jsx'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import Select from 'react-select'
import Dropzone from 'react-dropzone'
import Superagent from 'superagent';
import {HTTPService} from '../../services/index.js'

export default class IssueDialogModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isViewState: false,
            formClassName: "input",
            formTextareaClassName : "textarea",
            id : "",
            title: "",
            priority: "",
            type: "",
            project : "",
            developer : "",
            tester : "",
            description : "",
            dueDate : "",
            imageURL : "",
            projectOptions : JSON.parse(window.localStorage.getItem('project')),
            devOptions: [],
            testerOptions: [],
            priorityOptions : [{"label" : "Low", "value" : "Low"}, {"label" : "Medium", "value" : "Medium"}, {"label" : "High", "value" : "High"}, {"label" : "Critical", "value" : "Critical"}],
            typeOptions : [{"label" : "Bug", "value" : "Bug"}, {"label" : "Task", "value" : "Task"}, {"label" : "Feature", "value" : "Feature"}]
        };

    }
    componentWillReceiveProps(nextProps) {

        switch(nextProps.dialogState){
            case 'NEW' :
                this.setState({
                    isViewState : false,
                    id : "",
                    title : "",
                    priority : "",
                    type : "",
                    project : "",
                    developer : "",
                    tester : "",
                    description : "",
                    dueDate : "",
                    imageURL : "",
                    formClassName : "none",
                    formTextareaClassName : "none"
                }, function(){
                      this.hideErrorMessage();
                });
            break;
            case 'EDIT' :
                var data = JSON.parse(nextProps.data);
                this.setState({
                    isViewState : false,
                    id : data.id,
                    title : data.title,
                    priority : data.priority,
                    type : data.type,
                    project : data.project_id,
                    developer : data.developer_id,
                    tester : data.tester_id,
                    description : data.description,
                    dueDate : data.due_date,
                    imageURL : data.image,
                    formClassName : "none",
                    formTextareaClassName : "none"
                }, function(){
                      this.hideErrorMessage();
                      this.fetchUsers(data.project_id);
                });
            break;
            case 'VIEW' :
                var data = JSON.parse(nextProps.data);
                this.setState({
                    isViewState : true,
                    id : data.id,
                    title : data.title,
                    priority : data.priority,
                    type : data.type,
                    project : data.project_id,
                    developer : data.developer_id,
                    tester : data.tester_id,
                    description : data.description,
                    dueDate : data.due_date,
                    imageURL : data.image,
                    formClassName : "none",
                    formTextareaClassName : "none"
                }, function(){
                      this.hideErrorMessage();
                      this.fetchUsers(data.project_id);
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

    fetchUsers(projectId) {

        HTTPService.get('user/getUsers?projectId=' + projectId, function(res) {

            var devOptions = [];
            var testerOptions = [];

            for(var i = 0 ; i < res.data.length ; i++){

                var tmp = {
                    value : res.data[i].id,
                    label : res.data[i].name
                };

                if(res.data[i].title == "Developer"){
                    devOptions.push(tmp);
                }else if(res.data[i].title == "Tester"){
                    testerOptions.push(tmp);
                }
            }

            this.setState({
                devOptions : devOptions,
                testerOptions : testerOptions
            });

        }.bind(this));
    }

    handleSubmitForm(e) {
        e.preventDefault();

        var attributeList = ['title', 'priority', 'type', 'project', 'developer', 'tester', 'description', 'dueDate', 'imageURL'];
        for(var i = 0 ; i < attributeList.length - 1 ; i++){
            if(this.state[attributeList[i]] == "")
                return;
        }

        var body = {
            id : this.state.id,
            title : this.state.title,
            priority : this.state.priority,
            type : this.state.type,
            project_id : this.state.project,
            developer_id : this.state.developer,
            tester_id : this.state.tester,
            description :this.state.description,
            due_date : this.state.dueDate,
            image : this.state.imageURL,
            owner_id : window.localStorage.getItem('id'),
            owner_name : window.localStorage.getItem("name")
        }

        if (this.props.dialogState == "NEW") {
            HTTPService.post('issue/addIssue', body, function(res) {
                $('#IssueDialogModal').modal('hide');
                this.props.fetchData();
            }.bind(this));

        } else if (this.props.dialogState == "EDIT") {

            HTTPService.post('issue/updateIssue', body, function(res) {
                $('#IssueDialogModal').modal('hide');
                this.props.fetchData();
            }.bind(this));
        }

        return ;
    }

    handleChange(item_name, event) {

        /*根據item_name 更改值*/
        switch(item_name){
            case 'project' :
                this.fetchUsers(event.target.value);
            break ;
        }

        var nextState = {};
        nextState[item_name] = event.target.value;
        this.setState(nextState);

    }

    handleUploadImage(acceptedFiles) {

      const CLOUDINARY_UPLOAD_PRESET = 'lfksd938';
      const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dr5ndcjx5/upload';


        let upload = Superagent.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', acceptedFiles[0]);

        upload.end((err, response) => {
            if (err) {
              console.error(err);
            }

            if (response.body.secure_url !== '') {
                this.setState({
                    imageURL: response.body.secure_url
                });
            }
        });

    }

    render() {

        var validationOptions = {
            rules: {
                title: {
                    required: true
                },
                priority : {
                    required: true
                },
                type : {
                    required: true
                },
                project : {
                    required : true
                },
                developer : {
                    required: true
                },
                tester : {
                    required: true
                },
                description : {
                    required: true
                },
                dueDate : {
                    required: true
                }
            },
            messages: {
                title: {
                    required: 'title required'
                },
                priority : {
                    required: 'priority required'
                },
                type : {
                    required: 'type required'
                },
                project : {
                    required : 'project required'
                },
                developer : {
                    required: 'developer required'
                },
                tester : {
                    required: 'tester required'
                },
                description : {
                    required: 'description required'
                },
                dueDate : {
                    required: 'dueDate required'
                }

            }
        };

        var input_style = {
            backgroundColor: (this.state.isViewState) ? ("#f9f9f9") : ("")
        }

        return (
            <div>
                <div className="modal fade" id="IssueDialogModal" tabIndex="-1" role="dialog" aria-labelledby="IssueDialogModal" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content" style={{padding: "10px"}}>
                            <WidgetGrid>
                                <UiValidate options={validationOptions}>
                                    <form className="smart-form" noValidate="noValidate" onSubmit={this.handleSubmitForm.bind(this)}>

                                        <header>
                                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                                                &times;
                                            </button>
                                            <h1 className="modal-title" id="myModalLabel">
                                              {(this.props.dialogState == "NEW") ?
                                                  ("Create Issue") : (this.props.dialogState == "EDIT") ?
                                                      ("Edit Issue") : ("View Issue")}
                                            </h1>
                                        </header>

                                        <fieldset>
                                            <section>
                                                <label className="label">Issue Title</label>
                                                <label className={this.state.formClassName}>
                                                    <input type="text" id='title' name='title' value={this.state.title} onChange={this.handleChange.bind(this, 'title')} placeholder="Issue Title" disabled={this.state.isViewState} style={input_style}/>
                                                    <b className="tooltip tooltip-bottom-right">Enter Issue Title</b>
                                                </label>
                                            </section>

                                            <section>
                                                <label className="label">Priority</label>
                                                <label className={this.state.formClassName}>
                                                    <select name="priority" id='priority' className="form-control" onChange={this.handleChange.bind(this, 'priority')} value={this.state.priority} disabled={this.state.isViewState}>
                                                        <option disabled hidden value="">Choose here...</option>
                                                        {this.state.priorityOptions.map((item, index) => (
                                                            <option value={item.value} key={index}>{item.label}</option>
                                                        ))}
                                                    </select>
                                                </label>
                                            </section>

                                            <section>
                                                <label className="label">Type</label>
                                                <label className={this.state.formClassName}>
                                                    <select name="type" id='type' className="form-control" onChange={this.handleChange.bind(this, 'type')} value={this.state.type} disabled={this.state.isViewState}>
                                                        <option disabled hidden value="">Choose here...</option>
                                                        {this.state.typeOptions.map((item, index) => (
                                                            <option value={item.value} key={index}>{item.label}</option>
                                                        ))}
                                                    </select>
                                                </label>
                                            </section>

                                            <section>
                                                <label className="label">Project</label>
                                                <label className={this.state.formClassName}>
                                                    <select name="project" id='project' className="form-control" value={this.state.project} onChange={this.handleChange.bind(this, 'project')} disabled={this.state.isViewState}>
                                                        <option disabled hidden value="">Choose here...</option>
                                                        {this.state.projectOptions.map((item, index) => (
                                                            <option value={item.value} key={index}>{item.label}</option>
                                                        ))}
                                                    </select>
                                                </label>
                                            </section>

                                            <section>
                                                <label className="label">Developer</label>
                                                <label className={this.state.formClassName}>
                                                    <select name="developer" id='developer' className="form-control" onChange={this.handleChange.bind(this, 'developer')} value={this.state.developer} disabled={this.state.isViewState}>
                                                        <option disabled hidden value="">Choose here...</option>
                                                        {this.state.devOptions.map((item, index) => (
                                                            <option value={item.value} key={index}>{item.label}</option>
                                                        ))}
                                                    </select>
                                                </label>
                                            </section>

                                            <section>
                                                <label className="label">Tester</label>
                                                <label className={this.state.formClassName}>
                                                    <select name="tester" id='tester' className="form-control" onChange={this.handleChange.bind(this, 'tester')} value={this.state.tester} disabled={this.state.isViewState}>
                                                        <option disabled hidden value="">Choose here...</option>
                                                        {this.state.testerOptions.map((item, index) => (
                                                            <option value={item.value} key={index}>{item.label}</option>
                                                        ))}
                                                    </select>
                                                </label>
                                            </section>

                                            <section>
                                                <label className="label">Description</label>
                                                <label className="textarea {this.state.formTextareaClassName}">
                                                    <textarea rows="3" type="text" id='description' name='description' value={this.state.description} onChange={this.handleChange.bind(this, 'description')} placeholder="Description" disabled={this.state.isViewState} style={input_style}/>
                                                    <b className="tooltip tooltip-bottom-right">Enter Issue Description</b>
                                                </label>
                                            </section>

                                            <section>
                                                <label className="label">Due Date</label>
                                                <label className={this.state.formClassName}>
                                                    <i className="icon-append fa fa-calendar"></i>
                                                    <input type="date" name="dueDate" id="dueDate" value={this.state.dueDate}  onChange={this.handleChange.bind(this, 'dueDate')} placeholder="Expected finish date" className="hasDatepicker valid" disabled={this.state.isViewState} style={input_style}/>
                                                </label>
                                            </section>

                                            <section>
                                                <label className="label">Picture</label>
                                                <Dropzone
                                                    onDrop={this.handleUploadImage.bind(this)}
                                                    disableClick = {this.state.isViewState}
                                                    accept="image/*"
                                                    className='dropzone'
                                                    activeClassName='active-dropzone'
                                                    style = {{padding : "10px"}}
                                                    multiple={false}>
                                                        <div>Drag and drop or click to select a file to upload.</div>
                                                        <div >{(this.state.imageURL != "")?(<img id="picture" style={{width:"100%"}} src={this.state.imageURL} />) : null}</div>
                                                </Dropzone>
                                            </section>

                                        </fieldset>

                                        <section>
                                            <footer style={{background: "#ffffff"}}>
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
