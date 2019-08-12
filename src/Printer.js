import React from 'react';


export default class Printer extends React.Component
{

    render() {
        const items = this.props.lines.map(o =>
            <li>
                <span className='gray'>{o.tick}</span>.
                <span className='black'>{o.state}</span>
                <span className='gray'>{o.left}</span>
                <span className='under-head'>{o.head}</span>
                <span className='gray'>{o.right}</span>
            </li>);

        return (
            <ul>{items}</ul>
        )
    }


}


// printer.innerHTML +=
//     "<span class='gray'>" + tick + "</span>"
//     + ". <span class='black'>" + state + "</span>"
//     + "<span class='gray'>" + left + "</span>"
//     + "<span class='under-head'>" + t.tape[pos] + "</span>"
//     + "<span class='gray'>" + right + "</span>\n";

