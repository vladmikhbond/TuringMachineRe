import React from 'react';


export default class Area extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            program: props.program,
        };
    }

    componentDidUpdate(prevProps) {
        this.area.focus();
    }

    render() {
        let top = 86 + 15.2 * this.props.highlight;
        return (
            <div>
                <div id="pointer" style={ {top:`${top}px`} }>&nbsp;</div>
                <textarea value={this.state.program} autoFocus
                          onChange={this.changeHandler}
                          ref={ el => { this.area = el; } } />
            </div>
        )
    }

    changeHandler = (e) => {
        const text = e.target.value;
        this.setState({program: text});
        this.props.onChange(text);
    }
}
