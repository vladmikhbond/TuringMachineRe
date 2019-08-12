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
              <Area value={this.state.program} onChange={this.areaChangedHandler.bind(this)}/>
              <div>
                <input value={this.state.input} onChange={this.inputChangeHandler.bind(this)}/>
              </div>
              <div>
                <button id="runButton" onClick={this.runClick.bind(this)}> >></button>
                <button id="initButton"> ■</button>
                <button id="stepButton" onClick={this.stepClick.bind(this)}> ></button>
                <button id="helpButton"> ?</button>
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

  inputChangeHandler(e) {
    this.setState({input: e.target.program.trim()});
  }

  areaChangedHandler (program) {
    this.setState({program: program.trim()})
  }



  init() {
     this.tm = new Turing(this.state.program, this.state.input);
    // printer.innerHTML = "";
    // if (timer) {
    //   clearInterval(timer);
    //   timer = null;
    // }
    // print(tm);
  }

  stepClick() {
    const t = this.tm;
    if (t.isStopped)
      return;
    t.step();

    let tick = (' ' + t.tick).slice(-2);
    let head = t.tape[t.headPos];

    let left = t.tape.slice(MARGIN - 5, t.headPos).join('');
    let right = t.tape.slice(t.headPos + 1, MARGIN + 25).join('') ;
    let state = (t.state + '    ').slice(0, 5);

    this.state.printed.push({tick, head, left, right, state});
    this.setState({printed: this.state.printed});

  }

  runClick() {
    this.init();
    // timer = setInterval(function() {
    //   step();
    //   if (tm.stopped) {
    //     clearInterval(timer);
    //     timer = null;
    //   }
    // }, 10);

  }

}

