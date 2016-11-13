import React from 'react'
import {Route, Redirect, IndexRoute} from 'react-router'

import {
    AllIssues,
    AllUsers,
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


            <Redirect from="/" to="/issue"/>
            <IndexRoute component={AllIssues}/>

            <Route path="issue">
                <Route path="allIssues" component={AllIssues} />
            </Route>

            <Route path="user">
                <Route path="allUsers" component={AllUsers} />
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
