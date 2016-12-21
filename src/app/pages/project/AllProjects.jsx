import React from 'react'
import BigBreadcrumbs from '../../../components/layout/navigation/components/BigBreadcrumbs.jsx'
import Msg from '../../../components/i18n/Msg.jsx'
import WidgetGrid from '../../../components/layout/widgets/WidgetGrid.jsx'
import JarvisWidget from '../../../components/layout/widgets/JarvisWidget.jsx'
import {OverlayTrigger, Popover} from 'react-bootstrap'
import Datatable from '../../../components/tables/Datatable.jsx'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import moment from 'moment'
import Select from 'react-select'
import {HTTPService} from '../../../services/index.js'

import ProjectDialogModal from '../../../components/project/ProjectDialogModal.jsx'

let AllProjects = React.createClass({
    getInitialState: function() {
        return {
            projectList : [],
            selectedId : "",
            selectedData : "",
            dialogState : "",
            isSelected : false,
            isAdmin : (window.localStorage.getItem('title')=='Admin')
        };
    },
    componentWillMount: function() {
        this.fetchProjects();
    },
    fetchProjects : function(){

        HTTPService.get('project/getProjects', function(res){

            this.setState({
                projectList : res.data
            })

        }.bind(this));
    },
    buttonCreateProject : function(){
        this.setState({
            dialogState : "NEW"
        })
    },
    buttonEditProject : function(){
      console.log(this.state.selectedId);
        if(this.state.selectedId){
            for(var i = 0 ; i < this.state.projectList.length ; i++){
                if(this.state.selectedId == this.state.projectList[i].id){

                    this.setState({
                        dialogState : "EDIT",
                        selectedData : JSON.stringify(this.state.projectList[i])
                    });
                    break;
                }
            }
        }
    },
    buttonExportCSV: function(){
        this.refs.tbl_allProjectsList.handleExportCSV();
    },
    onRowSelect: function(row, isSelected) {

        if(!isSelected){
            this.setState({
                selectedId : "",
                isSelected: isSelected,
             });
        }else{
            this.setState({
                selectedId : row.id,
                isSelected: isSelected
            })
        }
    },
    onSortChange : function(){
        this.forceUpdate();
    },
    render: function () {

        var arrow_style = {
            fontSize:"5px",
            margin:"0px 7px 0px 7px"
        };

        var selectRowProp = {
            mode: "radio",
            bgColor: "rgb(228,237,238)",
            clickToSelect: true,
            onSelect: this.onRowSelect
        };

        var datatable_options = {
            onSortChange: this.onSortChange,
            exportCSVText : "CSV",
            sizePerPage : 50
        };

        return (
            <div id="content">
                <ProjectDialogModal
                    dialogState = {this.state.dialogState}
                    data = {this.state.selectedData}
                    fetchData = {this.fetchProjects}
                />
                <div className="row hidden-xs">
                    <div className='col-md-12 big-breadcrumbs'>
                        <h1 className="page-title txt-color-blueDark">
                            <i className="fa fa-lg fa-fw fa-list-alt" style={{margin:"0px 5px 0px 0px"}}></i>
                            <Msg phrase="Project" />
                            <i className="fa fa-chevron-right" style={arrow_style}></i>
                            <a className="txt-color-blueDark" >All Projects</a>
                        </h1>
                    </div>
                </div>

                <WidgetGrid>
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="btn-toolbar">
                                <div className="btn-group">
                                    <OverlayTrigger placement="top"
                                        overlay={<Popover id="popover-activated-on-hover-popover"> Create Project </Popover> }>
                                        <a onClick={this.buttonCreateProject}
                                            data-toggle="modal"
                                            data-target={(this.state.isAdmin) ?"#ProjectDialogModal" :null}
                                            disabled={!(this.state.isAdmin)}
                                            className="btn btn-labeled btn-success"  >
                                            <span className="btn-label">
                                                <i className="glyphicon glyphicon-plus"></i>
                                            </span>New
                                        </a>
                                    </OverlayTrigger>
                                </div>

                                <div className="btn-group" >
                                    <OverlayTrigger placement="top"
                                        overlay={<Popover id="popover-activated-on-hover-popover"> Edit Project </Popover> }>
                                        <a onClick={this.buttonEditProject}
                                            data-toggle="modal"
                                            data-target={(this.state.isSelected && this.state.isAdmin) ? "#ProjectDialogModal" : null}
                                            disabled={(!this.state.isAdmin || !this.state.isSelected)}
                                            className="btn btn-sm btn-labeled btn-primary">
                                            <span className="btn-label">
                                                <i className="fa fa-edit"></i>
                                            </span>Edit
                                        </a>
                                    </OverlayTrigger>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row"><div className="col-md-12"><p></p></div></div>
                    <div className="row">
                        <article className="col-sm-12">
                            <JarvisWidget
                                editbutton={false}
                                colorbutton={false}
                                deletebutton={false}
                                color="darken">

                                <header>
                                    <div className="hidden-xs col-sm-2 ">
                                        <h2><span className="widget-icon"> <i className="fa fa-table"/></span><Msg phrase=" All Projects"/></h2>
                                    </div>
                                    <div className="pull-right">
                                        <OverlayTrigger placement="top"
                                            overlay={<Popover id="popover-activated-on-hover-popover"> Export CSV File </Popover> }>
                                            <a style={{borderLeftColor:"#383838"}} onClick={this.buttonExportCSV} className="btn bg-color-darken txt-color-white pull-right"><b>Export</b></a>
                                        </OverlayTrigger>
                                    </div>
                                </header>

                                <div>
                                    <div className="widget-body">
                                        <BootstrapTable ref="tbl_allProjectsList" selectRow={selectRowProp} csvFileName="allProjects.csv" data={this.state.projectList} options={datatable_options} striped={true} hover={true} pagination>
                                            <TableHeaderColumn width='100' dataField="id" isKey={true} hidden={true} dataSort={true} csvHeader="ID"> <Msg phrase="ID" /> </TableHeaderColumn>
                                            <TableHeaderColumn width='100' dataField="project_name" dataSort={true} csvHeader="Project Name">  <Msg phrase="Project Name" />  </TableHeaderColumn>
                                            <TableHeaderColumn width='100' dataField="project_description" dataSort={true} csvHeader="Project Description">  <Msg phrase="Project Description" />  </TableHeaderColumn>
                                        </BootstrapTable>
                                    </div>
                                </div>

                            </JarvisWidget>
                        </article>
                    </div>
                </WidgetGrid>

            </div>
        )
    }
});

export default AllProjects
