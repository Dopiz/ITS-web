import React, { Component, PropTypes } from 'react'

import JarvisWidget from '../layout/widgets/JarvisWidget.jsx'
import UiValidate from '../forms/validation/UiValidate.jsx'
import WidgetGrid from '../layout/widgets/WidgetGrid.jsx'
import {HTTPService} from '../../services/index.js'
import Select from 'react-select'

export default class IssueChangeStatusModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            comment : "",
            issue_id : "",
            formTextareaClassName : "textarea"
        };
    }

    componentWillReceiveProps(nextProps){

        var data = (nextProps.data)?(JSON.parse(nextProps.data)) : [];
        var user_id, user_name;

        switch(nextProps.status){
            case 'New' :
                user_id = data.developer_id;
                user_name = data.developer_name;
            break;
            case 'Development' :
                user_id = data.developer_id;
                user_name = data.developer_name;
            break;
            case 'Testing' :
                user_id = data.tester_id;
                user_name = data.tester_name;
            break;
            case 'Done' :
                user_id = data.owner_id;
                user_name = data.owner_name;
            break;
        }

        this.setState({
            comment : "",
            issue_id : (data.id)?(data.id):"",
            user_id : user_id,
            user_name : user_name,
            owner_id : data.owner_id,
            developer_id : data.developer_id,
            tester_id : data.tester_id ,
            project_name : data.project_name,
            title : data.title,
            priority : data.priority,
            formTextareaClassName : "none"
        }, function(){
            this.setState({
                formTextareaClassName : "textarea"
            })
        }.bind(this));

    }

    handleSubmitForm(e) {

        e.preventDefault();

        var body = {
            issue_id : this.state.issue_id,
            status : this.props.status,
            user_id : this.state.user_id,
            user_name : this.state.user_name,
            comment : this.state.comment,
            action : this.props.action,
            owner_id : this.state.owner_id,
            developer_id : this.state.developer_id,
            tester_id : this.state.tester_id ,
            project_name : this.state.project_name,
            priority : this.state.priority,
            title : this.state.title
        }

        HTTPService.post('issue/changeStatus', body, function(res){
            $('#IssueChangeStatusModal').modal('hide');
            this.props.fetchData();
        }.bind(this))
    }

    handleChange(item_name, event) {
        /*根據item_name 更改值*/
        var nextState = {};
        nextState[item_name] = event.target.value;
        this.setState(nextState);
    }

    render(){

        return (
            <div>
                <div className="modal fade" id="IssueChangeStatusModal" tabIndex="-1" role="dialog" aria-labelledby="IssueChangeStatusModal" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content" style={{padding:"10px"}}>
                            <WidgetGrid>
                            <UiValidate>
                                <form className="smart-form" noValidate="noValidate" onSubmit={this.handleSubmitForm.bind(this)}>

                                    <header>
                                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                                            &times;
                                        </button>
                                        <h1 className="modal-title" id="myModalLabel">
                                            {this.props.title}
                                        </h1>
                                    </header>

                                    <fieldset>
                                        <section>
                                            <label className="label">Comment</label>
                                            <label className={this.state.formTextareaClassName}>
                                                <textarea rows="3" type="text" id='comment' name='comment' value={this.state.comment} onChange={this.handleChange.bind(this, 'comment')} placeholder="Comment"/>
                                                <b className="tooltip tooltip-bottom-right">Input Comment (optional)</b>
                                            </label>
                                        </section>
                                    </fieldset>

                                    <section>
                                        <footer style={{background:"#ffffff"}}>
                                            <div className="form-group pull-right">
                                                <button type="button" className="btn btn-default " data-dismiss="modal">
                                                    Cancel
                                                </button>
                                                <button type="submit" className="btn btn-success">
                                                    Save
                                                </button>
                                            </div>
                                        </footer>
                                    </section>

                                </form>
                            </UiValidate>
                            </WidgetGrid>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
