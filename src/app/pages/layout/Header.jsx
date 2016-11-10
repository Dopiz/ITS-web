/**
 * Created by griga on 11/17/15.
 */

import React from 'react'

import ToggleMenu from '../../../components/layout/actions/ToggleMenu.jsx'


let Header = React.createClass({
    render: function () {
        return <header id="header">
            <div id="logo-group">
                <span id="logo">
                    <img src="styles/img/ITS_logo_black.png" style={{width:"100%"}} // place your logo here
                         alt="SmartAdmin"/>
                </span>
            </div>

            <div className="pull-right"  /*pulled right: nav area*/ >
                <ToggleMenu className="btn-header pull-right"  /* collapse menu button */ />

                {/* logout button */}
                <div id="logout" className="btn-header transparent pull-right">
                    <span> <a href="#/login" title="Sign Out"
                              data-logout-msg="You can improve your security further after logging out by closing this opened browser"><i
                        className="fa fa-sign-out"/></a> </span>
                </div>
            </div>

        </header>
    }
});


export default Header
