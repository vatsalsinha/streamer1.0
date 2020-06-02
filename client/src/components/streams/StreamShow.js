import React from 'react';
import { fetchStream } from '../../actions';
import { connect } from 'react-redux';
import flv from 'flv.js';
class StreamShow extends React.Component{
    constructor(props){
        super(props);
        this.videoReference = React.createRef();
    } 
    
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
        this.buildPlayer();
    }
    componentDidUpdate(){
        this.buildPlayer();
    }
    componentWillUnmount(){
        this.player.destroy();
    }

    buildPlayer(){
        if(this.player || !this.props.stream){
            return;
        }
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${this.props.match.params.id}.flv`
        });
        this.player.attachMediaElement(this.videoReference.current);
        this.player.load();
    }
    renderStream = () => {
        if(!this.props.stream){
            return (<div> loading ...</div>)
        }
        return (
            <div>
                <video ref = {this.videoReference} style= {{ width: '100%' }} controls/>
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