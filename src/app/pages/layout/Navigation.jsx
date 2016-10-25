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
                <LoginInfo />
                <nav>
                    <SmartMenu rawItems={rawItems} />
                </nav>

            </aside>
        )
    }
});


export default Navigation
