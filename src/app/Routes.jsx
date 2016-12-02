import React from 'react'
import {Route, Redirect, IndexRoute} from 'react-router'

import {
    AllIssues,
    Development,
    Testing,
    ClosedIssues,
    AllUsers,
    AllProjects,
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
                <Route path="development" component={Development} />
                <Route path="testing" component={Testing} />
                <Route path="closedIssues" component={ClosedIssues} />
            </Route>

            <Route path="user">
                <Route path="allUsers" component={AllUsers} />
            </Route>

            <Route path="project">
                <Route path="allProjects" component={AllProjects} />
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
