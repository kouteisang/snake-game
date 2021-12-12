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

    changeSnakePosition = () => {
        const {direction} = this.state
        switch(direction){
            case "ArrowUp":
                const snakePositions1 = this.state.snakePositions
                const snakeHead1 = snakePositions1[snakePositions1.length-1]
                const beforeTop1 = parseInt(snakeHead1.top)
                const beforeLeft1 = parseInt(snakeHead1.left)
                snakePositions1.shift()
                const newTop1 = beforeTop1 - 10 + "px"
                const newLeft1 = beforeLeft1 + "px"
                const newSnakePositions1 = [...snakePositions1,{top:newTop1, left:newLeft1}]
                this.setState({snakePositions:newSnakePositions1})
                this.checkDie()
                this.checkEat()
                break
            case "ArrowDown":
                const snakePositions2 = this.state.snakePositions
                const snakeHead2 = snakePositions2[snakePositions2.length-1]
                const beforeTop2 = parseInt(snakeHead2.top)
                const beforeLeft2 = parseInt(snakeHead2.left)
                snakePositions2.shift()
                const newTop2 = beforeTop2 + 10 + "px"
                const newLeft2 = beforeLeft2 + "px"
                const newSnakePositions2 = [...snakePositions2,{top:newTop2, left:newLeft2}]
                this.setState({snakePositions:newSnakePositions2})
                this.checkDie()
                this.checkEat()
                break
            case "ArrowLeft":
                const snakePositions3 = this.state.snakePositions
                const snakeHead3 = snakePositions3[snakePositions3.length-1]
                const beforeTop3 = parseInt(snakeHead3.top)
                const beforeLeft3 = parseInt(snakeHead3.left)
                snakePositions3.shift()
                const newTop3 = beforeTop3 + "px"
                const newLeft3 = beforeLeft3 - 10 + "px"
                const newSnakePositions3 = [...snakePositions3,{top:newTop3, left:newLeft3}]
                this.setState({snakePositions:newSnakePositions3})
                this.checkDie()
                this.checkEat()
                break
            case "ArrowRight":
                const snakePositions4 = this.state.snakePositions
                const snakeHead4 = snakePositions4[snakePositions4.length-1]
                const beforeTop4 = parseInt(snakeHead4.top)
                const beforeLeft4 = parseInt(snakeHead4.left)
                snakePositions4.shift()
                const newTop4 = beforeTop4 + "px"
                const newLeft4 = beforeLeft4 + 10 + "px"
                const newSnakePositions4 = [...snakePositions4,{top:newTop4, left:newLeft4}]
                this.setState({snakePositions:newSnakePositions4})
                this.checkDie()
                this.checkEat()
                break
        }

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
