import  React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  state = {
    num: 1
  }
  
  componentWillMount(){
    console.log('-----componentWillMount 组件将要挂载 -----');
  }

  componentDidMount(){
    console.log('-----componentDidMount 组件挂载完毕 -----');
    
    this.intervalId = setInterval(() => {
      console.log('setInterval');
      this.setState({
        num: ++this.state.num
      })
    }, 1000)
    
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    }, 4000)
  }

  componentWillUpdate(){
    console.log('-----componentWillUpdate 组件将要更新 -----');
  
  }

  componentDidUpdate(){
    console.log('-----componentDidUpdate 组件更新完毕 -----');
  
  }

  componentWillUnmount(){
    console.log('-----componentWillUnmount 组件将要卸载 -----');
    clearInterval(this.intervalId)
  }

  render(){
    let { num } = this.state;
    return (
      <div>
        <h1>App 组件</h1>
        <p>num: {num}</p>
      </div>
    )
  }
}


export default App;