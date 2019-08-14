import React from 'react';
import Area from './Area.js';
import Printer from './Printer.js';
import Help from './Help.js';
import {Turing, MARGIN} from "./model";

export const SAMPLE = `sa = sbR
s. = s.STOP2`;
const INPUT = 'aaa';

// export const SAMPLE = `a1 = b.R
// b1 = b1R
// b. = c2R
// c. = d2L
// d2 = d2L
// d1 = d1L
// d. = a.R
// b2 = b2R
// a2 = e2
// e2 = e1R
// e. = e.STOP`;
// const INPUT = '11';

export default class App extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      input: INPUT,
      program: SAMPLE,
      printed: [],
      helpIsOpen: false,
      stateChar: '',
      highlight: 0
    };
  }

  render() {
    return (
        <table>
          <tbody>
          <tr>
            <td>
              <Area highlight={this.state.highlight} onChange={this.areaChangedHandler}/>
              <div>
                <input value={this.state.input} onChange={this.inputChangeHandler}/>
              </div>
              <div>
                <button onClick={this.initClick}> ■ </button>
                <button onClick={this.runClick}> >> </button>
                <button onClick={this.stepClick}> > </button>
                <button onClick={this.helpClick}> ? </button>
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
    this.setState({printed: [], stateChar: '', highlight: 0});
    //
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  };

  highlight(stateChar) {
    const lines = this.state.program.split('\n');
    let i = lines.findIndex(e => e.startsWith(stateChar));
    if (i === -1)
      i = -1000;
    this.setState({highlight: i});
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

    this.highlight(state+char);

  };


  runClick = () => {
    this.init();
    const step = this.stepClick.bind(this);
    const tm = this.tm;
    // movie
    this.timer = setInterval( () => {
      step();
      if (tm.isStopped) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }, 100);
  };

  helpClick = () => {
    const flag = !this.state.helpIsOpen;
    this.setState({helpIsOpen: flag});
  };

}

