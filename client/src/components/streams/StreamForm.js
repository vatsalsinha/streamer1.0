import React from 'react';
import { Field, reduxForm, reducer } from 'redux-form';
class StreamForm extends React.Component{

    renderError(meta){
        if(meta.error && meta.touched){
            return(
                <div className="ui error message">
                    <div className="header">{meta.error}</div>
                </div>
            );
        }
    }

    renderInput = (formProps) => {
        const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error':''}`;  
        return(
            <div className={className}>
                <label> {formProps.label} </label>
                <input {...formProps.input} />
                { this.renderError(formProps.meta) }
            </div>
        )
    }
    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }
    render(){    
        return(
            <form onSubmit={ this.props.handleSubmit(this.onSubmit) } className="ui form error">
                <Field name="title" component={this.renderInput} label="title" />
                <Field name="description" component={this.renderInput} label="description"/>
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) =>{
    const errors = {};
    if(!formValues.title){
        errors.title="Title must be Entered";
    }
    if(!formValues.description){
        errors.description = "Description must be entered";
    }
    return errors;
};

export default reduxForm({
    form: 'streamForm',
    validate: validate
})(StreamForm);
 