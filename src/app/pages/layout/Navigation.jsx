/**
 * Created by griga on 11/24/15.
 */

import React from 'react'

import SmartMenu from '../../../components/layout/navigation/components/SmartMenu.jsx'
import LoginInfo from '../../../components/user/components/LoginInfo.jsx'

let rawItems = require('json!../../config/menu-items.json').items;

let Navigation = React.createClass({
    render: function () {
        return (
            <aside id="left-panel">
                <LoginInfo
                    username={(window.localStorage.getItem("name"))?(window.localStorage.getItem("name")):("Username")}
                    avatar="styles/img/ITS_logo_black.png" />
                <nav>
                    <SmartMenu rawItems={rawItems} />
                </nav>

            </aside>
        )
    }
});


export default Navigation
