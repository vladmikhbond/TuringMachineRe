import React from 'react';
import './App.css';
import Area from './Area.js';
import Turing from './model.js';

export default class App extends React.Component
{

  init() {
    // tm = new Turing(rulesText.value.trim(), input.value.trim());
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
             <Area />
             <div>
               <input id="input" value="aaa" />
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

