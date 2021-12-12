import React, { Component } from 'react'
import uuid from 'react-uuid'
import './panel.css'
export default class Panel extends Component {

    state = {
        snakePositions : [{top:"0px", left:'0px'}, {top:"0px", left:"10px"}],
        direction:'ArrowRight',
        score:0
    }

    init = (timeinterval)=>{
        clearInterval(this.timer)
        this.timer = setInterval(() => {
            this.changeSnakePosition() 
            this.snakeControl()
         }, timeinterval);
    }

    // react写成箭头函数啊喂
    // 改变食物的位置
    changFoodPosition = ()=>{
        let positionLeft = Math.floor(Math.random()*29)*10;
        let positionTop = Math.floor(Math.random()*29)*10;
        const {foods} = this
        foods.style.left = positionLeft + "px"
        foods.style.top = positionTop + "px"

    }

    addSnakeLength = ()=>{
        const {direction} = this.state
        const {snakePositions} = this.state
        const lastTop = snakePositions[0].top
        const lastLeft = snakePositions[0].left;
        switch(direction){
            case "ArrowUp":
                this.setState({snakePositions:[{top:lastTop+10+"px", left:lastLeft},...snakePositions]})
                break;
            case "ArrowDown":
                this.setState({snakePositions:[{top:lastTop-10+"px", left:lastLeft},...snakePositions]})
                break;
            case "ArrowLeft":
                this.setState({snakePositions:[{top:lastTop, left:lastLeft+10+"px"},...snakePositions]})
                break;   
            case "ArrowRight":
                this.setState({snakePositions:[{top:lastTop, left:lastLeft-10+"px"},...snakePositions]})
                break;   
        }
    }

    //检查是否吃到了
    checkEat = ()=>{
        const {snakePositions} = this.state
        const snakeHead = snakePositions[snakePositions.length-1]
        const headTop = snakeHead.top
        const headLeft = snakeHead.left
        const {foods} = this

        if(parseInt(foods.style.left) === parseInt(headLeft) && parseInt(foods.style.top) === parseInt(headTop)){
            const {score} = this.state
            this.setState({score:score+1})
            const {changeScore} = this.props
            changeScore(this.state.score)
            this.changFoodPosition()
            this.addSnakeLength()
        }
    }

    checkDie = ()=>{
        const {snakePositions} = this.state
        const snakeHead = snakePositions[snakePositions.length-1]
        const headTop = snakeHead.top
        const headLeft = snakeHead.left
        //碰到墙
        if(parseInt(headTop) < 0 || parseInt(headTop) > 290 || parseInt(headLeft) < 0 || parseInt(headLeft) > 290){
            alert("Game Over")
            clearInterval(this.timer)
            return   
        }
        //咬到自己
        for(let i = 0; i <= snakePositions.length-2; i ++){
            if(snakePositions[i].top === headTop && snakePositions[i].left === headLeft){
                alert("Game Over")
                clearInterval(this.timer)
                return   
            }
        }
    }


    changePositionByDirection = (direction)=>{
        const snakePositions = this.state.snakePositions
        const snakeHead = snakePositions[snakePositions.length-1]
        const beforeTop = parseInt(snakeHead.top)
        const beforeLeft = parseInt(snakeHead.left)
        //删掉第一个元素并返回该元素的数值。此方法用来更改数组的长度
        snakePositions.shift()
        let newTop = beforeTop
        let newLeft = beforeLeft
        let newSnakePositions = []
        switch(direction){
            case "ArrowUp":
                newTop = beforeTop - 10 + "px"
                newLeft = beforeLeft + "px"
                break;
            case "ArrowDown":
                newTop = beforeTop + 10 + "px"
                newLeft = beforeLeft + "px"
                break;
            case "ArrowLeft":
                newTop = beforeTop + "px"
                newLeft = beforeLeft - 10 + "px"
                break;
            case "ArrowRight":
                newTop = beforeTop + "px"
                newLeft = beforeLeft + 10 + "px"
                break;
        }
        newSnakePositions = [...snakePositions,{top:newTop, left:newLeft}]
        this.setState({snakePositions:newSnakePositions})
        this.checkDie()
        this.checkEat()
    }

    changeSnakePosition = () => {
        const {direction} = this.state
        this.changePositionByDirection(direction)
    }

    // 控制蛇的移动
    snakeControl = ()=>{
        window.onkeydown = (e)=>{
            switch(e.key){
                case "ArrowUp":
                    if(this.state.direction !== "ArrowDown"){
                        this.setState({direction:'ArrowUp'})
                        this.changeSnakePosition()
                    }
                    break
                case "ArrowDown":
                    if(this.state.direction !== "ArrowUp"){
                        this.setState({direction:'ArrowDown'})
                        this.changeSnakePosition()
                    }
                    break
                case "ArrowLeft":
                    if(this.state.direction !== "ArrowRight"){
                        this.setState({direction:'ArrowLeft'})
                        this.changeSnakePosition()
                    }
                    break    
                case "ArrowRight":
                    if(this.state.direction !== "ArrowLeft"){
                        this.setState({direction:'ArrowRight'})
                        this.changeSnakePosition()
                    }
                    break
            }
        }
    }

    render() {
        const {snakePositions} = this.state
        return (
            <div className='panel'>
                <div className='stage'>
                    <div className='snake' ref = {c=>this.snake = c} style={{left:'0px', top:'0px'}}>
                     {
                         snakePositions.map((snakeItem)=>{
                             return <div key={uuid()} style={{left:snakeItem.left, top:snakeItem.top}}></div>
                         })
                     }
                    </div>
                    <div className="food" ref={c => this.foods = c} onClick = {this.changFoodPosition}  style={{left:'10px', top:'10px'}}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        )
    }
}
