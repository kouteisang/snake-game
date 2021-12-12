import React, { Component } from 'react'
import './footer.css'

export default class footer extends Component {


    start = ()=>{
        const {startGame} = this.props
        startGame()
    }


    render() {
        const {score, level} = this.props
        return (
            <div className='footer'>
                <div className='score'>
                    <span>SCORE:{score}</span>
                </div>
                <div className='level'>
                    <span>LEVEL:{level}</span>
                </div>
                <div className='start' onClick={this.start}>
                    <span>START</span>
                </div>
            </div>
        )
    }
}
