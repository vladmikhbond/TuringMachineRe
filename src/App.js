import React from 'react';
import Area from './Area.js';
import Printer from './Printer.js';
import Help from './Help.js';
import {Turing, MARGIN} from "./model";

const sample = `sa = sbR
s. = s.STOP`;


export default class App extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      input: 'aaa',
      program: sample,
      printed: [],
      helpIsOpen: false,
      stateChar: '',
      selStart: 0,
      selEnd: 5
    };
  }

  render() {
    return (
        <table>
          <tbody>
          <tr>
            <td>
              <Area program={this.state.program} line={3} onChange={this.areaChangedHandler}/>
              <div>
                <input value={this.state.input} onChange={this.inputChangeHandler}/>
              </div>
              <div>
                <button onClick={this.initClick}> ■</button>
                <button onClick={this.runClick}> >></button>
                <button onClick={this.stepClick}> ></button>
                <button onClick={this.helpClick}> ?</button>
              </div>
            </td>
            <td>
              <Printer lines={this.state.printed}/>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <Help open={this.state.helpIsOpen} />
            </td>
          </tr>
          </tbody>
        </table>
    )
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    // create model
    this.tm = new Turing(this.state.program, this.state.input);
    // clear printer
    this.setState({printed: [], stateChar: ''})
  }

  /////////////////////////// change handlers /////////////////////////

  inputChangeHandler = (e) => {
    this.setState({input: e.target.value.trim()});
    setTimeout(this.init, 100);
  };

  areaChangedHandler = (e) => {
    this.setState({program: e.trim()});
    setTimeout(this.init, 100);
  };

  /////////////////////////// button click handlers /////////////////////////

  initClick = () => {
    this.init();
  };

  stepClick = () => {
    const tm = this.tm;
    if (tm.isStopped)
      return;
    tm.step();

    // change state
    const char = tm.tape[tm.headPos];
    const state = tm.state;
    const left = tm.tape.slice(MARGIN - 5, tm.headPos).join('');
    const right = tm.tape.slice(tm.headPos + 1, MARGIN + 25).join('') ;
    const arr = this.state.printed.slice();
    arr.push({head: char, left, right, state});
    this.setState({printed: arr, stateChar: state + char});

    // highlight rule
    let leftPart = '\n' + state + char;
    let i = ('\n' + this.state.program).indexOf(leftPart);
    let selStart = 0, selEnd = 0;
    if (i !== -1) {
      selStart = i;
      selEnd = this.state.program.indexOf('\n', i + 3);
    } else {
      selEnd = selStart;
    }
    this.setState({selStart, selEnd});

  };

  runClick = () => {
    this.init();
    const step = this.stepClick.bind(this);
    const tm = this.tm;
    // movie
    let timer = setInterval( () => {
      step();
      if (tm.isStopped) {
        clearInterval(timer);
        timer = null;
      }
    }, 100);
  };

  helpClick = () => {
    const flag = !this.state.helpIsOpen;
    this.setState({helpIsOpen: flag});
  };

}

