import React from 'react'
import Header from './Header.jsx'
import Navigation from './Navigation.jsx'
import Footer from './Footer.jsx'
import {Authorization} from '../../../services/index.js'

import UserActions from '../../../components/user/actions/UserActions.js'

require('../../../components/layout/less/layout.less');

let Layout = React.createClass({
    getInitialState: function() {
        return {
            isAuthorized : false
        };
    },
    componentWillMount: function () {
        /*check user is authorized*/
        Authorization(this.props, function(){
            this.setState({isAuthorized : true});
        }.bind(this));
    },
    render: function(){
        return (
            <div>
                <Header />

                <Navigation />
                {(this.state.isAuthorized)?(
                    <div id="main" role="main">
                        {this.props.children}
                    </div>
                ):null}

                <Footer />

            </div>
        )
    }
});

export default Layout
