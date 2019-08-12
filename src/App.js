import React from 'react';
import './App.css';
import Area from './Area.js';
import Printer from './Printer.js';
import {Turing, MARGIN} from "./model";

const sample = `sa = sbR
s. = s.STOP`;


export default class App extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {input: 'aaa', program: sample, printed: [] };
  }

  render() {
    return (
        <table>
          <tbody>
          <tr>
            <td>
              <Area value={this.state.program} onChange={this.areaChangedHandler}/>
              <div>
                <input value={this.state.input} onChange={this.inputChangeHandler}/>
              </div>
              <div>
                <button onClick={this.initClick}> ■</button>
                <button onClick={this.runClick}> >></button>
                <button onClick={this.stepClick}> ></button>
                <button> ?</button>
              </div>
            </td>
            <td>
              <Printer lines={this.state.printed}/>
            </td>
          </tr>
          </tbody>
        </table>
    )
  }

  componentDidMount() {
    this.init();
  }

  /////////////////////////// change handlers /////////////////////////

  inputChangeHandler = (e) => {
    this.setState({input: e.target.value.trim()});
    setTimeout(this.init, 100);
  }

  areaChangedHandler = (e) => {
    this.setState({program: e.trim()});
    setTimeout(this.init, 100);
  }

  /////////////////////////// button click handlers /////////////////////////

  initClick = () => {
    this.init();
  }

  stepClick = () => {
    const tm = this.tm;
    if (tm.isStopped)
      return;
    tm.step();

    let tick = (' ' + tm.tick).slice(-2);
    let head = tm.tape[tm.headPos];
    let left = tm.tape.slice(MARGIN - 5, tm.headPos).join('');
    let right = tm.tape.slice(tm.headPos + 1, MARGIN + 25).join('') ;
    let state = (tm.state + '    ').slice(0, 5);

    this.state.printed.push({tick, head, left, right, state});
    this.setState({printed: this.state.printed});
  }

  runClick = () => {
    this.init();

    // timer = setInterval(function() {
    //   step();
    //   if (tm.stopped) {
    //     clearInterval(timer);
    //     timer = null;
    //   }
    // }, 10);

  }

  init = () => {
    this.tm = new Turing(this.state.program, this.state.input);
    // clear printer
    this.setState({printed: []})
    // if (timer) {
    //   clearInterval(timer);
    //   timer = null;
    // }
    // print(tm);
  }


}

