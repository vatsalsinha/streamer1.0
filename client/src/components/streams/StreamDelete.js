import React from 'react';
import Modal from '../Modal';   
import history from '../../history';
import { fetchStream, deleteStream } from "../../actions";
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
 
class StreamDelete extends React.Component{

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id)
    }

    renderActions = () =>{
        const id = this.props.match.params.id;
        return (
            <React.Fragment>
                <button className = "ui button negative" onClick={()=> this.props.deleteStream(id)}>
                    Delete
                </button>
                <Link to = "/" ><button className = "ui button"> 
                        Cancel
                        </button>
                </Link>
            </React.Fragment>
        );
    }
    renderContent(){
        if(!this.props.stream){
            return 'Are You Sure?';
        }
        return `Confirm Delete stream: ${this.props.stream.title}`;
    }
    render(){
        return(
            <div>
                <Modal 
                    title = "Delete Stream"
                    content = {this.renderContent()}
                    actions = {this.renderActions()}
                    onDismiss = {() => history.push('/')}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) =>{
    return { stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);