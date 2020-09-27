import  React from 'react'
import {Route, NavLink, Redirect, Switch} from 'react-router-dom'
import RouteComp1 from './pages/RouteComp1'
import RouteComp2 from './pages/RouteComp2'

import './App.css'

class App extends React.Component {
  
  render(){
    return (
      <div>
        <NavLink to='/rc1/2?count2=3'>RC111</NavLink>&nbsp;&nbsp;
        <NavLink to='/rc2'>RC222</NavLink>

        <hr/>
        
        <Switch>
          <Route path="/rc1/:count" component={RouteComp1} exact></Route>
          <Route path="/rc2" render={() => <RouteComp2 count3={4}/>}></Route>
          <Redirect to="/rc2"/>
        </Switch>
      </div>
    )
  }
}


export default App