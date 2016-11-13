import React, { Component, PropTypes } from 'react'

import JarvisWidget from '../layout/widgets/JarvisWidget.jsx'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {OverlayTrigger, Popover} from 'react-bootstrap'
import Select from 'react-select'
import Msg from '../i18n/Msg.jsx'

let IssueHistoryDialog = React.createClass({

    getInitialState: function() {
        return {
            historyList : [{
                id : "1",
                action : "New",
                content : "Create an issue",
                user : "pm1",
                date : "2016/01/01"
            },{
                id : "2",
                action : "Assign",
                content : "Assign Dev to Dev1. Assign QA to tester1",
                user : "pm1",
                date : "2016/01/01"
            },{
                id : "3",
                action : "Active",
                content : "Active issue",
                user : "dev1",
                date : "2016/01/02"
            },{
                id : "4",
                action : "Change State",
                content : "Change state to QA",
                user : "dev1",
                date : "2016/01/02"
            }
          ]
        };
    },
    componentWillMount: function() {

    },
    buttonExportCSV : function() {
        this.refs.tbl_issueHistory.handleExportCSV();
    },
    render: function () {

        var datatable_options = {
            exportCSVText : "CSV",
            sizePerPage : 10
        };

        return (
          <div>
              <div className="modal fade" id="IssueHistoryDialog" tabIndex="-1" role="dialog" aria-labelledby="IssueHistoryDialog" aria-hidden="true">
                  <div className="modal-dialog" style={{width: "70%"}}>
                    <div className="modal-content">

                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                                &times;
                            </button>
                            <div className="row">
                                <div className='col-md-12 big-breadcrumbs'>
                                    <h1 className="page-title txt-color-blueDark">
                                        <i className="fa fa-lg fa-fw fa-list-alt" style={{margin:"0px 5px 0px 0px"}}></i>
                                        Issue History
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <div className="modal-body">
                              <JarvisWidget
                                  editbutton={false}
                                  colorbutton={false}
                                  deletebutton={false}
                                  color="darken">

                                  <header><span className="widget-icon"> <i className="fa fa-table"/> </span>
                                      <h2>Issue History</h2>
                                      <OverlayTrigger placement="top"
                                          overlay={<Popover id="popover-activated-on-hover-popover"> Export CSV File </Popover> }>
                                          <a style={{borderLeftColor:"#383838"}} onClick={this.buttonExportCSV} className="btn bg-color-darken txt-color-white pull-right"><b>Export</b></a>
                                      </OverlayTrigger>
                                  </header>

                                  <div>
                                      <div className="widget-body">
                                          <BootstrapTable ref="tbl_issueHistory" data={this.state.historyList} csvFileName="historyList.csv" options={datatable_options} pagination striped={true} hover={true}>
                                              <TableHeaderColumn width='100' isKey={true}  dataField="id"  dataSort={true} csvHeader="ID">  <Msg phrase="ID" /> </TableHeaderColumn>
                                              <TableHeaderColumn width='150' dataField="action"  dataSort={true} csvHeader="Action">  <Msg phrase="Action" /> </TableHeaderColumn>
                                              <TableHeaderColumn width='250' dataField="content"  dataSort={true} csvHeader="Content">  <Msg phrase="Content" />  </TableHeaderColumn>
                                              <TableHeaderColumn width='100' dataField="user"  dataSort={true} csvHeader="User">  <Msg phrase="User" />  </TableHeaderColumn>
                                              <TableHeaderColumn width='100' dataField="date"  dataSort={true} csvHeader="Date">  <Msg phrase="Date" />  </TableHeaderColumn>
                                          </BootstrapTable>
                                      </div>
                                  </div>
                              </JarvisWidget>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-default  pull-right" data-dismiss="modal">
                                Close
                            </button>
                        </div>

                    </div>
                </div>
              </div>
          </div>
        )
    }
});

export default IssueHistoryDialog
