import React, {Component, PropTypes} from 'react'

import JarvisWidget from '../layout/widgets/JarvisWidget.jsx'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {OverlayTrigger, Popover} from 'react-bootstrap'
import WidgetGrid from '../layout/widgets/WidgetGrid.jsx'
import FlotChart from '../graphs/flot/FlotChart.jsx'
import { PieChart  } from 'react-d3';
import Select from 'react-select'
import Msg from '../i18n/Msg.jsx'

export default class IssueReportModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            reportData : []
        };
    }

    componentWillReceiveProps(nextProps){
        var data = (nextProps.data.length) ? (JSON.parse(nextProps.data)) : ([]) ;

        this.setState({
            reportData : data
        })
    }

    render() {

        var pieChartOptions = {
            series: {
                pie: {
                    show: true,
                    innerRadius: 0.5,
                    radius: 1,
                    label: {
                        show: false,
                        radius: 2 / 3,
                        formatter: function(label, series) {
                            return '<div style="font-size:11px;text-align:center;padding:4px;color:white;">' + label + '<br/>' + Math.round(series.percent) + '%</div>';
                        },
                        threshold: 0.1
                    }
                }
            },
            legend: {
                show: true,
                noColumns: 1, // number of colums in legend table
                labelFormatter: null, // fn: string -> string
                labelBoxBorderColor: "#000", // border color for the little label boxes
                container: null, // container (as jQuery object) to put legend in, null means default on top of graph
                position: "ne", // position of default legend container within plot
                margin: [
                    5, 10
                ], // distance from grid edge to default legend container within plot
                backgroundColor: "#efefef", // null means auto-detect
                backgroundOpacity: 1 // set to 0 to avoid background
            },
            grid: {
                hoverable: true,
                clickable: true
            }
        };

        return (
            <div>
                <div className="modal fade" id="IssueReportModal" tabIndex="-1" role="dialog" aria-labelledby="IssueReportModal" aria-hidden="true">
                    <div className="modal-dialog" style={{width: "70%"}}>
                        <div className="modal-content">

                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                                    &times;
                                </button>
                                <div className="row">
                                    <div className='col-md-12 big-breadcrumbs'>
                                        <h1 className="page-title txt-color-blueDark">
                                            <i className="fa fa-lg fa-fw fa-list-alt" style={{
                                                margin: "0px 5px 0px 0px"
                                            }}></i>
                                            Issue Report
                                        </h1>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-body">
                                <WidgetGrid>
                                    <JarvisWidget editbutton={false}>
                                        <header>
                                            <span className="widget-icon">
                                                <i className="fa fa-bar-chart-o"/>
                                            </span>
                                            <h2>Pie Chart</h2>
                                        </header>
                                        <div>
                                            <div className="widget-body no-padding row" >
                                                <div className="col-md-7">
                                                    <PieChart
                                                        data={this.state.reportData.pieChartData}
                                                        width={550}
                                                        height={550}
                                                        radius={150}
                                                        innerRadius={20}
                                                        sectorBorderColor="white"
                                                    />
                                                </div>
                                                <div style={{padding:"60px"}} className="col-md-5">

                                                    <strong><font size="5">Total Time : </font></strong><font size="5"> {this.state.reportData.total_time} days </font><br/><br/>

                                                    {
                                                       (this.state.reportData.new_time) ? (
                                                           <div>
                                                               <strong><font size="5">New : </font></strong><br/>
                                                               <font size="3">Time : {this.state.reportData.new_time} days </font><br/><br/>
                                                           </div>
                                                       ) : (null)
                                                    }

                                                    {
                                                       (this.state.reportData.development_time) ? (
                                                           <div>
                                                               <strong><font size="5">Development : </font></strong><br/>
                                                               <font size="3">Time : {this.state.reportData.development_time} days </font><br/>
                                                               <font size="3">Finish : {this.state.reportData.development_finish} </font><br/><br/>
                                                           </div>
                                                       ) : (null)
                                                    }

                                                    {
                                                       (this.state.reportData.testing_time) ? (
                                                           <div>
                                                               <strong><font size="5">Testing : </font></strong><br/>
                                                               <font size="3">Time : {this.state.reportData.testing_time} days </font><br/>
                                                               <font size="3">Finish : {this.state.reportData.testing_finish} </font><br/>
                                                               <font size="3">Reject : {this.state.reportData.testing_reject} </font><br/><br/>
                                                           </div>
                                                       ) : (null)
                                                    }

                                                    {
                                                       (this.state.reportData.done_time) ? (
                                                           <div>
                                                               <strong><font size="5">Done : </font></strong><br/>
                                                               <font size="3">Time : {this.state.reportData.done_time} days </font><br/>
                                                               <font size="3">Finish : {this.state.reportData.done_finish} </font><br/>
                                                               <font size="3">Reject : {this.state.reportData.done_reject} </font><br/>
                                                           </div>
                                                       ) : (null)
                                                    }


                                                </div>

                                            </div>
                                        </div>
                                    </JarvisWidget>
                                </WidgetGrid>
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
        );
    }
}
