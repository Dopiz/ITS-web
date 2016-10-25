import React from 'react'

import {Dropdown, MenuItem} from 'react-bootstrap'

let Footer = React.createClass({
    render: function(){
        return (
            <div className="page-footer">
                <div className="row">
                    <div className="col-md-offset-5">
                        <span className="txt-color-white">Issue Tracking System © 2016 NTUT</span>
                    </div>
                </div>
            </div>
        )
    }
});


export default Footer
