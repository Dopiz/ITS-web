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

let Development = React.createClass({
    getInitialState: function() {
        return {};

    },
    componentWillMount: function() {

    },

    render: function () {
        return (
            <div id="content">
                Hello
            </div>
        )
    }
});

export default Development
