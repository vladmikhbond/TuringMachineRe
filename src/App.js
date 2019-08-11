import React from 'react';
import './App.css';
import Area from './Area.js';
import Turing from './model.js';

export default class App extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {input: 'aaa', program: '' };
    this.tm = null;
  }

  inputChangeHandler(e) {
    this.setState({input: e.target.value.trim()});
  }

  areaChangedHandler (text) {
    this.setState({program: text.trim()})
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

   render() {
     return (
       <table>
         <tr>
           <td>
             <Area onChange={this.areaChangedHandler.bind(this)}/>
             <div>
               <input value={this.state.input} onChange={this.inputChangeHandler.bind(this)}/>
             </div>
             <div>
               <button id="runButton" onClick={this.runClick}> >></button>
               <button id="initButton"> ■</button>
               <button id="stepButton"> ></button>
               <button id="helpButton"> ?</button>
             </div>
           </td>
           <td>
             <pre id="printer"></pre>
           </td>
         </tr>
       </table>
     )
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

