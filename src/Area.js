import React from 'react';


export default class Area extends React.Component
{
    constructor(props) {
        super(props);

        // rulesText.focus()
        this.state = {
            program: props.program,
        };

        this.props.onChange(props.program);
    }

    componentDidMount(){
        //this.area.focus();
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

/******

 // highlight rule
 let leftPart = '\n' + t.state[0] + t.tape[t.headPos];

 let i = ('\n' + rulesText.value).indexOf(leftPart);
 if (i !== -1) {
        rulesText.selectionStart = i;
        rulesText.selectionEnd = rulesText.value.indexOf('\n', i + 3);
    } else {
        rulesText.selectionEnd = rulesText.selectionStart;
    }
 rulesText.focus()


 * ******/
