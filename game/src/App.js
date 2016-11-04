import React, { Component } from 'react';
import './App.css';
var ReactDOM=require('react-dom');
//new code
// class InputStatus extends React.Component{
//   var x = [0, 0, 960, 300].join(' ');
//   render() {
//     return(
//       <div className="container app__status">
//         <div className="row">
//           <svg viewBox={viewBox}>
//             <symbol id={s-text}>
//               <text textAnchor="middle" x="50%" y="80%" id={status}>Wellcome</text>
//             </symbol>

//             <g className="g-ants">
//               <use xlink:href={#s-text} className="text-copy"></use>
//               <use xlink:href={#s-text} className="text-copy"></use>
//               <use xlink:href={#s-text} className="text-copy"></use>
//               <use xlink:href={#s-text} className="text-copy"></use>
//               <use xlink:href={#s-text} className="text-copy"></use>
//             </g>
//           </svg>
//       </div>
//     )
//   }
// }
class GenNumber extends React.Component {
  componentDidUpdate() {
    let time, digit;
    // increase showing time depend on level
    digit=this.props.level.main + 2;
    time=100 * Math.min(digit, 5) + 400 * Math.max(digit-5, 0);

    let number=document.getElementById('number');
    setTimeout(function() {
        number.innerHTML=number.innerHTML.replace(/\w/gi, '&#183;');
      }, time);

  }
  componentDidMount() {
    let number=document.getElementById('number');
    setTimeout(function() {
      number.innerHTML=number.innerHTML.replace(/\w|\W/gi, '&#183;');
    }, 1200);
  }
  render() {
    return(
      <div className="app__gen-number">
        <div className="app__info">
          <p className="app__level">Cấp độ: {this.props.level.main} - {this.props.level.sub}</p>
          <p className="app__wrong">Số lần sai: {this.props.wrong}/3</p>
        </div>
        <div className="app__divider"><p className="app__number" id="number">{(this.props.wrong < 3) ? atob(this.props.question) : '????'}</p></div>
        
        
      </div>
    )
  }
}

class InputNumber extends React.Component {
  constructor() {
    super();
    this.handleUserInput=this.handleUserInput.bind(this);
    this.handleReset=this.handleReset.bind(this);
  }
  handleUserInput(e) {
    e.preventDefault();
    let userNumber=btoa(this.userNumber.value);
    this.userNumber.value="";
    this.props.compareUserInput(userNumber);
  }
  handleReset() {
    this.props.onReset();
  }
  render() {
    let layout;
    if(this.props.wrong < 3) {
      layout=<div className="app__input">
            <form className="number_input" onSubmit={this.handleUserInput}>
              <div className="title">số bạn vừa nhìn thấy là số nào ? :</div>
              <input className = "numbers" 
                pattern="[0-9]+"
                type="text"
                ref={ (ref) => this.userNumber=ref } 
                required
                autoFocus />
              <br/>
              <br/>
            </form>
            <button className="restart" onClick={this.handleReset}>Thử lại nào!</button>
          </div>
    } else {
      layout=<div className="app__end">
            <div class="app__notify">Thua bố nó rồi còn đâu!!!</div><br/><br/><button className="restart" onClick={this.handleReset}>Thử lại nào !</button>
          </div>;
    }
    
    return(layout)
  }
}
class InputStatus extends React.Component{
  //in thuoc tinh
  
}
class App extends React.Component {
  constructor() {
    super();
    this.compareUserInput=this.compareUserInput.bind(this);
    this.randomGenerate=this.randomGenerate.bind(this);
    this.resetState=this.resetState.bind(this);
    this.state={
      question: btoa(this.randomGenerate(2)),
      level: {main: 1, sub: 1},
      wrong: 0    
    }
  }
  resetState() {
    this.setState({
      question: btoa(this.randomGenerate(2)),
      level: {main: 1, sub: 1},
      wrong: 0,
    })
  }
  randomGenerate(digit) {
    let max=Math.pow(10, digit) - 1,
      min=Math.pow(10, digit - 1)

    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  compareUserInput(userNumber) {
    let currQuestion=this.state.question,
      mainLevel=this.state.level.main,
      subLevel=this.state.level.sub,
      wrong=this.state.wrong,
      digit;

    if(userNumber === currQuestion) {
      if(subLevel < 3) {
        ++subLevel;
      } else 
      if(subLevel === 3) {
        ++mainLevel;
        subLevel=1;
      }
    } else {
      ++wrong;
    }
    digit=mainLevel + 2;

    this.setState({
      question: btoa(this.randomGenerate(digit)),
      level: {main: mainLevel, sub: subLevel},
      wrong: wrong
    });
  }
  render() {
    return(
      <div className="main__app">
        <GenNumber 
          question={this.state.question}
          level={this.state.level}
          wrong={this.state.wrong}/>
        <InputNumber 
          compareUserInput={this.compareUserInput} 
          wrong={this.state.wrong} 
          onReset={this.resetState} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
