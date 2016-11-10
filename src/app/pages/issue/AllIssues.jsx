import React from 'react'
import BigBreadcrumbs from '../../../components/layout/navigation/components/BigBreadcrumbs.jsx'

let AllIssues = React.createClass({
    render: function () {
        return (
            <div id="content">
                <div className="row">
                    <BigBreadcrumbs items={['Dashboard', 'My Dashboard']}
                                     className="col-xs-12 col-sm-7 col-md-7 col-lg-4" />
                </div>

            </div>
        )
    }
});

export default AllIssues
