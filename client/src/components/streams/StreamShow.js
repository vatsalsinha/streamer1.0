import React from 'react';
import { fetchStream } from '../../actions';
import { connect } from 'react-redux';
class StreamShow extends React.Component{
    
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }
    renderStream = () => {
        if(!this.props.stream){
            return (<div> loading ...</div>)
        }
        return (
            <div>
               <h1> {this.props.stream.title} </h1>
               <p> {this.props.stream.description} </p>
            </div>
        )
    }
    
    render(){
        return(
            <div>
                StreamShow
                {this.renderStream()}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);