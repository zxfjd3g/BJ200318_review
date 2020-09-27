import React from 'react'
import PropTypes from 'prop-types'

class Home extends React.Component {

  static propTypes = {
    num: PropTypes.number.isRequired,
    addPerson: PropTypes.func.isRequired
  }

  render(){
    return (
      <div>
        <h2>Home 组件</h2>
        <p>父组件传递过来的数据： {this.props.num}</p>
        <br/>
        <button onClick={() => {
          this.props.addPerson('tom', 12)
        }}>添加</button>
      </div>
    )
  }
}

export default Home;