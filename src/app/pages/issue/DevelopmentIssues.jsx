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

import IssueDialogModal from '../../../components/issue/IssueDialogModal.jsx'
import IssueHistoryDialog from '../../../components/issue/IssueHistoryDialog.jsx'

let DevelopmentIssues = React.createClass({
    getInitialState: function() {
        return {
            startDate : moment().startOf('day'),
            endDate : moment().endOf('day'),
            isSelected : false,
            identity: window.localStorage.getItem("title"),
            issuesList : []
        };
    },
    componentWillMount: function() {
        this.fetchDevelopmentIssues();
    },
    fetchDevelopmentIssues : function(){

        HTTPService.get('issue/getIssues', function(res){
            var dataList = [];
            for(var i = 0; i < res.data.length; i++) {
              if(res.data[i].status == 'Development')
                  dataList.push(res.data[i])
            }

            this.setState({
                issuesList : dataList
            })

        }.bind(this));
    },
    buttonEditIssue : function(){

    },
    butoonViewEvent : function(){

    },
    buttonFinishIssue : function(){

    },
    buttonExportCSV: function(){
        this.refs.tbl_allIssuesList.handleExportCSV();
    },
    onRowSelect: function(row, isSelected) {
        if (!isSelected) {
            this.setState({
                selectedId: "",
                isSelected: isSelected
            });
        } else {
            this.setState({
                selectedId: row.id,
                isSelected: isSelected
            });
        }
    },
    onSortChange : function(){
        this.forceUpdate();
    },
    render: function() {
        var arrow_style = {
            fontSize:"5px",
            margin:"0px 7px 0px 7px"
        };

        function statusFormatter(cell, row){
            switch (cell) {
                case "New" :
                    return '<span class="center-block padding-5 label btn-info">'+ cell +'</span>';
                    break;
                case "Development" :
                    return '<span class="center-block padding-5 label btn-primary">'+ "In Progress" +'</span>';
                    break;
                case "Testing" :
                    return '<span class="center-block padding-5 label btn-warning">'+ "In QA" +'</span>';
                    break;
                case "Done" :
                    return '<span class="center-block padding-5 label btn-success">'+ cell +'</span>';
                    break;
                case "Closed" :
                    return '<span class="center-block padding-5 label btn-danger">'+ cell +'</span>';
                    break;
            }
        }

        function priorityFormatter(cell, row){
            switch (cell) {
                case "Low" :
                    return '<span class="center-block padding-5 label bg-color-green txt-color-white">'+ cell +'</span>';
                    break;
                case "Medium" :
                    return '<span class="center-block padding-5 label bg-color-blue txt-color-white">'+ cell +'</span>';
                    break;
                case "High" :
                    return '<span class="center-block padding-5 label bg-color-orange txt-color-white">'+ cell +'</span>';
                    break;
                case "Critical" :
                    return '<span class="center-block padding-5 label bg-color-red txt-color-white">'+ cell +'</span>';
                    break;
            }
        }

        var priorityFilter = {
            type: "SelectFilter",
            placeholder: "Filter Priority",
            options: {
                Low : "Low",
                Medium : "Medium",
                High : "High",
                Critical : "Critical"
            }
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

                <IssueDialogModal />
                <IssueHistoryDialog />

                <div className="row hidden-xs">
                    <div className='col-md-12 big-breadcrumbs'>
                        <h1 className="page-title txt-color-blueDark">
                            <i className="fa fa-lg fa-fw fa-paper-plane" style={{margin:"0px 5px 0px 0px"}}></i>
                            <Msg phrase="Issue" />
                            <i className="fa fa-chevron-right" style={arrow_style}></i>
                            <a className="txt-color-blueDark" >Development</a>
                        </h1>
                    </div>
                </div>

                <WidgetGrid>
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="btn-toolbar">
                                <div className="btn-group" >
                                    <OverlayTrigger placement="top"
                                        overlay={<Popover id="popover-activated-on-hover-popover"> Edit Issue </Popover> }>
                                        <a onClick={this.buttonEditIssue}
                                            data-toggle="modal"
                                            data-target={(this.state.isSelected) && (this.state.identity == "PM") ? "#IssueDialogModal" : null}
                                            disabled={!(this.state.isSelected) || !(this.state.identity == "PM")}
                                            className="btn btn-sm btn-labeled btn-primary">
                                            <span className="btn-label">
                                                <i className="fa fa-edit"></i>
                                            </span>Edit
                                        </a>
                                    </OverlayTrigger>
                                </div>

                                <div className="btn-group" >
                                    <OverlayTrigger placement="top"
                                        overlay={<Popover id="popover-activated-on-hover-popover"> View Issue </Popover> }>
                                        <a onClick={this.buttonViewEvent}
                                           data-toggle="modal"
                                           data-target={(this.state.isSelected) ? "#IssueDialogModal" : null}
                                           disabled={!(this.state.isSelected)}
                                           className="btn btn-sm btn-labeled btn-info">
                                            <span className="btn-label">
                                                <i className="fa fa-eye"></i>
                                            </span>View
                                        </a>
                                    </OverlayTrigger>
                                </div>

                                <div className="btn-group" >
                                    <OverlayTrigger placement="top"
                                        overlay={<Popover id="popover-activated-on-hover-popover"> View History </Popover> }>
                                        <a onClick={this.buttonViewEvent}
                                           data-toggle="modal"
                                           data-target={(this.state.isSelected) ? "#IssueHistoryDialog" : null}
                                           disabled={!(this.state.isSelected)}
                                           className="btn btn-sm btn-labeled btn-warning">
                                            <span className="btn-label">
                                                <i className="fa fa-history"></i>
                                            </span>History
                                        </a>
                                    </OverlayTrigger>
                                </div>

                                <div className="btn-group">
                                    <OverlayTrigger placement="top"
                                        overlay={<Popover id="popover-activated-on-hover-popover"> Finish Issue </Popover> }>
                                        <a onClick={this.buttonFinishIssue}  className="btn btn-sm btn-default"  >
                                            <i className="fa fa-check"></i>
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
                                        <h2><span className="widget-icon"> <i className="fa fa-table"/></span><Msg phrase=" All Issues"/></h2>
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
                                        <BootstrapTable ref="tbl_allIssuesList" selectRow={selectRowProp} csvFileName="allIssues.csv" data={this.state.issuesList} options={datatable_options} striped={true} hover={true} pagination>
                                            <TableHeaderColumn width='100' dataField="id" isKey={true} hide="true" dataSort={true} csvHeader="ID"> <Msg phrase="ID" /> </TableHeaderColumn>
                                            <TableHeaderColumn width='100' dataField="project_name" dataSort={true} csvHeader="Project">  <Msg phrase="Project" />  </TableHeaderColumn>
                                            <TableHeaderColumn width='100' dataField="title" dataSort={true} csvHeader="Title">  <Msg phrase="Title" />  </TableHeaderColumn>
                                            <TableHeaderColumn width='100' dataField="type" dataSort={true} csvHeader="Type">  <Msg phrase="Type" />  </TableHeaderColumn>
                                            <TableHeaderColumn width='140' dataField="priority" dataFormat={priorityFormatter} filter={priorityFilter} dataSort={true} csvHeader="Priority">  <Msg phrase="Priority" />  </TableHeaderColumn>
                                            <TableHeaderColumn width='130' dataField="status" dataFormat={statusFormatter} dataSort={true} csvHeader="Status">  <Msg phrase="Status" />  </TableHeaderColumn>
                                            <TableHeaderColumn width='100' dataField="owner" dataSort={true} csvHeader="Owner">  <Msg phrase="Owner" />  </TableHeaderColumn>
                                            <TableHeaderColumn width='100' dataField="tester" dataSort={true} csvHeader="Tester">  <Msg phrase="Tester" />  </TableHeaderColumn>
                                            <TableHeaderColumn width='100' dataField="developer" dataSort={true} csvHeader="Developer">  <Msg phrase="Developer" />  </TableHeaderColumn>
                                            <TableHeaderColumn width='120' dataField="createDate" dataSort={true} csvHeader="Created Date">  <Msg phrase="Created Date" />  </TableHeaderColumn>
                                            <TableHeaderColumn width='120' dataField="dueDate" dataSort={true} csvHeader="Due Date">  <Msg phrase="Due Date" />  </TableHeaderColumn>
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

export default DevelopmentIssues
