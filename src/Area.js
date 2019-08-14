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
        this.area.focus();
    }

    componentDidUpdate(prevProps) {
        this.area.selectionStart = this.props.selStart;
        this.area.selectionEnd = this.props.selEnd;
        this.area.focus();
    }


    render() {
        let divStyle = {
            position: 'absolute', top: '30px'
        };

        return (
            <div>
                <div style={divStyle}>
                >CS={this.props.selStart} : {this.props.selEnd}</div>
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
