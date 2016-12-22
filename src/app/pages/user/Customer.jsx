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

import UserDialogModal from '../../../components/user/UserDialogModal.jsx'

let Customer = React.createClass({
    getInitialState: function() {
        return {
            identity : "Customer",
            usersList : [],
            selectedId : "",
            selectedData : "",
            dialogState : "",
            isSelected : false
        };
    },
    componentWillMount: function() {

      this.setState({
          identity : window.localStorage.getItem("title")
      })

        this.fetchUsers();
    },
    fetchUsers : function(){

        HTTPService.get('user/getUsers?title=Customer', function(res){
            var dataList = [];
            for(var i = 0; i < res.data.length; i++) {
                if(res.data[i].title == 'Customer') {
                  dataList.push(res.data[i]);
                }
            }
            this.setState({
                usersList : dataList
            })

        }.bind(this));
    },
    buttonCreateUser : function(){
        this.setState({
            dialogState : "NEW"
        })
    },
    buttonEditUser : function(){

        if(this.state.selectedId){
            for(var i = 0 ; i < this.state.usersList.length ; i++){
                if(this.state.selectedId == this.state.usersList[i].id){
                    this.setState({
                        dialogState : "EDIT",
                        selectedData : JSON.stringify(this.state.usersList[i])
                    });
                    break;
                }
            }
        }
    },
    buttonViewEvent : function(){
      if(this.state.selectedId){
          for(var i = 0 ; i < this.state.usersList.length ; i++){
              if(this.state.selectedId == this.state.usersList[i].id){
                  this.setState({
                      dialogState : "VIEW",
                      selectedData : JSON.stringify(this.state.usersList[i])
                  });
                  break;
              }
          }
      }
    },
    buttonExportCSV: function(){
        this.refs.tbl_allUsers.handleExportCSV();
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

                <UserDialogModal
                    dialogState = {this.state.dialogState}
                    data = {this.state.selectedData}
                    fetchData = {this.fetchUsers}
                />

                <div className="row hidden-xs">
                    <div className='col-md-12 big-breadcrumbs'>
                        <h1 className="page-title txt-color-blueDark">
                            <i className="fa fa-lg fa-fw fa-paper-plane" style={{margin:"0px 5px 0px 0px"}}></i>
                            <Msg phrase="User" />
                            <i className="fa fa-chevron-right" style={arrow_style}></i>
                            <a className="txt-color-blueDark" >Custmomer</a>
                        </h1>
                    </div>
                </div>

                <WidgetGrid>
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="btn-toolbar">
                                <div className="btn-group">
                                    <OverlayTrigger placement="top"
                                        overlay={<Popover id="popover-activated-on-hover-popover"> Create User </Popover> }>
                                        <a onClick={this.buttonCreateUser}
                                           data-toggle="modal"
                                           data-target={(this.state.identity == "PM") ? "#UserDialogModal" : null}
                                           disabled={!(this.state.identity == "PM")}
                                           className="btn btn-labeled btn-success"  >
                                            <span className="btn-label">
                                                <i className="glyphicon glyphicon-plus"></i>
                                            </span>New
                                        </a>
                                    </OverlayTrigger>
                                </div>

                                <div className="btn-group" >
                                    <OverlayTrigger placement="top"
                                        overlay={<Popover id="popover-activated-on-hover-popover"> Edit User </Popover> }>
                                        <a onClick={this.buttonEditUser}
                                            data-toggle="modal"
                                            data-target={(this.state.isSelected) && (this.state.identity == "PM") ? "#UserDialogModal" : null}
                                            disabled={!((this.state.isSelected) && (this.state.identity == "PM"))}
                                            className="btn btn-sm btn-labeled btn-primary">
                                            <span className="btn-label">
                                                <i className="fa fa-edit"></i>
                                            </span>Edit
                                        </a>
                                    </OverlayTrigger>
                                </div>

                                <div className="btn-group" >
                                    <OverlayTrigger placement="top"
                                        overlay={<Popover id="popover-activated-on-hover-popover"> View User </Popover> }>
                                        <a onClick={this.buttonViewEvent}
                                        data-toggle="modal"
                                        data-target={(this.state.isSelected) ? "#UserDialogModal" : null}
                                        disabled={!(this.state.isSelected)}
                                        className="btn btn-sm btn-labeled btn-info">
                                            <span className="btn-label">
                                                <i className="fa fa-eye"></i>
                                            </span>View
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
                                        <h2><span className="widget-icon"> <i className="fa fa-child"/></span><Msg phrase=" Custmomer"/></h2>
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
                                        <BootstrapTable ref="tbl_allUsers" selectRow={selectRowProp} csvFileName="allUsers.csv" data={this.state.usersList} options={datatable_options} striped={true} hover={true} pagination>
                                            <TableHeaderColumn width='100' dataField="id" isKey={true} hidden={true} dataSort={true} csvHeader="ID"> <Msg phrase="ID" /> </TableHeaderColumn>
                                            <TableHeaderColumn width='350' dataField="project_list" dataSort={true} csvHeader="Project">  <Msg phrase="Project" />  </TableHeaderColumn>
                                            <TableHeaderColumn width='100' dataField="name" dataSort={true} csvHeader="Name">  <Msg phrase="Name" />  </TableHeaderColumn>
                                            <TableHeaderColumn width='100' dataField="title" dataSort={true} csvHeader="Title">  <Msg phrase="Title" />  </TableHeaderColumn>
                                            <TableHeaderColumn width='150' dataField="phone" dataSort={true} csvHeader="Phone">  <Msg phrase="Phone" />  </TableHeaderColumn>
                                            <TableHeaderColumn width='200' dataField="email" dataSort={true} csvHeader="Email">  <Msg phrase="Email" />  </TableHeaderColumn>
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

export default Customer
