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

let AllIssues = React.createClass({
    getInitialState: function() {
        return {
            startDate : moment().startOf('day'),
            endDate : moment().endOf('day'),
            issuesList : [{
                id : "123",
                project : "project 1",
                priority : "Low",
                status : "Started",
                owner : "pm1",
                tester : "tester1",
                developer : "dev1",
                date : "2016/01/01"
            },{
                id : "124",
                project : "project 2",
                priority : "Medium",
                status : "Closed",
                owner : "pm2",
                tester : "tester2",
                developer : "dev2",
                date : "2016/01/02"
            },{
                id : "125",
                project : "project 3",
                priority : "High",
                status : "Pending",
                owner : "pm3",
                tester : "tester3",
                developer : "dev3",
                date : "2016/01/03"
            },{
                id : "126",
                project : "project 3",
                priority : "Critical",
                status : "Pending",
                owner : "pm3",
                tester : "tester3",
                developer : "dev3",
                date : "2016/01/03"
            }]
        };
    },
    componentWillMount: function() {



    },
    buttonCreateIssue : function(){

    },
    buttonEditIssue : function(){

    },
    buttonExportCSV: function(){
        this.refs.tbl_allIssuesList.handleExportCSV();
    },
    onRowSelect: function(row, isSelected) {

    },
    onSortChange : function(){
        this.forceUpdate();
    },
    render: function () {

        var arrow_style = {
            fontSize:"5px",
            margin:"0px 7px 0px 7px"
        };

        function statusFormatter(cell, row){
            switch (cell) {
                case "Started" :
                    return '<span class="center-block padding-5 label label-success">'+ cell +'</span>';
                    break;
                case "Pending" :
                    return '<span class="center-block padding-5 label bg-color-blueLight txt-color-white">'+ cell +'</span>';
                    break;
                case "Closed" :
                    return '<span class="center-block padding-5 label bg-color-blue txt-color-white">'+ cell +'</span>';
                    break;
            }
        }

        function priorityFormatter(cell, row){
            switch (cell) {
                case "Low" :
                    return '<span class="center-block padding-5 label bg-color-greenLight txt-color-white">'+ cell +'</span>';
                    break;
                case "Medium" :
                    return '<span class="center-block padding-5 label bg-color-yellow txt-color-white">'+ cell +'</span>';
                    break;
                case "High" :
                    return '<span class="center-block padding-5 label bg-color-orange txt-color-white">'+ cell +'</span>';
                    break;
                case "Critical" :
                    return '<span class="center-block padding-5 label bg-color-red txt-color-white">'+ cell +'</span>';
                    break;
            }
        }

        var statusFilter = {
            type: "SelectFilter",
            placeholder: "Filter Status",
            options: {
                Started : "Started",
                Pending : "Pending",
                Closed : "Closed"
            }
        };

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
                <div className="row hidden-xs">
                    <div className='col-md-12 big-breadcrumbs'>
                        <h1 className="page-title txt-color-blueDark">
                            <i className="fa fa-lg fa-fw fa-paper-plane" style={{margin:"0px 5px 0px 0px"}}></i>
                            <Msg phrase="Issue" />
                            <i className="fa fa-chevron-right" style={arrow_style}></i>
                            <a className="txt-color-blueDark" >All Issues</a>
                        </h1>
                    </div>
                </div>

                <WidgetGrid>
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="btn-toolbar">
                                <div className="btn-group">
                                    <OverlayTrigger placement="top"
                                        overlay={<Popover id="popover-activated-on-hover-popover"> Create Issue </Popover> }>
                                        <a onClick={this.buttonCreateIssue} data-toggle="modal" data-target="#ApplicationDialog"  className="btn btn-labeled btn-success"  >
                                            <span className="btn-label">
                                                <i className="glyphicon glyphicon-plus"></i>
                                            </span>New
                                        </a>
                                    </OverlayTrigger>
                                </div>

                                <div className="btn-group" >
                                    <OverlayTrigger placement="top"
                                        overlay={<Popover id="popover-activated-on-hover-popover"> Edit Issue </Popover> }>
                                        <a onClick={this.buttonEditIssue}
                                            data-toggle="modal"
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
                                        className="btn btn-sm btn-labeled btn-info">
                                            <span className="btn-label">
                                                <i className="fa fa-eye"></i>
                                            </span>View
                                        </a>
                                    </OverlayTrigger>
                                </div>

                                <div className="btn-group pull-right">
                                    <DateRangePicker ranges={this.state.ranges}  onApply={this.handleCalendarChange} startDate={this.state.startDate} endDate={this.state.endDate} >
                                        <button type="button" className="btn btn-sm btn-default">
                                            <span className="widget-icon"> <i className="fa fa-calendar"/> </span> { this.state.startDate.format('YYYY-MM-DD') } - { this.state.endDate.format('YYYY-MM-DD') }
                                        </button>
                                    </DateRangePicker>
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
                                            <TableHeaderColumn width='100' dataField="id" isKey={true} hide="true" dataSort={true} csvHeader="ID">  <Msg phrase="ID" />  </TableHeaderColumn>
                                            <TableHeaderColumn width='100' dataField="project" dataSort={true} csvHeader="Project">  <Msg phrase="Project" />  </TableHeaderColumn>
                                            <TableHeaderColumn width='140' dataField="priority" dataFormat={priorityFormatter} filter={priorityFilter} dataSort={true} csvHeader="Priority">  <Msg phrase="Priority" />  </TableHeaderColumn>
                                            <TableHeaderColumn width='130' dataField="status" dataFormat={statusFormatter} filter={statusFilter} dataSort={true} csvHeader="Status">  <Msg phrase="Status" />  </TableHeaderColumn>
                                            <TableHeaderColumn width='100' dataField="owner" dataSort={true} csvHeader="Owner">  <Msg phrase="Owner" />  </TableHeaderColumn>
                                            <TableHeaderColumn width='100' dataField="tester" dataSort={true} csvHeader="Tester">  <Msg phrase="Tester" />  </TableHeaderColumn>
                                            <TableHeaderColumn width='100' dataField="developer" dataSort={true} csvHeader="Developer">  <Msg phrase="Developer" />  </TableHeaderColumn>
                                            <TableHeaderColumn width='100' dataField="date" dataSort={true} csvHeader="Date">  <Msg phrase="Date" />  </TableHeaderColumn>
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
