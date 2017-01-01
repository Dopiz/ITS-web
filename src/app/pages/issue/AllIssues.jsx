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
import {HTTPService, Authorization} from '../../../services/index.js'

import IssueDialogModal from '../../../components/issue/IssueDialogModal.jsx'
import IssueHistoryModal from '../../../components/issue/IssueHistoryModal.jsx'
import IssueReportModal from '../../../components/issue/IssueReportModal.jsx'

let AllIssues = React.createClass({
    getInitialState: function() {
        return {
            dialogState: "",
            isSelected: false,
            selectedHistoryData: [],
            selectedReportData: [],
            identity: window.localStorage.getItem("title"),
            issuesList: []
        };
    },
    componentWillMount: function() {
        this.fetchIssues();
    },
    fetchIssues: function() {
        HTTPService.get('issue/getIssues', function(res) {
            this.setState({issuesList: res.data})

        }.bind(this));
    },
    buttonNewIssue: function() {
        this.setState({dialogState: "NEW"})
    },
    buttonEditIssue: function() {

        if (this.state.selectedId) {
            for (var i = 0; i < this.state.issuesList.length; i++) {
                if (this.state.selectedId == this.state.issuesList[i].id) {
                    this.setState({
                        dialogState: "EDIT",
                        selectedData: JSON.stringify(this.state.issuesList[i])
                    });
                    break;
                }
            }
        }
    },
    buttonViewEvent: function() {
        if (this.state.selectedId) {
            for (var i = 0; i < this.state.issuesList.length; i++) {
                if (this.state.selectedId == this.state.issuesList[i].id) {
                    this.setState({
                        dialogState: "VIEW",
                        selectedData: JSON.stringify(this.state.issuesList[i])
                    });
                    break;
                }
            }
        }
    },
    buttonViewHistory: function() {
        if (this.state.isSelected) {
            HTTPService.get('issue/getHistory?id=' + this.state.selectedId, function(res) {
                this.setState({
                    selectedHistoryData: (res.data.length)
                        ? (JSON.stringify(res.data))
                        : ([])
                });
            }.bind(this))
        }
    },
    buttonViewReport: function() {
        if (this.state.isSelected) {
            HTTPService.get('issue/getReport?id=' + this.state.selectedId, function(res) {
                console.log(res);
                this.setState({
                    selectedReportData: (res)
                        ? (JSON.stringify(res.data))
                        : ([])
                });
            }.bind(this))
        }
    },
    buttonExportCSV: function() {
        this.refs.tbl_allIssuesList.handleExportCSV();
    },
    onRowSelect: function(row, isSelected) {
        if (!isSelected) {
            this.setState({selectedId: "", isSelected: isSelected});
        } else {
            this.setState({selectedId: row.id, isSelected: isSelected});
        }
    },
    onSortChange: function() {
        this.forceUpdate();
    },
    render: function() {
        var arrow_style = {
            fontSize: "5px",
            margin: "0px 7px 0px 7px"
        };

        function statusFormatter(cell, row) {
            switch (cell) {
                case "New":
                    return '<span class="center-block padding-5 label" style="background-color: #ee3440">' + cell + '</span>';
                    break;
                case "Development":
                    return '<span class="center-block padding-5 label" style="background-color: #007cc3">' + "In Progress" + '</span>';
                    break;
                case "Testing":
                    return '<span class="center-block padding-5 label" style="background-color: #f5af02">' + "In QA" + '</a>';
                    break;
                case "Done":
                    return '<span class="center-block padding-5 label" style="background-color: #3b5998">' + cell + '</span>';
                    break;
                case "Closed":
                    return '<span class="center-block padding-5 label" style="background-color: #999999">' + cell + '</span>';
                    break;
            }
        }

        function priorityFormatter(cell, row) {
            switch (cell) {
                case "Low":
                    return '<span class="center-block padding-5 label txt-color-white" style="background-color: #85c446">' + cell + '</span>';
                    break;
                case "Medium":
                    return '<span class="center-block padding-5 label txt-color-white" style="background-color: #f9a852">' + cell + '</span>';
                    break;
                case "High":
                    return '<span class="center-block padding-5 label txt-color-white" style="background-color: #ee4c58">' + cell + '</span>';
                    break;
                case "Critical":
                    return '<span class="center-block padding-5 label txt-color-white" style="background-color: #ff0b00">' + cell + '</span>';
                    break;
            }
        }

        var priorityFilter = {
            type: "SelectFilter",
            placeholder: "Filter Priority",
            options: {
                Low: "Low",
                Medium: "Medium",
                High: "High",
                Critical: "Critical"
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
            exportCSVText: "CSV",
            sizePerPage: 50
        };

        return (
            <div id="content">

                <IssueDialogModal dialogState={this.state.dialogState} data={this.state.selectedData} fetchData={this.fetchIssues}/>
                <IssueHistoryModal data={this.state.selectedHistoryData}/>
                <IssueReportModal data={this.state.selectedReportData}/>

                <div className="row hidden-xs">
                    <div className='col-md-12 big-breadcrumbs'>
                        <h1 className="page-title txt-color-blueDark">
                            <i className="fa fa-lg fa-fw fa-paper-plane" style={{
                                margin: "0px 5px 0px 0px"
                            }}></i>
                            <Msg phrase="Issue"/>
                            <i className="fa fa-chevron-right" style={arrow_style}></i>
                            <a className="txt-color-blueDark">All Issues</a>
                        </h1>
                    </div>
                </div>

                <WidgetGrid>
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="btn-toolbar">
                                <div className="btn-group">
                                    <OverlayTrigger placement="top" overlay={< Popover id = "popover-activated-on-hover-popover" > Create Issue < /Popover>}>
                                        <a onClick={this.buttonNewIssue} data-toggle="modal" data-target={(this.state.identity == "PM")
                                            ? "#IssueDialogModal"
                                            : null} disabled={(!(this.state.identity == "PM"))} className="btn btn-labeled btn-success">
                                            <span className="btn-label">
                                                <i className="glyphicon glyphicon-plus"></i>
                                            </span>New
                                        </a>
                                    </OverlayTrigger>
                                </div>

                                <div className="btn-group">
                                    <OverlayTrigger placement="top" overlay={< Popover id = "popover-activated-on-hover-popover" > Edit Issue < /Popover>}>
                                        <a onClick={this.buttonEditIssue} data-toggle="modal" data-target={(this.state.isSelected) && (this.state.identity == "PM")
                                            ? "#IssueDialogModal"
                                            : null} disabled={!(this.state.isSelected) || !(this.state.identity == "PM")} className="btn btn-sm btn-labeled btn-primary">
                                            <span className="btn-label">
                                                <i className="fa fa-edit"></i>
                                            </span>Edit
                                        </a>
                                    </OverlayTrigger>
                                </div>

                                <div className="btn-group">
                                    <OverlayTrigger placement="top" overlay={< Popover id = "popover-activated-on-hover-popover" > View Issue < /Popover>}>
                                        <a onClick={this.buttonViewEvent} data-toggle="modal" data-target={(this.state.isSelected)
                                            ? "#IssueDialogModal"
                                            : null} disabled={!(this.state.isSelected)} className="btn btn-sm btn-labeled btn-info">
                                            <span className="btn-label">
                                                <i className="fa fa-eye"></i>
                                            </span>View
                                        </a>
                                    </OverlayTrigger>
                                </div>

                                <div className="btn-group">
                                    <OverlayTrigger placement="top" overlay={< Popover id = "popover-activated-on-hover-popover" > View History < /Popover>}>
                                        <a onClick={this.buttonViewHistory} data-toggle="modal" data-target={(this.state.isSelected)
                                            ? "#IssueHistoryModal"
                                            : null} disabled={!(this.state.isSelected)} className="btn btn-sm btn-labeled btn-warning">
                                            <span className="btn-label">
                                                <i className="fa fa-history"></i>
                                            </span>History
                                        </a>
                                    </OverlayTrigger>
                                </div>

                                <div className="btn-group">
                                    <OverlayTrigger placement="top" overlay={< Popover id = "popover-activated-on-hover-popover" > View History < /Popover>}>
                                        <a onClick={this.buttonViewReport} data-toggle="modal" data-target={(this.state.isSelected)
                                            ? "#IssueReportModal"
                                            : null} disabled={!(this.state.isSelected)} className="btn btn-sm btn-labeled btn-danger">
                                            <span className="btn-label">
                                                <i className="fa fa-bar-chart-o"></i>
                                            </span>Report
                                        </a>
                                    </OverlayTrigger>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <p></p>
                        </div>
                    </div>
                    <div className="row">
                        <article className="col-sm-12">
                            <JarvisWidget editbutton={false} colorbutton={false} deletebutton={false} color="darken">

                                <header>
                                    <div className="hidden-xs col-sm-2 ">
                                        <h2>
                                            <span className="widget-icon">
                                                <i className="fa fa-table"/></span><Msg phrase=" All Issues"/></h2>
                                    </div>
                                    <div className="pull-right">
                                        <OverlayTrigger placement="top" overlay={< Popover id = "popover-activated-on-hover-popover" > Export CSV File < /Popover>}>
                                            <a style={{
                                                borderLeftColor: "#383838"
                                            }} onClick={this.buttonExportCSV} className="btn bg-color-darken txt-color-white pull-right">
                                                <b>Export</b>
                                            </a>
                                        </OverlayTrigger>
                                    </div>
                                </header>

                                <div>
                                    <div className="widget-body">
                                        <BootstrapTable ref="tbl_allIssuesList" selectRow={selectRowProp} csvFileName="allIssues.csv" data={this.state.issuesList} options={datatable_options} striped={true} hover={true} pagination>
                                            <TableHeaderColumn width='0' dataField="id" isKey={true} hidden={true} dataSort={true} csvHeader="ID">
                                                <Msg phrase="ID"/>
                                            </TableHeaderColumn>
                                            <TableHeaderColumn width="120" dataField="status" dataFormat={statusFormatter} dataSort={true} csvHeader="Status">
                                                <Msg phrase="Status"/>
                                            </TableHeaderColumn>
                                            <TableHeaderColumn width="100" dataField="project_name" dataSort={true} csvHeader="Project">
                                                <Msg phrase="Project"/>
                                            </TableHeaderColumn>
                                            <TableHeaderColumn width="350" dataField="title" dataSort={true} csvHeader="Title">
                                                <Msg phrase="Title"/>
                                            </TableHeaderColumn>
                                            <TableHeaderColumn width="100" dataField="type" dataSort={true} csvHeader="Type">
                                                <Msg phrase="Type"/>
                                            </TableHeaderColumn>
                                            <TableHeaderColumn width="120" dataField="priority" dataFormat={priorityFormatter} filter={priorityFilter} dataSort={true} csvHeader="Priority">
                                                <Msg phrase="Priority"/>
                                            </TableHeaderColumn>
                                            <TableHeaderColumn width="100" dataField="owner_name" dataSort={true} csvHeader="Owner">
                                                <Msg phrase="Owner"/>
                                            </TableHeaderColumn>
                                            <TableHeaderColumn width="100" dataField="developer_name" dataSort={true} csvHeader="Developer">
                                                <Msg phrase="Developer"/>
                                            </TableHeaderColumn>
                                            <TableHeaderColumn width="100" dataField="tester_name" dataSort={true} csvHeader="Tester">
                                                <Msg phrase="Tester"/>
                                            </TableHeaderColumn>
                                            <TableHeaderColumn width="100" dataField="create_date" dataSort={true} csvHeader="Created Date">
                                                <Msg phrase="Created Date"/>
                                            </TableHeaderColumn>
                                            <TableHeaderColumn width="100" dataField="due_date" dataSort={true} csvHeader="Due Date">
                                                <Msg phrase="Due Date"/>
                                            </TableHeaderColumn>
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

export default AllIssues
