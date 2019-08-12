import React from 'react';


export default class Area extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {program: props.value};
        this.changeHandler = this.changeHandler.bind(this);
        this.props.onChange(props.value);
    }

    render() {
        return (
            <textarea value={this.state.program} onChange={this.changeHandler} />
        )
    }

    changeHandler = (e) => {
        const text = e.target.value;
        this.setState({program: text});
        this.props.onChange(text);
    }
}
