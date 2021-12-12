import Footer from "./components/footer/footer";
import Panel from "./components/panel/panel";


import React, { Component } from 'react'

export default class App extends Component {

  state = {
    score: 0,
    level:1
  }

  changeScore = (score)=>{
    this.setState({score:score})
    if(score % 10 === 0){
      this.setState({level:score/10+1})
      const {panel} = this
      const {level} = this.state
      if(1000-level*200 > 0){ 
        panel.init(1000-level*200)
      }
    }
  }

  startGame = ()=>{
    const {panel} = this
    panel.init(1000)
  }

  render() {
    return (
      <div className="App">
        <Panel changeScore={this.changeScore} ref = {c=>this.panel = c}></Panel>
        <Footer ref={c=>this.footer = c} {...this.state} startGame={this.startGame} ></Footer>
      </div>
    )
  }

}
