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

export default class IssueDialogModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            isViewState: false,
            formClassName: "input",
            project : "",
            developer : "",
            tester : "",
            priority: "",
            type: "",
            projectOptions : JSON.parse(window.localStorage.getItem('project')),
            devOptions: [],
            testerOptions: [],
            priorityOptions : [{"label" : "Low", "value" : "Low"}, {"label" : "Medium", "value" : "Medium"}, {"label" : "High", "value" : "High"}, {"label" : "Critical", "value" : "Critical"}],
            typeOptions : [{"label" : "Bug", "value" : "Bug"}, {"label" : "Task", "value" : "Task"}, {"label" : "Feature", "value" : "Feature"}]
        };

    }
    componentWillReceiveProps(nextProps) {}

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

    handleSubmitForm() {}

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

    render() {

        var validationOptions = {
            rules: {
                title: {
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
            backgroundColor: (this.state.isViewState) ? ("#f9f9f9") : ("")
        }

        return (
            <div>
                <div className="modal fade" id="IssueDialogModal" tabIndex="-1" role="dialog" aria-labelledby="IssueDialogModal" aria-hidden="true">
                    <div className="modal-dialog" style={{width: "50%"}}>
                        <div className="modal-content" style={{padding: "10px"}}>
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
                                                <label className={this.state.formClassName}>
                                                    <input type="text" id='title' name='title' value={this.state.title} onChange={this.handleChange.bind(this, 'title')} placeholder="Issue Title" disabled={this.state.isViewState} style={input_style}/>
                                                    <b className="tooltip tooltip-bottom-right">Enter Issue Title</b>
                                                </label>
                                            </section>

                                            <section>
                                                <label className="label">Project</label>
                                                <label className={this.state.formClassName}>
                                                    <select name="project" id='project' className="form-control" value={this.state.project} onChange={this.handleChange.bind(this, 'project')}>
                                                        <option disabled hidden value="">Choose here...</option>
                                                        {this.state.projectOptions.map((item, index) => (
                                                            <option value={item.value} key={index}>{item.label}</option>
                                                        ))}
                                                    </select>
                                                </label>
                                            </section>

                                            <section>
                                                <label className="label">Priority</label>
                                                <label className={this.state.formClassName}>
                                                    <select name="priority" id='priority' className="form-control" onChange={this.handleChange.bind(this, 'priority')} value={this.state.priority}>
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
                                                    <select name="type" id='type' className="form-control" onChange={this.handleChange.bind(this, 'type')} value={this.state.type}>
                                                        <option disabled hidden value="">Choose here...</option>
                                                        {this.state.typeOptions.map((item, index) => (
                                                            <option value={item.value} key={index}>{item.label}</option>
                                                        ))}
                                                    </select>
                                                </label>
                                            </section>

                                            <section>
                                                <label className="label">Developer</label>
                                                <label className={this.state.formClassName}>
                                                    <select name="developer" id='developer' className="form-control" onChange={this.handleChange.bind(this, 'developer')} value={this.state.developer}>
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
                                                    <select name="tester" id='tester' className="form-control" onChange={this.handleChange.bind(this, 'tester')} value={this.state.tester}>
                                                        <option disabled hidden value="">Choose here...</option>
                                                        {this.state.testerOptions.map((item, index) => (
                                                            <option value={item.value} key={index}>{item.label}</option>
                                                        ))}
                                                    </select>
                                                </label>
                                            </section>

                                            <section>
                                                <label className="label">Description</label>
                                                <label className="textarea {this.state.formClassName}">
                                                    <textarea rows="3" type="text" id='application_name' name='application_name' value={this.state.application_name} onChange={this.handleChange.bind(this, 'Description')} placeholder="Description" disabled={this.state.isViewState} style={input_style}/>
                                                    <b className="tooltip tooltip-bottom-right">Enter Issue Title</b>
                                                </label>
                                            </section>

                                            <section>
                                                <label className="label">Due Date</label>
                                                <label className="input state-success">
                                                    <i className="icon-append fa fa-calendar"></i>
                                                    <input type="date" name="finishdate" id="finishdate" placeholder="Expected finish date" className="hasDatepicker valid"/>
                                                </label>
                                            </section>

                                            <section>
                                                <label className="label">Picture</label>
                                                <Dropzone ref="dropzone" multiple={false}>
                                                    DropZone
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
