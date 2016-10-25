import React from 'react'
import Header from './Header.jsx'
import Navigation from './Navigation.jsx'
import Footer from './Footer.jsx'

import UserActions from '../../../components/user/actions/UserActions.js'

require('../../../components/layout/less/layout.less');

let Layout = React.createClass({
    componentWillMount: function () {

    },
    render: function(){
        return (
            <div>
                <Header />

                <Navigation />

                <div id="main" role="main">
                    {this.props.children}
                </div>

                <Footer />

            </div>
        )
    }
});

export default Layout
