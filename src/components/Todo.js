import React from "react";
import TodoItem from "./TodoItem";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
let indexArray;
class Todo extends React.Component {
    state = {
        elements: [],
        inputValueTit: '',
        inputValueVal: '',
        data: {
            labels: [],
            datasets: [
              {
                label: '# of Votes',
                data: [],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
    }

    markCompleted(id) {
        const index = this.state.elements.findIndex(x => x.id === id)
        const newElements = this.state.elements
        if(newElements[index].isComplited==false){
        newElements[index].isComplited = true
        const newArrayLabels = this.state.data.labels
        const newArrayData = this.state.data.datasets[0].data
        for(let i = 0; i <=newArrayData.length;i++){
          if(newArrayData[i]==newElements[index].value && newArrayLabels[i]==newElements[index].title){
          indexArray=i;
          }
        }
        if(newArrayData[indexArray]==newElements[index].value && newArrayLabels[indexArray]==newElements[index].title){
        newArrayLabels.splice(indexArray, 1);
        newArrayData.splice(indexArray, 1);
        }
        this.setState({
          elements: newElements,
          data: {
            labels: newArrayLabels,
            datasets: [{
              ...this.state.data.datasets[0],
                data: newArrayData
             }],
        }
        })
      }
    }

    add(){
        const inputValueTit = this.state.inputValueTit
        const inputValueVal = this.state.inputValueVal
        const newItem = {
            id: Math.random(),
            title: this.state.inputValueTit,
            value: this.state.inputValueVal,
            isComplited: false
        }
        const newElements = [newItem, ...this.state.elements]
        this.setState({
             elements: newElements,
             inputValueTit: '',
             inputValueVal: '',
             data: {
               labels: [...this.state.data.labels, inputValueTit],
               datasets: [{
                ...this.state.data.datasets[0],
                  data: [...this.state.data.datasets[0].data, inputValueVal],
               }],
             },
            })
        
    }

    reload(){
        setInterval()
    }

    inputTitHandler(event){
        const newValue = event.target.value
        this.setState({inputValueTit: newValue})
    }

    inputValHandler(event){
        const newValue = event.target.value
        this.setState({inputValueVal: newValue})
    }

    render(){
        const elements = this.state.elements.map(e => {
            return <TodoItem element={e} markC={this.markCompleted.bind(this)} />
        })
        return (
            <div>
                <h1>Chart<span>Generator</span></h1>
                <div className="adder">
                <input type="text" value={this.state.inputValueTit} onChange={this.inputTitHandler.bind(this)}/>
                <input type="number" value={this.state.inputValueVal} onChange={this.inputValHandler.bind(this)}/>
                <button onClick={(this.state.inputValueTit!='' && this.state.inputValueVal!='') ? this.add.bind(this) : ''}>Add</button>
                </div>
                <div className="container">
                    <div className="firstContainer">
                    {elements}
                    </div>
                    <div className="secondContainer">
                    <Pie width={100} height={500} data={this.state.data}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Todo