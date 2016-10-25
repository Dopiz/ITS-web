import React from 'react'
import {Route, Redirect, IndexRoute} from 'react-router'

import Dashboard from './pages/dashboard/Dashboard.jsx'

import Layout from './pages/layout/Layout.jsx'

import Page404 from './pages/misc/Page404.jsx'
import Page500 from './pages/misc/Page500.jsx'
import BlankPage from './pages/misc/BlankPage.jsx'
import Login from './pages/misc/Login.jsx'


const Routes = (
    <Route>
        <Route path="/" component={Layout}>

            
            <Redirect from="/" to="/dashboard"/>
            <IndexRoute component={Dashboard}/>
            <Route path="dashboard" component={Dashboard}/>


            /*show error page*/
            <Route path="misc">
                <Route path="404" component={Page404}/>
                <Route path="500" component={Page500}/>
                <Route path="blank" component={BlankPage}/>
            </Route>

        </Route>


        <Route path="login" component={Login}/>
    </Route>);


export default Routes
