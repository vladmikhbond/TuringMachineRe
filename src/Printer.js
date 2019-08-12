import React from 'react';


export default class Printer extends React.Component
{
    render() {
        const items = this.props.lines.map(o =>
            <li>
                <span className='black'>{o.state}</span>
                <span className='gray'>{o.left}</span>
                <span className='under-head'>{o.head}</span>
                <span className='gray'>{o.right}</span>
            </li>);

        return (
            <ol>{items}</ol>
        )
    }
}

