import React, { Component, PropTypes } from 'react'

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
            title : "",
            isViewState : false,
            formClassName : "input",
            projectName : "",
            priority : "",
            projectOptions : [],
            priorityOptions : [{"label" : "Low", "value" : "Low"}, {"label" : "Medium", "value" : "Medium"}, {"label" : "High", "value" : "High"}, {"label" : "Critical", "value" : "Critical"}],
            typeOptions : [{"label" : "Bug", "value" : "Bug"}, {"label" : "Task", "value" : "Task"}, {"label" : "Feature", "value" : "Feature"}]
        };

        this.fetchProjects();
    }
    componentWillReceiveProps(nextProps){

    }

    fetchProjects(){
        HTTPService.get('project/getProjects', function(res){

            var dataList = [];

            for(var i = 0 ; i < res.data.length ; i++){

                var temp = {
                    value : res.data[i].project_name,
                    label : res.data[i].project_name,
                    id : res.data[i].id
                };
                dataList.push(temp);
            }
            console.log(dataList);
            this.setState({
                projectOptions : dataList
            })

        }.bind(this));
    }

    handleSubmitForm (){

    }

    handleChange(item_name, event){

        /*根據item_name 更改值*/
        var temp = "";
        switch (item_name) {
          case "projectName" :
            this.setState({projectName : event});
            break;
          case "priority" :
            this.setState({priority : event});
          break;
          case "type" :
            this.setState({type : event});
          break;

          default:
            var nextState = {};
            nextState[item_name] = event.target.value;
            this.setState(nextState);
        }

    }

    render() {

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
                                                  onChange={this.handleChange.bind(this, 'title')}
                                                  placeholder="Issue Title"
                                                  disabled={this.state.isViewState}
                                                  style={input_style}/>
                                                <b className="tooltip tooltip-bottom-right">Enter Issue Title</b>
                                            </label>
                                        </section>

                                        <section>
                                            <label className="label">Project</label>
                                                <Select
                                                    ref="project"
                                                    value={this.state.projectName}
                                                    placeholder="Select"
                                                    options={options}
                                                    onChange={this.handleChange.bind(this,"projectName")}
                                                    disabled={this.state.isViewState}
                                                />
                                        </section>

                                        <section>
                                            <label className="label">Priority</label>
                                                <Select
                                                    ref="priority"
                                                    value={this.state.priority}
                                                    placeholder="Select"
                                                    options={this.state.priorityOptions}
                                                    onChange={this.handleChange.bind(this, "priority")}
                                                    disabled={this.state.isViewState}
                                                />
                                        </section>

                                        <section>
                                            <label className="label">Type</label>
                                                <Select
                                                    ref="type"
                                                    value={this.state.type}
                                                    placeholder="Select"
                                                    options={this.state.typeOptions}
                                                    onChange={this.handleChange.bind(this, "type")}
                                                    disabled={this.state.isViewState}
                                                />
                                        </section>

                                        <section>
                                            <label className="label">test</label>
                                            <label className={this.state.formClassName}>
                                                <select name="test" id='test' className="form-control"
                                                    value={this.state.developer}>
                                                        <option disabled hidden value="">Choose here...</option>
                                                        {options.map((item, index) => (
                                                						<option value={item.value} key={index}>{item.label}</option>
                                              					))}
                                                </select>
                                            </label>
                                        </section>

                                        <section>
                                            <label className="label">Developer</label>
                                            <label className={this.state.formClassName}>
                                                <select name="developer" id='developer' className="form-control"
                                                    value={this.state.developer}
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
                                              <select name="tester" id='tester' className="form-control"
                                                  value={this.state.tester}
                                                  onChange={this.handleChange.bind(this, 'tester')}
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
                                                  onChange={this.handleChange.bind(this, 'title')}
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
}
