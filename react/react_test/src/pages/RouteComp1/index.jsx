import React from 'react'

class RouteComp1 extends React.Component {

  render(){
    return (
      <div>
        <h2>RouteComp111</h2>
        <p>params count: {this.props.match.params.count}</p>
        <p>query search: {this.props.location.search}</p>
      </div>
    )
  }
}

export default RouteComp1