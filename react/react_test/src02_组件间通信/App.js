import  React from 'react'

import Home from './components/Home'

class App extends React.Component {
  state = {
    num: 1,
    persons: []
  }
  
  addPerson = (name, age) => {
    const person = {
      id: Date.now(),
      name,
      age
    }
    this.setState({
      persons: [
        person,
        ...this.state.persons
      ]
    })
  }
  
  componentDidMount(){
    // 发请求获取数据
    setTimeout(() => {
      const persons = [
        {
          id: 1,
          name: 'kobe',
          age: 43
        },
        {
          id: 2,
          name: 'wade',
          age: 38
        },
        {
          id: 3,
          name: 'curry',
          age: 33
        }
      ];
      
      this.setState({
        persons
      })
    }, 2000)
  }
 
  render(){
    let { num, persons } = this.state
    return (
      <div>
        <h1>App 组件</h1>
        <p>num: {num}</p>
        
        <ul>
          {
            persons.map((item, index) => <li key={index}>{item.name} --- {item.age}</li>)
          }
        </ul>
        <br/>
        <Home num={num} addPerson={this.addPerson}/>
      </div>
    )
  }
}


export default App