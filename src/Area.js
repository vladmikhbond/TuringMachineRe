import React from 'react';

const sample = `sa = sbR
s. = s.STOP`;

export default class Area extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {value: sample};
        this.handleChange = this.handleChange.bind(this);
        this.props.onChange(sample);
    }

    handleChange(event) {
        const text = event.target.value;
        this.setState({value: text});
        this.props.onChange(text);
    }

    render() {
       return (
           <textarea value={this.state.value} onChange={this.handleChange}></textarea>
       )
   }
}
