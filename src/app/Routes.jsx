import React from 'react'
import {Route, Redirect, IndexRoute} from 'react-router'

import {
    AllIssues,
    Layout,
    Page404,
    Page500,
    BlankPage,
    Login
} from './pages/index.jsx'

import Dashboard from './pages/dashboard/Dashboard.jsx'


const Routes = (
    <Route>
        <Route path="/" component={Layout}>


            <Redirect from="/" to="/dashboard"/>
            <IndexRoute component={Dashboard}/>
            <Route path="dashboard" component={Dashboard}/>

            <Route path="issue">
                <Route path="allIssues" component={AllIssues} />
            </Route>

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
